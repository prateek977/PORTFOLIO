import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import heroPortrait from '../assets/hero-portrait.png';
import heroDepth from '../assets/hero-depth.png';

/**
 * Character3D — The ONLY 3D element on the entire website.
 * 
 * Faithfully built from Prateek's portrait (src/assets/hero-portrait.png):
 * - Identical facial shape, hairstyle, proportions, clothing, and warm lighting
 * - Subtle normal displacement from hero-depth.png for authentic facial feature relief
 * - Signature crimson rim lighting (#ed3327) on the silhouette edge
 * - Volumetric dark back hull enclosing the head & torso into a solid 3D bust sculpture
 * - Smooth GSAP scroll-driven depth drift & dissolve
 */

/* ─── Shaders for Front Face ──────────────────────────────────────── */
const frontVertexShader = `
  uniform sampler2D uDepthMap;
  uniform float uDisplacementScale;
  uniform float uTime;
  uniform float uEntrance;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vDepth;
  varying vec3 vWorldPosition;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    
    // Sample depth map for facial features
    float depth = texture2D(uDepthMap, uv).r;
    vDepth = depth;
    
    // Subtle organic breathing
    float breath = sin(uTime * 1.4) * 0.012 * uEntrance;
    
    // Displace along normal
    vec3 displaced = position + normal * (depth * uDisplacementScale * uEntrance + breath * depth);
    
    vec4 worldPos = modelMatrix * vec4(displaced, 1.0);
    vWorldPosition = worldPos.xyz;
    
    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const frontFragmentShader = `
  uniform sampler2D uColorMap;
  uniform sampler2D uDepthMap;
  uniform vec3 uLightDir;
  uniform float uEntrance;
  uniform float uOpacity;
  uniform float uTime;
  uniform vec2 uResolution;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vDepth;
  varying vec3 vWorldPosition;

  void main() {
    vec4 texColor = texture2D(uColorMap, vUv);
    
    // Discard transparent background pixels
    if (texColor.a < 0.08) discard;
    
    // Sobel normal filtering for micro-relief
    vec2 texel = 1.0 / uResolution;
    float dL = texture2D(uDepthMap, vUv - vec2(texel.x * 2.0, 0.0)).r;
    float dR = texture2D(uDepthMap, vUv + vec2(texel.x * 2.0, 0.0)).r;
    float dD = texture2D(uDepthMap, vUv - vec2(0.0, texel.y * 2.0)).r;
    float dU = texture2D(uDepthMap, vUv + vec2(0.0, texel.y * 2.0)).r;
    vec3 depthNormal = normalize(vec3((dL - dR) * 3.2, (dD - dU) * 3.2, 1.0));
    
    vec3 finalNormal = normalize(mix(vNormal, depthNormal, 0.4));
    
    // Wrap lighting to ensure skin tones stay natural, warm & bright
    float NdotL = dot(finalNormal, normalize(uLightDir));
    float wrap = (NdotL + 0.5) / 1.5;
    float diffuse = clamp(mix(0.88, 1.15, wrap), 0.85, 1.18);
    
    // Specular sheen
    vec3 viewDir = normalize(vViewPosition);
    vec3 halfDir = normalize(normalize(uLightDir) + viewDir);
    float spec = pow(max(dot(finalNormal, halfDir), 0.0), 32.0) * (0.12 + 0.28 * vDepth);
    
    // Signature red rim light (#ed3327)
    float rimVal = 1.0 - max(dot(finalNormal, vec3(0.0, 0.0, 1.0)), 0.0);
    float rim = smoothstep(0.42, 0.92, rimVal);
    vec3 rimColor = vec3(0.93, 0.20, 0.15);
    
    vec3 litColor = texColor.rgb * diffuse + vec3(1.0, 0.98, 0.92) * spec * 0.25 + rim * rimColor * 0.7;
    
    // Bottom grounding fade
    float bottomFade = smoothstep(1.0, 0.82, vUv.y);
    float alpha = texColor.a * uEntrance * bottomFade * clamp(uOpacity, 0.0, 1.0);
    
    gl_FragColor = vec4(litColor, alpha);
  }
