"use client";

export interface WallWithHoleProps {
    wallWidth: number,
    wallHeight: number,
    holeWidth: number,
    holeHeight: number,
    position: [number, number, number],
    rotation: [number, number, number],
    thickness: number
}

export default function WallWithHole({
    wallWidth,
    wallHeight,
    holeWidth,
    holeHeight,
    position,
    rotation,
    thickness
}: WallWithHoleProps) {
    // We generate the parts in local 2D space (x, y) relative to the wall center, then put them in a group
    // The wall is on the XY plane locally, then rotated/positioned.
    // Actually, easiest is to return an array of Box props (pos, size).

    // Left of hole
    const leftWidth = (wallWidth - holeWidth) / 2;
    const leftPos = [-holeWidth / 2 - leftWidth / 2, 0, 0];
    const leftSize = [leftWidth, wallHeight, thickness];

    // Right of hole
    const rightWidth = (wallWidth - holeWidth) / 2;
    const rightPos = [holeWidth / 2 + rightWidth / 2, 0, 0];
    const rightSize = [rightWidth, wallHeight, thickness];

    // Top of hole (lintel)
    const topHeight = wallHeight - holeHeight;
    const topPos = [0, wallHeight / 2 - topHeight / 2, 0];
    const topSize = [holeWidth, topHeight, thickness];

    const segments = [
        { pos: leftPos, size: leftSize },
        { pos: rightPos, size: rightSize },
    ];

    if (topHeight > 0) {
        segments.push({ pos: topPos, size: topSize });
    }

    return (
        <group position={position} rotation={rotation} >
            {
                segments.map((seg, i) => (
                    <mesh key={i} position={seg.pos as [number, number, number]} receiveShadow >
                        <boxGeometry args={seg.size as [number, number, number]} />
                        <meshStandardMaterial color="#fbf9f9ff" roughness={0.9} />
                    </mesh>
                ))
            }
        </group>
    );

};