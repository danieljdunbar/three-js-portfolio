"use client";

import { Canvas } from "@react-three/fiber";
import { Sky, ContactShadows, Environment } from "@react-three/drei";
import Scene from "./Scene";

export default function Experience() {
    return (
        <div className="w-full h-screen bg-[#050505]">
            <Canvas shadows camera={{ position: [0, 2, 5], fov: 75 }}>
                <Sky sunPosition={[100, 20, 100]} />
                <Environment preset="city" />
                <ambientLight intensity={0.5} />
                <Scene />
                <ContactShadows
                    position={[0, -0.01, 0]}
                    opacity={0.4}
                    scale={20}
                    blur={2.4}
                    far={4.5}
                />
            </Canvas>
            <div className="absolute top-10 left-10 pointer-events-none text-white/80">
                <h1 className="text-4xl font-bold tracking-tighter mb-2">3D GALLERY</h1>
                <p className="text-sm uppercase tracking-[0.2em] font-medium opacity-50">
                    Click to explore • WASD to move • Mouse to look
                </p>
            </div>
        </div>
    );
}
