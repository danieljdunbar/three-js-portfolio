"use client";

import { PointerLockControls, Grid, Text, Float } from "@react-three/drei";
import Room from "./Room";
import ArtPiece from "./ArtPiece";
import useScene from "./hooks/useScene";
import WallWithHole from "./WallWithHole";

export default function Scene() {
    const { layout, entryWalls, roomWalls, controlsRef } = useScene();

    return (
        <>
            <PointerLockControls ref={controlsRef} />

            {/* Room 1: The Entry */}
            {/* We render the floor/ceiling using Room, but disable ALL walls because we render custom segments */}
            <Room {...layout.entry} hasWallBack={false} hasWallLeft={false} hasWallRight={false} hasWallFront={false}>
                <Text position={[0, 5, -8]} fontSize={0.8} color="red">
                    WELCOME TO THE GALLERY
                </Text>

                {/* Dynamically Generated Wall Segments */}
                {entryWalls.map((wall, i) => (
                    <mesh key={i} position={wall.pos}>
                        <boxGeometry args={wall.size} />
                        <meshStandardMaterial color="#fbf9f9ff" roughness={0.9} />
                    </mesh>
                ))}
            </Room>

            {/* Corridor Right */}
            <Room {...layout.corrRight} hasWallLeft={false} hasWallRight={false} />

            {/* Room Right: Art Gallery 1 */}
            <Room {...layout.roomRight} hasWallLeft={false}>
                <WallWithHole {...roomWalls.rightWingWall} />
                <ArtPiece
                    position={[0, 6, -5.9]}
                    rotation={[0, 0, 0]}
                    url="/images/art1.png"
                    scale={[6, 6]}
                />
                <pointLight position={[0, 10, 0]} intensity={2.5} color="#ffffff" />
            </Room>

            {/* Corridor Left */}
            <Room {...layout.corrLeft} hasWallLeft={false} hasWallRight={false} />

            {/* Room Left: Art Gallery 2 */}
            <Room {...layout.roomLeft} hasWallRight={false}>
                <WallWithHole {...roomWalls.leftWingWall} />
                <ArtPiece
                    position={[0, 6, -5.9]}
                    rotation={[0, 0, 0]}
                    url="/images/art2.png"
                    scale={[6, 6]}
                />
                <pointLight position={[0, 10, 0]} intensity={2.5} color="#ffffff" />
            </Room>

            {/* Corridor Front */}
            <Room {...layout.corrFront} hasWallFront={false} hasWallBack={false} />

            {/* Room Front: The Nexus */}
            <Room {...layout.roomFront} hasWallFront={false}>
                <WallWithHole {...roomWalls.frontWingWall} />
                <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                    <mesh position={[0, 8, 0]}>
                        <octahedronGeometry args={[4, 0]} />
                        <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={2} wireframe />
                    </mesh>
                </Float>

                <mesh position={[0, 2, 0]}>
                    <torusKnotGeometry args={[1.5, 0.4, 128, 16]} />
                    <meshStandardMaterial color="#10b981" roughness={0.2} metalness={0.8} />
                </mesh>

                <pointLight position={[0, 8, 0]} intensity={3} color="#6366f1" distance={30} />
            </Room>

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