`;

export function Character3D({
  scrollProgress = 0,
  mouseX = 0,
  mouseY = 0,
  characterState = {},
  entrance = 0,
}) {
  const groupRef = useRef();
  const headGroupRef = useRef();
  const meshRef = useRef();
  const materialRef = useRef();
  const backMatRef = useRef();

  // Load portrait texture and depth map
  const [colorMap, depthMap] = useLoader(THREE.TextureLoader, [heroPortrait, heroDepth]);

  useMemo(() => {
    colorMap.colorSpace = THREE.SRGBColorSpace;
    colorMap.generateMipmaps = true;
    colorMap.minFilter = THREE.LinearFilter;
    colorMap.magFilter = THREE.LinearFilter;

    depthMap.colorSpace = THREE.NoColorSpace;
    depthMap.generateMipmaps = false;
    depthMap.minFilter = THREE.LinearFilter;
    depthMap.magFilter = THREE.LinearFilter;
  }, [colorMap, depthMap]);

  // Front face curved geometry matching portrait proportions
  const geometry = useMemo(() => {
    const imgAspect = 1024 / 1536; // 0.6667
    const height = 3.5;
    const width = height * imgAspect; // ~2.33

    const segW = 96;
    const segH = 128;
    const geo = new THREE.PlaneGeometry(width, height, segW, segH);
    const pos = geo.attributes.position;
    const uv = geo.attributes.uv;

    // Cylinder & anatomical dome curvature
    const curveRadius = 3.8;
    const curveAngle = width / curveRadius;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const u = uv.getX(i);
      const v = uv.getY(i);

      // Horizontal cylinder curve
      const angle = (u - 0.5) * curveAngle;
      const newX = Math.sin(angle) * curveRadius;
      
      // Vertical cranial dome
      const vDome = Math.sin(v * Math.PI) * 0.14;
      const newZ = Math.cos(angle) * curveRadius - curveRadius + vDome;

      pos.setXYZ(i, newX, y, newZ);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  // Back Hull Volume Geometry — Encloses the bust into a solid 3D sculpture
  const backHullGeometry = useMemo(() => {
    const imgAspect = 1024 / 1536;
    const height = 3.48;
    const width = height * imgAspect;

    const segW = 40;
    const segH = 50;
    const geo = new THREE.PlaneGeometry(width * 0.98, height * 0.98, segW, segH);
    const pos = geo.attributes.position;
    const uv = geo.attributes.uv;

    const curveRadius = 3.6;
    const curveAngle = width / curveRadius;

    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const u = uv.getX(i);

      const angle = (u - 0.5) * curveAngle;
      const newX = Math.sin(angle) * curveRadius;
      const newZ = Math.cos(angle) * curveRadius - curveRadius - 0.22;

      pos.setXYZ(i, newX, y, newZ);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  // Shader uniforms
  const uniforms = useMemo(
    () => ({
      uColorMap: { value: colorMap },
      uDepthMap: { value: depthMap },
      uDisplacementScale: { value: 0.14 },
      uTime: { value: 0 },
      uEntrance: { value: 0 },
      uOpacity: { value: 1 },
      uLightDir: { value: new THREE.Vector3(0.5, 0.7, 1.2) },
      uResolution: { value: new THREE.Vector2(1024, 1536) },
    }),
    [colorMap, depthMap]
  );

  // Animation frame loop
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const currentOpacity = characterState.opacity ?? 1;

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = elapsed;
      materialRef.current.uniforms.uEntrance.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uEntrance.value,
        entrance,
        0.05
      );
      materialRef.current.uniforms.uOpacity.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uOpacity.value,
        currentOpacity,
        0.1
      );

      // Light direction smoothly follows cursor
      const lx = mouseX * 1.2 + 0.4;
      const ly = mouseY * 0.9 + 0.6;
      materialRef.current.uniforms.uLightDir.value.set(lx, ly, 1.2);
    }

    if (backMatRef.current) {
      backMatRef.current.opacity = currentOpacity * entrance;
    }

    if (groupRef.current) {
      const {
        posX = 0, posY = 0, posZ = 0,
        rotX = 0, rotY = 0, rotZ = 0,
        scale = 1,
      } = characterState;

      // Subtle organic floating drift
      const floatY = Math.sin(elapsed * 1.4) * 0.035;

      const lerpSpeed = 0.08;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, posX, lerpSpeed);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, posY + floatY, lerpSpeed);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, posZ, lerpSpeed);

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, rotX, lerpSpeed);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, rotZ, lerpSpeed);

      // Y rotation combines scroll choreo + mouse look
      const mouseRotY = mouseX * 0.10;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        rotY + mouseRotY,
        lerpSpeed
      );

      // Scale
      const targetScale = scale * entrance;
      const s = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, lerpSpeed);
      groupRef.current.scale.set(s, s, s);
    }

    // Head subtle dynamic pitch/yaw tracking
    if (headGroupRef.current) {
      const headPitch = -mouseY * 0.06;
      const headYaw = mouseX * 0.06;
      headGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.x,
        headPitch,
        0.05
      );
      headGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.y,
        headYaw,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={headGroupRef}>
        {/* Front Face: High-Fidelity 3D Displaced Portrait with Studio Lighting */}
        <mesh ref={meshRef} geometry={geometry}>
          <shaderMaterial
            ref={materialRef}
            vertexShader={frontVertexShader}
            fragmentShader={frontFragmentShader}
            uniforms={uniforms}
            transparent
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>

        {/* Back Hull Shell: Gives authentic volumetric solid bust sculpture depth */}
        <mesh geometry={backHullGeometry}>
          <meshStandardMaterial
            ref={backMatRef}
            color="#0e0e13"
            roughness={0.7}
            metalness={0.2}
            side={THREE.BackSide}
            transparent
            opacity={1}
          />
        </mesh>
      </group>
    </group>
  );
}

export default Character3D;
