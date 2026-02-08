"use client";

import { Canvas } from "@react-three/fiber";
import { Sky, ContactShadows, Environment } from "@react-three/drei";
import { useState } from "react";
import InfoModal from "./InfoModal";
import Scene from "./Scene";

export default function Experience() {
    const [selectedArt, setSelectedArt] = useState<{ title: string; description: string; url: string } | null>(null);
    const [showInstructions, setShowInstructions] = useState(false);

    return (
        <div className="w-full h-screen bg-[#050505]">
            <Canvas shadows camera={{ position: [0, 2, 5], fov: 75 }}>
                <Sky sunPosition={[100, 20, 100]} />
                <Environment preset="city" />
                <ambientLight intensity={0.5} />
                <Scene
                    onArtSelect={setSelectedArt}
                    onShowInstructions={() => setShowInstructions(true)}
                />
                <ContactShadows
                    position={[0, -0.01, 0]}
                    opacity={0.4}
                    scale={20}
                    blur={2.4}
                    far={4.5}
                />
            </Canvas>
            <div className="absolute top-10 left-10 pointer-events-none text-white/80">
                <h1 className="text-4xl font-bold tracking-tighter mb-2">Daniel's Gallery</h1>
                <p className="text-sm uppercase tracking-[0.2em] font-medium opacity-50">
                    WASD to move • Click to interact
                </p>
            </div>
            {selectedArt && (
                <InfoModal
                    title={selectedArt.title}
                    description={selectedArt.description}
                    url={selectedArt.url}
                    onClose={() => setSelectedArt(null)}
                />
            )}
            {showInstructions && (
                <InfoModal
                    title="How to Navigate"
                    description="Welcome to the gallery! Use WASD or Arrow Keys to move around. Use your mouse to look freely. Click on art pieces to view details. Walk through corridors to explore different rooms."
                    onClose={() => setShowInstructions(false)}
                />
            )}
        </div>
    );
}
