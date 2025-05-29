'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import Box3D from './Box3D';
import MouseParallax from './MouseParallax';
import BasicLights from './lights';
import { usePathname } from 'next/navigation';
import EnterText, { EnterTextHandles } from './entertext';
import AnimatedStars from './stars';
import Platform from './cube';

interface PortalSceneProps {}

const PortalScene = (props: PortalSceneProps) => {
  const [canvasResetKey, setCanvasResetKey] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [boxKey, setBoxKey] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const enterTextRef = useRef<EnterTextHandles>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') {
      setBoxKey(prevKey => prevKey + 1);
      setIsZooming(false);
    }
  }, [pathname]);

  useEffect(() => {
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setCanvasResetKey(prev => prev + 1);
    };
    const canvas = canvasRef.current;
    canvas?.addEventListener('webglcontextlost', handleContextLost);
    return () => canvas?.removeEventListener('webglcontextlost', handleContextLost);
  }, []);

  return (
    <div className="h-screen w-full bg-neutral-900 relative">
      <Canvas 
        key={canvasResetKey}
        gl={{ antialias: true }}
        onCreated={({ gl }) => {
          canvasRef.current = gl.domElement;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.5;
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={60} />
        <MouseParallax isEnabled={!isZooming} strength={0.5} dampingFactor={0.10} />
        <Box3D 
          key={boxKey} 
          onZoomStart={() => setIsZooming(true)} 
          getTextAnimationControls={() => enterTextRef.current}
        />
        <BasicLights />
        <AnimatedStars />

        <Platform 
          position={[17, -35, -40]} 
          rotation={Math.PI * 2.25}
          width={24}
          height={50}
          length={40}
          color="#555555"
          opacity={0.6}
        />
        <Platform
          position={[12, -43, -39.5]}
          rotation={Math.PI * 2.25}
          width={24}
          height={50}
          length={40}
          color="#555555"
          opacity={0.4}
        />
        <Platform
          position={[7, -51, -39]}
          rotation={Math.PI * 2.25}
          width={24}
          height={50}
          length={40}
          color="#555555"
          opacity={0.2}
        />
        <Platform
          position={[2, -59, -38.5]}
          rotation={Math.PI * 2.25}
          width={24}
          height={50}
          length={40}
          color="#555555"
          opacity={0}
        />
      </Canvas>

      {/* Hero Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-serif">
            Your Personal AI Doctor
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            24/7 medical guidance powered by advanced AI technology
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortalScene;