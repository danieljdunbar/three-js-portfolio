"use client";

import { Image as DreiImage, Text } from "@react-three/drei";
import { ArtDetails } from "./types";

interface ArtPieceProps {
    position: [number, number, number];
    rotation: [number, number, number];
    scale?: [number, number];
    details: ArtDetails;
    onSelect: (data: ArtDetails) => void;
}

export default function ArtPiece({ position, rotation, scale = [3, 3], details, onSelect }: ArtPieceProps) {
    const handlePointerOver = () => {
        document.body.style.cursor = "pointer";
    };

    const handlePointerOut = () => {
        document.body.style.cursor = "auto";
    };

    const handleClick = () => {
        if (onSelect && details) {
            onSelect(details);
        }
    };
    return (
        <group
            position={position}
            rotation={rotation}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
        >

            {/* Frame */}
            <mesh position={[0, 0, -0.01]}>
                <boxGeometry args={[scale[0] + 0.2, scale[1] + 0.2, 0]} />
                <meshStandardMaterial color="#333333" roughness={0.1} metalness={0.8} />
            </mesh>

            {/* Art */}
            <DreiImage url={details?.url} scale={scale} toneMapped={false} />

            {/* Title */}
            <Text
                position={[0, -scale[1] / 2 - 0.6, 0.05]}
                fontSize={0.3}
                color="black"
                anchorX="center"
                anchorY="top"
                maxWidth={scale[0]}
            >
                {details?.title}
            </Text>
        </group>
    );
}
