"use client";

import { Box, Plane, useTexture } from "@react-three/drei";
import * as THREE from "three";

interface RoomProps {
    position: [number, number, number];
    size: [number, number, number];
    color?: string;
    children?: React.ReactNode;
    hasWallFront?: boolean;
    hasWallBack?: boolean;
    hasWallLeft?: boolean;
    hasWallRight?: boolean;
}

export default function Room({
    position,
    size,
    color = "#fbf9f9ff",
    children,
    hasWallFront = true,
    hasWallBack = true,
    hasWallLeft = true,
    hasWallRight = true,
}: RoomProps) {
    const [width, height, depth] = size;

    return (
        <group position={position}>
            {/* Floor */}
            <Plane
                args={[width, depth]}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0, 0]}
                receiveShadow
            >
                <meshStandardMaterial color={color} roughness={0.8} />
            </Plane>

            {/* Ceiling */}
            <Plane
                args={[width, depth]}
                rotation={[Math.PI / 2, 0, 0]}
                position={[0, height, 0]}
            >
                <meshStandardMaterial color="#0a0a0a" roughness={1} />
            </Plane>

            {/* Walls */}
            {hasWallBack && (
                <Plane
                    args={[width, height]}
                    position={[0, height / 2, -depth / 2]}
                    receiveShadow
                >
                    <meshStandardMaterial color={color} roughness={0.9} />
                </Plane>
            )}

            {hasWallFront && (
                <Plane
                    args={[width, height]}
                    rotation={[0, Math.PI, 0]}
                    position={[0, height / 2, depth / 2]}
                    receiveShadow
                >
                    <meshStandardMaterial color={color} roughness={0.9} />
                </Plane>
            )}

            {hasWallLeft && (
                <Plane
                    args={[depth, height]}
                    rotation={[0, Math.PI / 2, 0]}
                    position={[-width / 2, height / 2, 0]}
                    receiveShadow
                >
                    <meshStandardMaterial color={color} roughness={0.9} />
                </Plane>
            )}

            {hasWallRight && (
                <Plane
                    args={[depth, height]}
                    rotation={[0, -Math.PI / 2, 0]}
                    position={[width / 2, height / 2, 0]}
                    receiveShadow
                >
                    <meshStandardMaterial color={color} roughness={0.9} />
                </Plane>
            )}

            {children}
        </group>
    );
}
