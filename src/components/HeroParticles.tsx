"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

const count = 1500;
const defaultParticles = Array.from({ length: count }).map(() => {
  const x = (Math.random() - 0.5) * 15;
  const y = (Math.random() - 0.5) * 15;
  const z = (Math.random() - 0.5) * 5; 
  const speed = 0.1 + Math.random() * 0.2; 
  const size = 0.01 + Math.random() * 0.04;
  return { x, y, z, originX: x, originY: y, speed, size, rand: Math.random() };
});

function Particles() {
  // A luxury particle system representing "Gold Dust" or "Bokeh"
  const mesh = useRef<THREE.InstancedMesh>(null);
  const targetCursor = useRef(new THREE.Vector2(0, 0));
  const dummy = new THREE.Object3D();



  useFrame((state, delta) => {
    const instancedMesh = mesh.current;
    if (!instancedMesh) return;

    // Track cursor strictly for repulsion physics
    targetCursor.current.x += (state.pointer.x - targetCursor.current.x) * 0.1;
    targetCursor.current.y += (state.pointer.y - targetCursor.current.y) * 0.1;

    // We calculate physics in world space (roughly matching screen bounds at Z=0)
    const cursorWorldX = targetCursor.current.x * 5;
    const cursorWorldY = targetCursor.current.y * 5;

    defaultParticles.forEach((particle, i) => {
      // 1. Natural Drift (Slowly upward and slightly waving)
      const time = state.clock.getElapsedTime();
      particle.y += particle.speed * delta;
      
      // Reset if it goes too high (wrapping)
      if (particle.y > 6) particle.y = -6;

      // Wavy sideways motion using sine waves
      const wave = Math.sin(time * particle.speed + particle.rand * Math.PI * 2) * 0.5;

      // 2. Cursor Repulsion
      const dx = (particle.x + wave) - cursorWorldX;
      const dy = particle.y - cursorWorldY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Magical avoidance: particles push away gently if cursor is near
      let repulsionX = 0;
      let repulsionY = 0;
      if (dist < 2.0) {
        const force = (2.0 - dist) / 2.0; // 0 to 1
        // Gently repel outward
        repulsionX = (dx / dist) * force * 0.2;
        repulsionY = (dy / dist) * force * 0.2;
      }

      // Update positions
      dummy.position.set(
        particle.x + wave + repulsionX, 
        particle.y + repulsionY, 
        particle.z
      );
      
      // Add a slight rotation for sparkle, and scale based on depth to simulate bokeh
      const depthScale = Math.max(0.1, (particle.z + 2.5) / 5); // Particles closer to camera are slightly larger
      dummy.scale.set(particle.size * depthScale, particle.size * depthScale, particle.size * depthScale);
      
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
    });
    
    instancedMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      {/* We use a simple circle for elegant bokeh style discs */}
      <circleGeometry args={[1, 16]} />
      {/* 
        Additive blending with depth writing disabled creates perfectly glowing bokeh overlaps 
        Color: #D4AF37 (Gold) mixed with slightly warmer cream tones.
      */}
      <meshBasicMaterial 
        color="#FCECE3" 
        transparent 
        opacity={0.3} 
        blending={THREE.AdditiveBlending} 
        depthWrite={false} 
      />
    </instancedMesh>
  );
}

function StaticBackground() {
  const texture = useTexture("/assets/background_hero.png");
  const { viewport } = useThree();

  // We mathematically recreate 'object-fit: cover' mapping
  const imgAspect = 16 / 9;
  const screenAspect = viewport.width / viewport.height;
  
  const scaleX = screenAspect > imgAspect ? viewport.width : viewport.height * imgAspect;
  const scaleY = screenAspect > imgAspect ? viewport.width / imgAspect : viewport.height;

  return (
    <mesh position={[0, 0, -3]}>
      <planeGeometry args={[scaleX, scaleY]} />
      <meshBasicMaterial map={texture} depthWrite={false} color="#FFFFFF" />
    </mesh>
  );
}

export default function HeroParticles() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}
    >
      <Suspense fallback={null}>
        <StaticBackground />
        {/* Adds a slight fog into the scene so particles fade out beautifully in the distance */}
        <fog attach="fog" args={["#2C2A28", 3, 15]} />
        <Particles />
      </Suspense>
    </Canvas>
  );
}
