"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface PedestalProps {
    position: [number, number, number];
    onClick: () => void;
}

export default function Pedestal({ position, onClick }: PedestalProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <group position={position}>
            {/* The Pedestal Base */}
            <mesh position={[0, 0.5, 0]}>
                <cylinderGeometry args={[0.4, 0.5, 2, 32]} />
                <meshStandardMaterial color="grey" roughness={0.5} metalness={0.8} />
            </mesh>

            {/* Floating Interactable Object */}
            <mesh
                ref={meshRef}
                position={[0, 2.5, 0]}
                onClick={(e) => { e.stopPropagation(); onClick(); }}
                onPointerOver={() => {
                    setHover(true);
                    document.body.style.cursor = "pointer";
                }}
                onPointerOut={() => {
                    setHover(false);
                    document.body.style.cursor = "auto";
                }}
            >
                <octahedronGeometry args={[0.3, 0]} />
                <meshStandardMaterial
                    color={hovered ? "#ff0000" : "#6366f1"}
                    emissive={hovered ? "#ff0000" : "#6366f1"}
                    emissiveIntensity={hovered ? 2 : 0.5}
                    wireframe
                />
            </mesh>

            {/* Label */}
            <Text
                position={[0, 3.2, 0]}
                fontSize={0.2}
                color="black"
                anchorX="center"
                anchorY="middle"
            >
                INFO
            </Text>
        </group>
    );
}
