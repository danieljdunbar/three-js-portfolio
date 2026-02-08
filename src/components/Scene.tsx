"use client";

import { PointerLockControls, Grid, Text, Float } from "@react-three/drei";
import Room from "./Room";
import ArtPiece from "./ArtPiece";
import GalleryWall from "./GalleryWall";
import useScene from "./hooks/useScene";
import WallWithHole from "./WallWithHole";
import Pedestal from "./Pedestal";
import { NORTH_GALLERY_ART, SOUTH_GALLERY_ART, WEST_GALLERY_ART } from "./const";

interface SceneProps {
    onArtSelect: (data: { title: string; description: string; url: string }) => void;
    onShowInstructions: () => void;
}

export default function Scene({ onArtSelect, onShowInstructions }: SceneProps) {

    const { layout, entryWalls, roomWalls } = useScene();

    return (
        <>
            {/* Room 1: The Entry */}
            {/* We render the floor/ceiling using Room, but disable ALL walls because we render custom segments */}
            <Room {...layout.entry} hasWallBack={false} hasWallLeft={false} hasWallRight={false} hasWallFront={false}>
                {/* Dynamically Generated Wall Segments */}
                {entryWalls.map((wall, i) => (
                    <mesh key={i} position={wall.pos}>
                        <boxGeometry args={wall.size} />
                        <meshStandardMaterial color="#fbf9f9ff" roughness={0.9} />
                    </mesh>
                ))}

                <Pedestal position={[0, 0, -3]} onClick={onShowInstructions} />
            </Room>

            {/* Corridor Right */}
            <Room {...layout.corrRight} hasWallLeft={false} hasWallRight={false} />

            {/* Room Right: Art Gallery 1 */}
            <Room {...layout.roomRight} hasWallLeft={false}>
                <WallWithHole {...roomWalls.rightWingWall} />

                <mesh position={[0, 2, 0]}>
                    <torusKnotGeometry args={[1.5, 0.4, 128, 16]} />
                    <meshStandardMaterial color="#10b981" roughness={0.2} metalness={0.8} />
                </mesh>

                <pointLight position={[0, 10, 0]} intensity={2.5} color="#ffffff" />
            </Room >

            {/* Corridor Left */}
            < Room {...layout.corrLeft} hasWallLeft={false} hasWallRight={false} />

            {/* Room Left: Art Gallery 2 */}
            < Room {...layout.roomLeft} hasWallRight={false} >
                <WallWithHole {...roomWalls.leftWingWall} />

                <GalleryWall
                    artData={WEST_GALLERY_ART}
                    position={[-19.9, 6, 0]}
                    rotation={[0, Math.PI / 2, 0]}
                    onArtSelect={onArtSelect}
                />
                <GalleryWall
                    artData={NORTH_GALLERY_ART}
                    position={[0, 6, -19.9]}
                    rotation={[0, 0, 0]}
                    onArtSelect={onArtSelect}
                />
                <GalleryWall
                    artData={SOUTH_GALLERY_ART}
                    position={[0, 6, 19.9]}
                    rotation={[0, Math.PI, 0]}
                    onArtSelect={onArtSelect}
                />

                <pointLight position={[0, 10, 0]} intensity={2.5} color="#ffffff" />
            </Room >

            {/* Corridor Front */}
            < Room {...layout.corrFront} hasWallFront={false} hasWallBack={false} />

            {/* Room Front: The Nexus */}
            < Room {...layout.roomFront} hasWallFront={false} >
                <WallWithHole {...roomWalls.frontWingWall} />

                {/* Back Wall Art (Two Pieces) */}
                <ArtPiece
                    position={[-9, 6, -19.9]}
                    rotation={[0, 0, 0]}
                    url="/images/art3.png"
                    scale={[10, 10]}
                    data={{
                        title: "Peloton",
                        description: "A visualization of AI awareness emerging from the void."
                    }}
                    onSelect={onArtSelect}
                />
                <ArtPiece
                    position={[9, 6, -19.9]}
                    rotation={[0, 0, 0]}
                    url="/images/art4.png"
                    scale={[10, 10]}
                    data={{
                        title: "Memora Health",
                        description: "An entity traversing the spaces between dimensions."
                    }}
                    onSelect={onArtSelect}
                />

                {/* Left Wall Art */}
                <ArtPiece
                    position={[-19.9, 6, 0]}
                    rotation={[0, Math.PI / 2, 0]}
                    url="/images/art5.png"
                    scale={[10, 10]}
                    data={{
                        title: "Healthymind",
                        description: "Mathematical perfection manifested in golden geometry."
                    }}
                    onSelect={onArtSelect}
                />

                {/* Right Wall Art */}
                <ArtPiece
                    position={[19.9, 6, 0]}
                    rotation={[0, -Math.PI / 2, 0]}
                    url="/images/art6.png"
                    scale={[10, 10]}
                    data={{
                        title: "Google",
                        description: "The raw energy of speed captured in a static moment."
                    }}
                    onSelect={onArtSelect}
                />

                <pointLight position={[0, 10, 0]} intensity={2.5} color="#ffffff" />
            </Room >

            <Grid
                infiniteGrid
                fadeDistance={100}
                fadeStrength={5}
                cellSize={1}
                sectionSize={5}
                sectionColor="#222222"
                cellColor="#111111"
            />

            <ambientLight intensity={0.2} />
        </>
    );
}
