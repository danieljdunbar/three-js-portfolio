"use client";

import { PointerLockControls, Grid, Text, Float } from "@react-three/drei";
import Room from "./Room";
import ArtPiece from "./ArtPiece";
import GalleryWall from "./GalleryWall";
import useScene from "./hooks/useScene";
import WallWithHole from "./WallWithHole";
import Pedestal from "./Pedestal";
import { EDUCATION_ART, GOOGLE_ART, HEALTHYMIND_ART, MEMORA_HEALTH_ART, NORTH_GALLERY_ART, PELOTON_ART, SKILLS_ART, SOUTH_GALLERY_ART, WEST_GALLERY_ART } from "./artPieces";
import ArcadeModel from "./ArcadeModel";

interface SceneProps {
    onArtSelect: (data: { title: string; description: string; url: string }) => void;
    onShowInstructions: () => void;
    onOpenTicTacToe: () => void;
}

export default function Scene({ onArtSelect, onShowInstructions, onOpenTicTacToe }: SceneProps) {
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

                <ArcadeModel
                    position={[0, 0, 0]}
                    scale={[0.05, 0.05, 0.05]}
                    rotation={[-Math.PI / 2, 0, Math.PI]}
                    onClick={onOpenTicTacToe}
                    onPointerOver={() => document.body.style.cursor = "pointer"}
                    onPointerOut={() => document.body.style.cursor = "auto"}
                />

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
                    scale={[8, 8]}
                    details={PELOTON_ART}
                    onSelect={onArtSelect}
                />
                <ArtPiece
                    position={[9, 6, -19.9]}
                    rotation={[0, 0, 0]}
                    scale={[8, 8]}
                    details={MEMORA_HEALTH_ART}
                    onSelect={onArtSelect}
                />

                {/* Left Wall Art */}
                <ArtPiece
                    position={[-19.9, 6, 0]}
                    rotation={[0, Math.PI / 2, 0]}
                    scale={[8, 8]}
                    details={HEALTHYMIND_ART}
                    onSelect={onArtSelect}
                />

                {/* Right Wall Art */}
                <ArtPiece
                    position={[19.9, 6, 0]}
                    rotation={[0, -Math.PI / 2, 0]}
                    scale={[8, 8]}
                    details={GOOGLE_ART}
                    onSelect={onArtSelect}
                />

                {/* Art on entrance walls */}
                <ArtPiece
                    position={[10, 6, 18.9]}
                    rotation={[0, Math.PI, 0]}
                    scale={[5, 5]}
                    details={SKILLS_ART}
                    onSelect={onArtSelect}
                />
                <ArtPiece
                    position={[-10, 6, 18.9]}
                    rotation={[0, Math.PI, 0]}
                    scale={[5, 5]}
                    details={EDUCATION_ART}
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
