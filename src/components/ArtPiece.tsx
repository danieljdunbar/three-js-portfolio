"use client";

import { Image as DreiImage } from "@react-three/drei";

interface ArtPieceProps {
    position: [number, number, number];
    rotation: [number, number, number];
    url: string;
    scale?: [number, number];
}

export default function ArtPiece({ position, rotation, url, scale = [3, 3] }: ArtPieceProps) {
    return (
        <group position={position} rotation={rotation}>
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
