"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { shaderMaterial, useTexture, OrthographicCamera } from "@react-three/drei";

// Define the custom shader material for the Midnight Spotlight effect
const SpotlightMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
    uResolution: new THREE.Vector2(1, 1),
    uMouse: new THREE.Vector2(0.5, 0.5),
    uColorGold: new THREE.Color("#D4AF37"), 
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    uniform vec3 uColorGold;
    varying vec2 vUv;

    // Simple 2D noise implementation for Immersive Garden fluidity
    float random (in vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }
    float noise (in vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f*f*(3.0-2.0*f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
      vec2 uv = vUv;
      
      // Aspect ratio correction for mathematical 'object-fit: cover' mapping
      vec2 texUv = uv;
      float screenAspect = uResolution.x / uResolution.y;
      
      // Force scaling mapping to perfectly preserve the 16:9 1920x1080 native input asset bounds
      float imgAspect = 16.0 / 9.0; 
      
      if (screenAspect > imgAspect) {
          texUv.y = (texUv.y - 0.5) * (imgAspect / screenAspect) + 0.5;
      } else {
          texUv.x = (texUv.x - 0.5) * (screenAspect / imgAspect) + 0.5;
      }
      
      // Aspect-corrected physical cursor distance mapping
      vec2 mouseDistUv = vec2(uv.x * screenAspect, uv.y);
      vec2 mousePos = vec2(uMouse.x * screenAspect, uMouse.y);
      
      // Physical distance from the current fragment to the center of the mouse
      float mouseDist = distance(mouseDistUv, mousePos);
      
      // Immersive Garden Ambient Fluid Displacement (time-driven)
      float n1 = noise(uv * 3.0 + uTime * 0.1);
      float n2 = noise(uv * 5.0 - uTime * 0.07);
      float liquid = noise(uv * 2.0 + vec2(n1, n2) * 2.5);
      
      // Super elegant subtle liquid breathing distortion on the master UVs
      vec2 distUv = texUv + vec2(liquid * 0.008);
      
      // Create a large, soft-edged spotlight radius spreading smoothly across the canvas
      float mouseIntensity = smoothstep(0.5, 0.0, mouseDist);
      
      // Auto-reveal intensity (ambient liquid caustic that reveals the image dynamically by up to 25%)
      float ambientIntensity = (liquid * 0.35);
      float totalIntensity = clamp(mouseIntensity + ambientIntensity, 0.0, 1.0);
      
      // Fetch pure texture color for this fragment using the DISPLACED uv coords
      vec4 texColor = texture2D(uTexture, distUv);
      
      // Deep Ambience Environment: The frosted Cream room
      // #FEFAF6 (Cream)
      vec3 brandCream = vec3(0.996, 0.980, 0.964); 
      
      // The room is brightly flooded with Cream, muting the photo behind a luxurious milky veil
      vec3 brightAmbiance = mix(texColor.rgb, brandCream, 0.75); // Increased from 0.45 to 0.75 for less transparency (more milky veil)
      
      // Illuminated Environment: The pure, brilliant photograph glowing cleanly the spotlight strikes
      vec3 litColor = texColor.rgb + (uColorGold * totalIntensity * 0.15); 

      // Linearly mix the frosted room into the spotlight reveal based on cursor + ambient proximity
      vec3 finalColor = mix(brightAmbiance, litColor, totalIntensity); 
      
      // Blend edges slightly to pure cream to prevent hard photograph edges
      float vDist = distance(uv, vec2(0.5, 0.5)); 
      finalColor = mix(finalColor, brandCream, smoothstep(0.45, 1.2, vDist)); 

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

import { extend } from "@react-three/fiber";
extend({ SpotlightMaterial });

function FluidPlane() {
  const materialRef = useRef<THREE.ShaderMaterial & { uTime: number; uResolution: THREE.Vector2; uMouse: THREE.Vector2 }>(null);
  const { size } = useThree();
  
  // Load the detailed foreground photography
  const texture = useTexture("/assets/background_hero.png");

  // Inertial tracker coordinates
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const clock = useRef(0);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime += delta;
      clock.current += delta;
      
      // Ensure aspect bounds recalculate smoothly on resize bindings
      materialRef.current.uResolution.set(size.width, size.height);
      
      // Re-map R3F global uniform pointer space [-1, 1] firmly into WebGL native UV [0, 1] bounds
      const px = (state.pointer.x + 1) / 2;
      const py = (state.pointer.y + 1) / 2;
      
      // Create an elegant autonomous wandering offset using complex sine waves (Lissajous curve)
      // This ensures the spotlight is ALWAYS wandering the screen gracefully, even if the mouse is perfectly still!
      const wanderX = Math.sin(clock.current * 0.4) * 0.15 + Math.cos(clock.current * 0.25) * 0.1;
      const wanderY = Math.cos(clock.current * 0.5) * 0.15 + Math.sin(clock.current * 0.3) * 0.1;
      
      // The physical target destination is the user's cursor plus the wandering offset
      const targetX = px + wanderX;
      const targetY = py + wanderY;

      // Slerp the spotlight origin smoothly so it glides smoothly towards the drifting target
      targetMouse.current.x += (targetX - targetMouse.current.x) * (delta * 3);
      targetMouse.current.y += (targetY - targetMouse.current.y) * (delta * 3);

      materialRef.current.uMouse.copy(targetMouse.current);
    }
  });

  return (
    <mesh>
      {/* Full clipping Orthographic plane lock */}
      <planeGeometry args={[2, 2]} />
      {/* @ts-expect-error custom shader extension inject */}
      <spotlightMaterial 
        ref={materialRef} 
        uTexture={texture}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function HeroFluid() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}
    >
      <OrthographicCamera makeDefault position={[0, 0, 1]} left={-1} right={1} top={1} bottom={-1} near={0} far={2} />
      <Suspense fallback={null}>
        <FluidPlane />
      </Suspense>
    </Canvas>
  );
}
