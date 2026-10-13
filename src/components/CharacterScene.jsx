import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Character3D from './Character3D';

/**
 * CameraRig — Steady studio camera with subtle cursor parallax.
 * Keeps the character framed with architectural precision.
 */
function CameraRig({
  mouseX = 0,
  mouseY = 0,
  isMobile = false,
}) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 5.8));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    const camX = isMobile ? 0 : 0.25;
    const camY = isMobile ? -0.1 : 0.0;
    const camZ = isMobile ? 7.2 : 5.8;

    const lookX = isMobile ? 0 : 0.25;
    const lookY = 0;
    const lookZ = 0;

    // Restrained mouse parallax (max 2-3 degrees)
    const mouseCamX = mouseX * 0.16;
    const mouseCamY = mouseY * 0.10;

    targetPos.current.set(camX + mouseCamX, camY + mouseCamY, camZ);
    targetLookAt.current.set(lookX, lookY, lookZ);

    camera.position.lerp(targetPos.current, 0.08);
    camera.lookAt(targetLookAt.current);
  });

  return null;
}

/**
 * useCharacterController — GSAP scroll-driven choreography.
 * Replaces the old eye-zoom with an elegant spatial parallax & depth drift.
 */
function useCharacterController({ scrollProgress = 0, isMobile = false }) {
  const p = THREE.MathUtils.clamp(scrollProgress, 0, 1);

  let posX = 0, posY = 0, posZ = 0;
  let rotX = 0, rotY = 0, rotZ = 0;
  let scale = 1;
  let opacity = 1;

  if (isMobile) {
    // Mobile responsive choreography
    posX = 0;
    posY = THREE.MathUtils.lerp(0.35, 0.95, p);
    posZ = THREE.MathUtils.lerp(0, -1.2, p);
    scale = THREE.MathUtils.lerp(0.72, 0.62, p);
    rotX = THREE.MathUtils.lerp(0, 0.04, p);
    rotY = THREE.MathUtils.lerp(0, -0.12, p);
    opacity = p < 0.20 ? 1 : THREE.MathUtils.clamp(1 - (p - 0.20) / 0.65, 0, 1);
  } else {
    // Desktop editorial framing on right side
    posX = THREE.MathUtils.lerp(1.25, 1.45, p);
    posY = THREE.MathUtils.lerp(-0.2, 0.42, p); // Graceful parallax lift
    posZ = THREE.MathUtils.lerp(0, -0.9, p);   // Gentle depth recess (never zooms in)
    rotX = THREE.MathUtils.lerp(0, 0.05, p);
    rotY = THREE.MathUtils.lerp(0, -0.16, p);  // Noble glance toward center content
    scale = THREE.MathUtils.lerp(1.05, 0.94, p);
    opacity = p < 0.25 ? 1 : THREE.MathUtils.clamp(1 - (p - 0.25) / 0.65, 0, 1);
  }

  return { posX, posY, posZ, rotX, rotY, rotZ, scale, opacity };
}

/**
 * CharacterScene — WebGL Canvas container with studio lighting & GSAP scroll choreography.
 */
export function CharacterScene({ scrollProgress = 0 }) {
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [entrance, setEntrance] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 900 : false
  );
  const mouseTarget = useRef({ x: 0, y: 0 });
  const animFrame = useRef(null);

  // Responsive resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Coordinated entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setEntrance(1), 200);
    return () => clearTimeout(timer);
  }, []);

  // Smooth mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseTarget.current.x = (e.clientX - cx) / cx;
      mouseTarget.current.y = -(e.clientY - cy) / cy;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const lerpMouse = () => {
      setMouse((prev) => ({
        x: prev.x + (mouseTarget.current.x - prev.x) * 0.05,
        y: prev.y + (mouseTarget.current.y - prev.y) * 0.05,
      }));
      animFrame.current = requestAnimationFrame(lerpMouse);
    };
    lerpMouse();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrame.current);
    };
  }, []);

  const characterState = useCharacterController({
    scrollProgress,
    isMobile,
  });

  const isHidden = characterState.opacity <= 0.01;

  return (
    <div
      ref={containerRef}
      className="character-scene-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: characterState.opacity,
        visibility: isHidden ? 'hidden' : 'visible',
        transition: 'visibility 0.2s ease',
      }}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)]}
        camera={{ fov: 35, near: 0.05, far: 100, position: [0, 0, 5.8] }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          stencil: false,
          toneMapping: THREE.LinearToneMapping,
          toneMappingExposure: 1.0,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        style={{ pointerEvents: 'none' }}
      >
        {/* Studio Lighting System */}
        <ambientLight intensity={0.85} />
        
        {/* Key directional light */}
        <directionalLight
          position={[3, 4, 5]}
          intensity={1.15}
          color="#ffffff"
        />

        {/* Soft cool fill light */}
        <directionalLight
          position={[-3, -1, 3]}
          intensity={0.45}
          color="#818cf8"
        />

        {/* Steady Camera Rig */}
        <CameraRig
          mouseX={mouse.x}
          mouseY={mouse.y}
          isMobile={isMobile}
        />

        {/* The 3D Character */}
        <Suspense fallback={null}>
          <Character3D
            scrollProgress={scrollProgress}
            mouseX={mouse.x}
            mouseY={mouse.y}
            characterState={characterState}
            entrance={entrance}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default CharacterScene;
