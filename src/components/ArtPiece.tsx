"use client";

import { Image as DreiImage } from "@react-three/drei";

interface ArtPieceProps {
    position: [number, number, number];
    rotation: [number, number, number];
    url: string;
    scale?: [number, number];
    data?: {
        title: string;
        description: string;
    };
    onSelect?: (data: { title: string; description: string; url: string }) => void;
}

export default function ArtPiece({ position, rotation, url, scale = [3, 3], data, onSelect }: ArtPieceProps) {
    const handlePointerOver = () => {
        document.body.style.cursor = "pointer";
    };

    const handlePointerOut = () => {
        document.body.style.cursor = "auto";
    };

    const handleClick = () => {
        if (onSelect && data) {
            onSelect({ ...data, url });
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
            <DreiImage url={url} scale={scale} toneMapped={false} />
        </group>
    );
}
