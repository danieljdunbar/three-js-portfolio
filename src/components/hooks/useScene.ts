"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";
import { color, roughness } from "three/tsl";
import WallWithHole, { WallWithHoleProps } from "../WallWithHole";
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';

interface Layout {
    position: [number, number, number];
    size: [number, number, number];
};

// Initial sizes for the rooms and corridors
const roomSizes: Record<string, [number, number, number]> = {
    entry: [20, 12, 20],
    corrRight: [15, 12, 5],
    roomRight: [40, 12, 40],
    corrLeft: [15, 12, 5],
    roomLeft: [40, 12, 40],
    corrFront: [5, 12, 15],
    roomFront: [40, 12, 40],
};

const OVERLAP = 1; // Overlap for seamless collisions (must be > 2 * collision buffer)
const COLLISION_BUFFER = 0.5; // Collision buffer for player movement

export default function useScene() {
    const { camera } = useThree();
    const controlsRef = useRef<any>(null);

    // Initial Look Direction
    useEffect(() => {
        // Set initial camera rotation to look down the corridor
        // You can change these values to change the initial direction.
        // For example, to look left, try camera.lookAt(-10, 2, 0);

        // Look straight ahead (down -Z)
        camera.lookAt(0, 2, -10);
    }, [camera]);
    const [movement, setMovement] = useState({
        moveForward: false, moveBackward: false, rotateLeft: false, rotateRight: false
    });

    const velocity = useRef(new THREE.Vector3());
    const direction = useRef(new THREE.Vector3());

    // Calculate layout positions dynamically
    const layout: Record<string, Layout> = useMemo(() => {
        const { entry, corrRight, roomRight, corrLeft, roomLeft, corrFront, roomFront } = roomSizes;

        // Entry is at 0,0,0
        const entryPos = [0, 0, 0] as [number, number, number];

        // Right Wing (Positive X)
        const corrRightX = (entry[0] / 2) + (corrRight[0] / 2) - OVERLAP;
        const corrRightPos = [corrRightX, 0, 0] as [number, number, number];

        const roomRightX = corrRightX + (corrRight[0] / 2) + (roomRight[0] / 2) - OVERLAP;
        const roomRightPos = [roomRightX, 0, 0] as [number, number, number];

        // Left Wing (Negative X)
        const corrLeftX = -((entry[0] / 2) + (corrLeft[0] / 2) - OVERLAP);
        const corrLeftPos = [corrLeftX, 0, 0] as [number, number, number];

        const roomLeftX = corrLeftX - ((corrLeft[0] / 2) + (roomLeft[0] / 2) - OVERLAP);
        const roomLeftPos = [roomLeftX, 0, 0] as [number, number, number];

        // Front Wing (Negative Z)
        const corrFrontZ = -((entry[2] / 2) + (corrFront[2] / 2) - OVERLAP);
        const corrFrontPos = [0, 0, corrFrontZ] as [number, number, number];

        const roomFrontZ = corrFrontZ - ((corrFront[2] / 2) + (roomFront[2] / 2) - OVERLAP);
        const roomFrontPos = [0, 0, roomFrontZ] as [number, number, number];

        return {
            entry: { position: entryPos, size: entry },
            corrRight: { position: corrRightPos, size: corrRight },
            roomRight: { position: roomRightPos, size: roomRight },
            corrLeft: { position: corrLeftPos, size: corrLeft },
            roomLeft: { position: roomLeftPos, size: roomLeft },
            corrFront: { position: corrFrontPos, size: corrFront },
            roomFront: { position: roomFrontPos, size: roomFront },
        };
    }, []);

    // Helper to generate wall segments for the Entry room
    const entryWalls = useMemo(() => {
        const { entry, corrRight, corrLeft, corrFront } = roomSizes;
        const w = entry[0];
        const h = entry[1];
        const d = entry[2];

        // Wall thickness
        const t = 1;

        // Front Wall (-Z) with hole for corrFront
        // Hole width = corrFront[0], Height = corrFront[1]
        const hwFront = corrFront[0];
        const hhFront = corrFront[1];

        const frontWalls = [
            // Left segment
            {
                pos: [-(w + hwFront) / 4, h / 2, -d / 2 + t / 2] as [number, number, number],
                size: [(w - hwFront) / 2, h, t] as [number, number, number]
            },
            // Right segment
            {
                pos: [(w + hwFront) / 4, h / 2, -d / 2 + t / 2] as [number, number, number],
                size: [(w - hwFront) / 2, h, t] as [number, number, number]
            },
            // Top segment (lintel)
            ...(h > hhFront ? [{
                pos: [0, hhFront + (h - hhFront) / 2, -d / 2 + t / 2] as [number, number, number],
                size: [hwFront, h - hhFront, t] as [number, number, number]
            }] : [])
        ];

        // Right Wall (+X) with hole for corrRight
        // Hole width (along Z) = corrRight[2], Height = corrRight[1]
        const hwRight = corrRight[2];
        const hhRight = corrRight[1];

        const rightWalls = [
            // Back segment (towards +Z)
            {
                pos: [w / 2 - t / 2, h / 2, (d + hwRight) / 4] as [number, number, number],
                size: [t, h, (d - hwRight) / 2] as [number, number, number]
            },
            // Front segment (towards -Z)
            {
                pos: [w / 2 - t / 2, h / 2, -(d + hwRight) / 4] as [number, number, number],
                size: [t, h, (d - hwRight) / 2] as [number, number, number]
            },
            // Top segment
            ...(h > hhRight ? [{
                pos: [w / 2 - t / 2, hhRight + (h - hhRight) / 2, 0] as [number, number, number],
                size: [t, h - hhRight, hwRight] as [number, number, number]
            }] : [])
        ];

        // Left Wall (-X) with hole for corrLeft
        // Hole width (along Z) = corrLeft[2], Height = corrLeft[1]
        const hwLeft = corrLeft[2];
        const hhLeft = corrLeft[1];

        const leftWalls = [
            // Back segment (+Z)
            {
                pos: [-w / 2 + t / 2, h / 2, (d + hwLeft) / 4] as [number, number, number],
                size: [t, h, (d - hwLeft) / 2] as [number, number, number]
            },
            // Front segment (-Z)
            {
                pos: [-w / 2 + t / 2, h / 2, -(d + hwLeft) / 4] as [number, number, number],
                size: [t, h, (d - hwLeft) / 2] as [number, number, number]
            },
            // Top segment
            ...(h > hhLeft ? [{
                pos: [-w / 2 + t / 2, hhLeft + (h - hhLeft) / 2, 0] as [number, number, number],
                size: [t, h - hhLeft, hwLeft] as [number, number, number]
            }] : [])
        ];

        // Back Wall (+Z) - Full wall (no door requested in back)
        const backWall = [{
            pos: [0, h / 2, d / 2 - t / 2] as [number, number, number],
            size: [w, h, t] as [number, number, number]
        }];

        return [...frontWalls, ...rightWalls, ...leftWalls, ...backWall];
    }, []);

    const roomWalls = useMemo(() => {
        const { roomRight, corrRight, roomLeft, corrLeft, roomFront, corrFront } = roomSizes;
        const t = 1;

        // Room Right: Needs Left Wall (-X) with hole
        const rightWingWall: WallWithHoleProps = {
            wallWidth: roomRight[2],
            wallHeight: roomRight[1],
            holeWidth: corrRight[2],
            holeHeight: corrRight[1],
            position: [-roomRight[0] / 2 + t / 2, roomRight[1] / 2, 0],
            rotation: [0, Math.PI / 2, 0],
            thickness: t
        };

        // Room Left: Needs Right Wall (+X) with hole
        const leftWingWall: WallWithHoleProps = {
            wallWidth: roomLeft[2],
            wallHeight: roomLeft[1],
            holeWidth: corrLeft[2],
            holeHeight: corrLeft[1],
            position: [roomLeft[0] / 2 - t / 2, roomLeft[1] / 2, 0], // Position: Right face
            rotation: [0, Math.PI / 2, 0],
            thickness: t
        };

        // Room Front: Needs "Front" Wall (+Z local, which faces the corridor at -Z relative to generated world? No wait)
        // Room Front is at Z = -40 (approx). Corridor is at Z = -15.
        // So corridor is in +Z direction relative to room.
        // So we need hole in +Z wall.
        const frontWingWall: WallWithHoleProps = {
            wallWidth: roomFront[0],
            wallHeight: roomFront[1],
            holeWidth: corrFront[0],
            holeHeight: corrFront[1],
            position: [0, roomFront[1] / 2, roomFront[2] / 2 - t / 2], // Position: Front face (+Z)
            rotation: [0, 0, 0],
            thickness: t
        };

        return { rightWingWall, leftWingWall, frontWingWall };
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.code) {
                case 'KeyW':
                case 'ArrowUp':
                    setMovement(m => ({ ...m, moveForward: true }));
                    break;
                case 'KeyS':
                case 'ArrowDown':
                    setMovement(m => ({ ...m, moveBackward: true }));
                    break;
                case 'KeyA':
                case 'ArrowLeft':
                    setMovement(m => ({ ...m, rotateLeft: true }));
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    setMovement(m => ({ ...m, rotateRight: true }));
                    break;
            }
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            switch (e.code) {
                case 'KeyW':
                case 'ArrowUp':
                    setMovement(m => ({ ...m, moveForward: false }));
                    break;
                case 'KeyS':
                case 'ArrowDown':
                    setMovement(m => ({ ...m, moveBackward: false }));
                    break;
                case 'KeyA':
                case 'ArrowLeft':
                    setMovement(m => ({ ...m, rotateLeft: false }));
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    setMovement(m => ({ ...m, rotateRight: false }));
                    break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // Dynamic Collision Detection based on layout config
    const checkCollisions = (pos: THREE.Vector3) => {
        // Buffer distance relative to wall (keep player 1 unit away from walls)
        const buffer = COLLISION_BUFFER;

        for (const zone of Object.values(layout)) {
            const [x, y, z] = zone.position;
            const [width, height, depth] = zone.size;

            const minX = x - width / 2;
            const maxX = x + width / 2;
            const minZ = z - depth / 2;
            const maxZ = z + depth / 2;

            // Check if position is within bounds
            if (pos.x >= minX + buffer && pos.x <= maxX - buffer &&
                pos.z >= minZ + buffer && pos.z <= maxZ - buffer) {
                return true;
            }
        }
        return false;
    };

    useFrame((state, delta) => {
        const { moveForward, moveBackward, rotateLeft, rotateRight } = movement;

        direction.current.z = Number(moveForward) - Number(moveBackward);
        direction.current.normalize();

        const speed = 10;
        const rotationSpeed = 2.0;

        // Rotation
        if (rotateLeft) {
            state.camera.rotation.y += rotationSpeed * delta;
        }
        if (rotateRight) {
            state.camera.rotation.y -= rotationSpeed * delta;
        }

        // Movement
        if (moveForward || moveBackward) {
            // Get forward vector from camera rotation
            const forward = new THREE.Vector3(0, 0, -1);
            forward.applyEuler(state.camera.rotation);
            forward.y = 0; // Keep movement on the ground plane
            forward.normalize();

            velocity.current.copy(forward).multiplyScalar(speed * direction.current.z * delta); // Invert Z because forward is -Z

            // Predict next position
            const prevPosition = state.camera.position.clone();

            // Move
            // Note: direction.z is 1 for Forward (which means moving in -Z local space)
            // But our logic above: forward vector is -Z. 
            // If moveForward is true, direction.z is 1. We want to move along forward vector.
            // So we just add velocity.
            state.camera.position.add(velocity.current);

            // Check collision
            if (!checkCollisions(state.camera.position)) {
                state.camera.position.copy(prevPosition);
            }
        }
    });

    return {
        // controlsRef, // Removed
        movement,
        setMovement,
        layout,
        entryWalls,
        roomWalls,
        checkCollisions,
    };
}