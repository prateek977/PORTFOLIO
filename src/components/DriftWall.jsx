import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import './DriftWall.css';
import { TECH_STACK_ITEMS } from './TechLogos';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const columnFactor = (index, variance) => {
  const pseudo = ((index * 0.6180339887 + 0.35) % 1) * 2 - 1;
  return 1 + variance * pseudo;
};

/**
 * DriftWall — Continuous Vertical Drift 3D Stream
 *
 * Adapted from the React Bits DriftWall motion engine for editorial technology cards:
 * - Columns continuously drift vertically in alternating directions (even UP, odd DOWN).
 * - Per-column speed variations for organic depth.
 * - Smooth exponential deceleration to pause the hovered column on inspection.
 * - Seamless modulo infinite loop without visible resets or gaps.
 * - Subtle pointer-responsive 3D perspective stream.
 */
export const DriftWall = ({
  items = TECH_STACK_ITEMS,
  columns = 4,
  tileWidth = 285,
  tileHeight = 160,
  gap = 22,
  radius = 14,
  tilt = 6,
  turn = -5,
  roll = 0,
  perspective = 1400,
  depth = 0,
  speed = 36,
  direction = 'up',
  variance = 0.35,
  parallax = 0.2,
  pauseOnHover = false,
  lift = 32,
  className = '',
  style = {},
}) => {
  const containerRef = useRef(null);
  const planeRef = useRef(null);
  const trackRefs = useRef([]);
  const rafRef = useRef(null);

  const offsetsRef = useRef([]);
  const velocitiesRef = useRef([]);
  const hoveredColRef = useRef(-1);
  const wallHoveredRef = useRef(false);
  const activeIdRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const pointerDampedRef = useRef({ x: 0, y: 0 });
  const lastTsRef = useRef(null);

  const [containerHeight, setContainerHeight] = useState(720);
  const [activeId, setActiveId] = useState(null);
  const [reduced, setReduced] = useState(false);
  const [responsiveCols, setResponsiveCols] = useState(columns);

  // Check prefers-reduced-motion
  useEffect(() => {
    setReduced(prefersReducedMotion());
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Responsive column count (4 desktop, 3 tablet, 2 mobile)
  useEffect(() => {
    const updateCols = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setResponsiveCols(2);
      } else if (w < 1080) {
        setResponsiveCols(3);
      } else {
        setResponsiveCols(columns);
      }
    };

    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, [columns]);

  // Track container height via ResizeObserver for seamless loop calculation
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerHeight(entry.contentRect.height || 720);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Distribute items evenly into columns
  const columnItems = useMemo(() => {
    const cols = Array.from({ length: responsiveCols }, () => []);
    items.forEach((item, i) => cols[i % responsiveCols].push(item));
    return cols.map((col) => (col.length ? col : items.slice(0, 1)));
  }, [items, responsiveCols]);

  // Calculate copies and copyHeight for each column dynamically to guarantee seamless looping without gaps
  const columnMeta = useMemo(() => {
    const unit = tileHeight + gap;
    // Generous viewport span to cover 3D perspective tilt, rotation, and motion bounds
    const safeViewport = Math.max(containerHeight * 2.5, 1800);
    return columnItems.map((col) => {
      const copyHeight = Math.max(unit, col.length * unit);
      // Number of copies required above and below center to guarantee continuous coverage throughout animation
      const copiesPerSide = Math.max(4, Math.ceil(safeViewport / copyHeight) + 1);
      // Odd number of copies ensures exact symmetrical centering around the middle copy
      const copies = copiesPerSide * 2 + 1;
      return { copyHeight, copies, copiesPerSide };
    });
  }, [columnItems, tileHeight, gap, containerHeight]);

  // Base velocities with alternating directions per column and speed variance
  const baseVelocities = useMemo(() => {
    const dirSign = direction === 'up' ? 1 : -1;
    return columnItems.map((_, c) => {
      const altSign = c % 2 === 0 ? 1 : -1;
      return speed * columnFactor(c, variance) * dirSign * altSign;
    });
  }, [columnItems, speed, direction, variance]);

  // Stagger initial column positions so cards don't start in a synchronized horizontal line
  useEffect(() => {
    offsetsRef.current = columnMeta.map((meta, c) => meta.copyHeight * ((c * 0.37) % 1));
    velocitiesRef.current = columnItems.map((_, c) => baseVelocities[c] || 0);
  }, [columnMeta, columnItems, baseVelocities]);

  // Apply subtle 3D plane perspective
  const applyPlaneTransform = useCallback(
    (px, py) => {
      const plane = planeRef.current;
      if (!plane) return;
      const isMobile = responsiveCols <= 2;
      const effTilt = isMobile ? 0 : tilt;
      const effTurn = isMobile ? 0 : turn;
      const effRoll = isMobile ? 0 : roll;
      const effDepth = isMobile ? 0 : depth;

      plane.style.transform =
        `translate(-50%, -50%) ` +
        `rotateX(${effTilt + py}deg) rotateY(${effTurn + px}deg) rotateZ(${effRoll}deg) ` +
        `translateZ(${-effDepth}px)`;
    },
    [tilt, turn, roll, depth, responsiveCols]
  );

  // Continuous animation loop (requestAnimationFrame)
  useEffect(() => {
    const animate = (ts) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.min(0.05, Math.max(0, ts - lastTsRef.current) / 1000);
      lastTsRef.current = ts;

      // Smooth pointer perspective damping
      const isMobile = responsiveCols <= 2;
      if (!isMobile && !reduced && parallax > 0) {
        const maxTilt = parallax * 8;
        const targetX = pointerRef.current.x * maxTilt;
        const targetY = -pointerRef.current.y * maxTilt;
        const damp = 1 - Math.exp(-dt / 0.12);
        pointerDampedRef.current.x += (targetX - pointerDampedRef.current.x) * damp;
        pointerDampedRef.current.y += (targetY - pointerDampedRef.current.y) * damp;
      } else {
        pointerDampedRef.current = { x: 0, y: 0 };
      }
      applyPlaneTransform(pointerDampedRef.current.x, pointerDampedRef.current.y);

      // Continuous vertical column drift
      if (!reduced) {
        for (let c = 0; c < trackRefs.current.length; c++) {
          const meta = columnMeta[c];
          if (!meta) continue;

          // Pause column if card in this column is hovered/focused (or if all paused)
          const isPaused = (wallHoveredRef.current && pauseOnHover) || hoveredColRef.current === c;
          const factor = isPaused ? 0 : 1;
          const target = baseVelocities[c] * factor;

          // Smooth exponential deceleration / acceleration
          const ease = 1 - Math.exp(-dt / (target === 0 ? 0.16 : 0.28));
          velocitiesRef.current[c] += (target - (velocitiesRef.current[c] ?? 0)) * ease;

          let next = (offsetsRef.current[c] ?? 0) + velocitiesRef.current[c] * dt;
          // Mathematical modulo wrap ensures perfectly seamless looping without visible jumps
          next = ((next % meta.copyHeight) + meta.copyHeight) % meta.copyHeight;
          offsetsRef.current[c] = next;

          const el = trackRefs.current[c];
          if (el) {
            // Track is already vertically centered by flexbox in .drift-wall__plane.
            // Shifting by -next provides seamless looping across the copyHeight period without gaps.
            el.style.transform = `translate3d(0, ${-next}px, 0)`;
          }
        }
      } else {
        // Reduced motion: static centered position
        for (let c = 0; c < trackRefs.current.length; c++) {
          const el = trackRefs.current[c];
          if (el) {
            el.style.transform = `translate3d(0, ${-(offsetsRef.current[c] ?? 0)}px, 0)`;
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [baseVelocities, columnMeta, pauseOnHover, parallax, reduced, responsiveCols, applyPlaneTransform]);

  const activate = useCallback((id, colIndex) => {
    activeIdRef.current = id;
    hoveredColRef.current = colIndex;
    setActiveId(id);
  }, []);

  const release = useCallback(() => {
    activeIdRef.current = null;
    hoveredColRef.current = -1;
    setActiveId(null);
  }, []);

  const handlePointerMove = useCallback(
    (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      if (parallax > 0 && !reduced) {
        pointerRef.current = {
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        };
      }

      const hit = document.elementFromPoint(e.clientX, e.clientY);
      const tile = hit && hit.closest ? hit.closest('[data-tile-id]') : null;
      if (!tile) {
        if (activeIdRef.current) release();
        return;
      }

      const id = tile.dataset.tileId;
      const colIndex = Number(tile.dataset.col);
      if (id === activeIdRef.current) return;
      activate(id, colIndex);
    },
    [parallax, reduced, activate, release]
  );

  const handlePointerLeaveWall = useCallback(() => {
    wallHoveredRef.current = false;
    pointerRef.current = { x: 0, y: 0 };
    release();
  }, [release]);

  const cssVars = useMemo(
    () => ({
      '--dw-tile-w': `${tileWidth}px`,
      '--dw-tile-h': `${tileHeight}px`,
      '--dw-gap': `${gap}px`,
      '--dw-radius': `${radius}px`,
      '--dw-perspective': `${perspective}px`,
      '--dw-lift': `${lift}px`,
      ...style,
    }),
    [tileWidth, tileHeight, gap, radius, perspective, lift, style]
  );

  const renderTile = (item, id, colIndex) => {
    const isActive = activeId === id;
    return (
      <div
        key={id}
        tabIndex={0}
        role="button"
        aria-label={`${item.name} (${item.category}): ${item.description || ''}`}
        className={`drift-wall__tile${isActive ? ' is-active' : ''}`}
        data-tile-id={id}
        data-col={colIndex}
        onMouseEnter={() => activate(id, colIndex)}
        onMouseLeave={release}
        onFocus={() => activate(id, colIndex)}
        onBlur={release}
      >
        <div className="drift-wall__inner">
          <div className="drift-wall__tile-top">
            <div className="drift-wall__tile-icon" style={{ color: item.brandColor }}>
              {item.icon}
            </div>
            <span className="drift-wall__tile-cat">{item.category}</span>
          </div>

          <div className="drift-wall__tile-bottom">
            <span className="drift-wall__tile-title">{item.name}</span>
            <p className="drift-wall__tile-desc">{item.description}</p>
          </div>
        </div>
      </div>
    );
  };

  const rootClass = ['drift-wall', reduced ? 'drift-wall--reduced' : '', className].filter(Boolean).join(' ');

  return (
    <div
      ref={containerRef}
      className={rootClass}
      style={cssVars}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => {
        wallHoveredRef.current = true;
      }}
      onPointerLeave={handlePointerLeaveWall}
      role="region"
      aria-label="Interactive Continuous 3D Technology Wall"
    >
      <div ref={planeRef} className="drift-wall__plane">
        {columnItems.map((col, c) => {
          const meta = columnMeta[c];
          const copies = Array.from({ length: meta.copies });
          return (
            <div className="drift-wall__col" key={`col-${c}`}>
              <div
                className="drift-wall__track"
                ref={(el) => {
                  trackRefs.current[c] = el;
                }}
              >
                {copies.map((_, copyIndex) =>
                  col.map((item, itemIndex) =>
                    renderTile(item, `${c}-${copyIndex}-${itemIndex}`, c)
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DriftWall;
