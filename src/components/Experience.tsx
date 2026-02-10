"use client";

import { Canvas } from "@react-three/fiber";
import { Sky, ContactShadows, Environment } from "@react-three/drei";
import { useState } from "react";
import InfoModal from "./InfoModal";
import Scene from "./Scene";
import SocialLinks from "./SocialLinks";
import TicTacToeModal from "./TicTacToeModal";

export default function Experience() {
    const [selectedArt, setSelectedArt] = useState<{ title: string; description: string; url: string } | null>(null);
    const [showInstructions, setShowInstructions] = useState(false);
    const [showTicTacToe, setShowTicTacToe] = useState(false);

    return (
        <div className="w-full h-screen bg-[#050505]">
            <Canvas shadows camera={{ position: [0, 2, 5], fov: 75 }}>
                {/* <Sky sunPosition={[100, 20, 100]} /> */}
                <Environment preset="city" />
                {/* <ambientLight intensity={0.5} /> */}
                <Scene
                    onArtSelect={setSelectedArt}
                    onShowInstructions={() => setShowInstructions(true)}
                    onOpenTicTacToe={() => setShowTicTacToe(true)}
                />
                <ContactShadows
                    position={[0, -0.01, 0]}
                    opacity={0.4}
                    scale={20}
                    blur={2.4}
                    far={4.5}
                />
            </Canvas>
            <SocialLinks />
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
                    title="Welcome to my gallery!"
                    description="This is a little gallery about me. Click on the art pieces to view details. In the North room you will find details related to work experience, in the West room you will can get a bit more of a glimpse into me and my personal life, and in the East room there is a fun little game you can play!"
                    onClose={() => setShowInstructions(false)}
                />
            )}
            {showTicTacToe && (
                <TicTacToeModal onClose={() => setShowTicTacToe(false)} />
            )}
        </div>
    );
}
