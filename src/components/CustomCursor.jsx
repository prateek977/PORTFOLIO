import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor = () => {
  const [cursorState, setCursorState] = useState({
    x: -100,
    y: -100,
    visible: false,
    hoveredType: null, // 'link', 'project', 'button'
    text: '',
  });

  const posRef = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });
  const cursorDotRef = useRef(null);
  const cursorFollowerRef = useRef(null);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    let animId;

    const handleMouseMove = (e) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;
      if (!cursorState.visible) {
        setCursorState(prev => ({ ...prev, visible: true }));
      }
    };

    const handleMouseLeave = () => {
      setCursorState(prev => ({ ...prev, visible: false }));
    };

    // Track hover targets
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor], .project-editorial-card');
      if (!target) {
        setCursorState(prev => ({ ...prev, hoveredType: null, text: '' }));
        return;
      }

      if (target.classList.contains('project-editorial-card') || target.closest('.project-editorial-card')) {
        setCursorState(prev => ({ ...prev, hoveredType: 'project', text: 'EXPLORE ↗' }));
      } else if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.getAttribute('role') === 'button') {
        setCursorState(prev => ({ ...prev, hoveredType: 'link', text: '' }));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    // Physics render loop
    const render = () => {
      animId = requestAnimationFrame(render);
      const pos = posRef.current;
      
      // Fast lerp for dot
      pos.x += (pos.targetX - pos.x) * 0.25;
      pos.y += (pos.targetY - pos.y) * 0.18;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${pos.targetX}px, ${pos.targetY}px, 0)`;
      }
      if (cursorFollowerRef.current) {
        cursorFollowerRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorState.visible]);

  if (!cursorState.visible) return null;

  const isProject = cursorState.hoveredType === 'project';
  const isLink = cursorState.hoveredType === 'link';

  return (
    <>
      {/* Precision Core Dot */}
      <div
        ref={cursorDotRef}
        className={`junca-cursor-dot ${isProject ? 'is-project' : ''} ${isLink ? 'is-link' : ''}`}
        aria-hidden="true"
      />

      {/* Fluid Inertial Follower / Capsule */}
      <div
        ref={cursorFollowerRef}
        className={`junca-cursor-follower ${isProject ? 'is-project' : ''} ${isLink ? 'is-link' : ''}`}
        aria-hidden="true"
      >
        {isProject && (
          <span className="junca-cursor-text">EXPLORE ↗</span>
        )}
      </div>

      <style>{`
        .junca-cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 6px;
          height: 6px;
          background-color: #ed3327;
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          margin-top: -3px;
          margin-left: -3px;
          will-change: transform;
          transition: width 0.2s ease, height 0.2s ease, opacity 0.2s ease;
        }
        .junca-cursor-dot.is-project {
          opacity: 0;
        }
        .junca-cursor-dot.is-link {
          transform-origin: center;
          width: 8px;
          height: 8px;
          margin-top: -4px;
          margin-left: -4px;
          background-color: #ffffff;
        }
        .junca-cursor-follower {
          position: fixed;
          top: 0;
          left: 0;
          width: 36px;
          height: 36px;
          border: 1px solid rgba(237, 51, 39, 0.4);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99998;
          margin-top: -18px;
          margin-left: -18px;
          will-change: transform;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1), 
                      height 0.3s cubic-bezier(0.22, 1, 0.36, 1), 
                      border-radius 0.3s cubic-bezier(0.22, 1, 0.36, 1), 
                      background-color 0.3s ease, 
                      border-color 0.3s ease;
        }
        .junca-cursor-follower.is-link {
          width: 52px;
          height: 52px;
          margin-top: -26px;
          margin-left: -26px;
          border-color: rgba(255, 255, 255, 0.3);
          background-color: rgba(255, 255, 255, 0.05);
        }
        .junca-cursor-follower.is-project {
          width: 110px;
          height: 38px;
          margin-top: -19px;
          margin-left: -55px;
          border-radius: 100px;
          background-color: #ed3327;
          border-color: #ed3327;
          box-shadow: 0 8px 24px rgba(237, 51, 39, 0.4);
        }
        .junca-cursor-text {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 1px;
          white-space: nowrap;
        }
        @media (pointer: coarse), (hover: none) {
          .junca-cursor-dot, .junca-cursor-follower {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
