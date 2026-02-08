import { Group } from "three";
import ArtPiece from "./ArtPiece";
import { ArtItem } from "./types";

interface GalleryWallProps {
    artData: ArtItem[];
    onArtSelect: (data: { title: string; description: string; url: string }) => void;
    position: [number, number, number];
    rotation: [number, number, number];
}

const ART_DATA = [
    { title: "Neon Dreams", description: "Synthetic life in a digital metropolis.", url: "/images/art1.png" },
    { title: "Abstract Thought", description: "Patterns of human cognition.", url: "/images/art2.png" },
    { title: "Peloton", description: "AI awareness emerging.", url: "/images/art3.png" },
    { title: "Memora Health", description: "Traversing dimensions.", url: "/images/art4.png" },
    { title: "Healthymind", description: "Golden geometry.", url: "/images/art5.png" },
    { title: "Google", description: "Speed captured.", url: "/images/art6.png" },
    { title: "Geometric Harmony", description: "Bold shapes and colors.", url: "/images/gw_1.png" },
    { title: "Floating Islands", description: "Surreal synthwave landscape.", url: "/images/gw_2.png" },
    { title: "Chaos", description: "Expressionist energy.", url: "/images/gw_3.png" },
    { title: "Glitch City", description: "Cyberpunk distortion.", url: "/images/gw_4.png" },
    { title: "Fluid Dreams", description: "Ethereal smoke patterns.", url: "/images/gw_5.png" },
];

const LAYOUT = [
    // Center cluster
    { pos: [0, 0, 0], scale: [5, 5], artIndex: 6 },
    { pos: [-4, 2, 0], scale: [2.5, 2.5], artIndex: 7 },
    { pos: [4, 2, 0], scale: [2.5, 2.5], artIndex: 8 },
    { pos: [-4, -2, 0], scale: [2.5, 2.5], artIndex: 9 },
    { pos: [4, -2, 0], scale: [2.5, 2.5], artIndex: 10 },

    // Top row
    { pos: [-7, 5, 0], scale: [3, 3], artIndex: 0 },
    { pos: [-3, 5, 0], scale: [2, 2], artIndex: 1 },
    { pos: [3, 5, 0], scale: [2, 2], artIndex: 2 },
    { pos: [7, 5, 0], scale: [3, 3], artIndex: 3 },

    // Bottom row
    { pos: [-7, -5, 0], scale: [3, 3], artIndex: 4 },
    { pos: [-3, -5, 0], scale: [2, 2], artIndex: 5 },
    { pos: [3, -5, 0], scale: [2, 2], artIndex: 0 },
    { pos: [7, -5, 0], scale: [3, 3], artIndex: 1 },

    // Sides
    { pos: [-8, 0, 0], scale: [2, 4], artIndex: 2 },
    { pos: [8, 0, 0], scale: [2, 4], artIndex: 3 },

    // Corners/Fillers
    { pos: [-10, 4, 0], scale: [2, 2], artIndex: 4 },
    { pos: [10, 4, 0], scale: [2, 2], artIndex: 5 },
    { pos: [-10, -4, 0], scale: [2, 2], artIndex: 6 },
    { pos: [10, -4, 0], scale: [2, 2], artIndex: 7 },
    { pos: [0, 6, 0], scale: [3, 1.5], artIndex: 8 },
    { pos: [0, -6, 0], scale: [3, 1.5], artIndex: 9 },
];

export default function GalleryWall({ artData, onArtSelect, position, rotation }: GalleryWallProps) {
    return (
        <group position={position} rotation={rotation}>
            {artData.map((item, i) => {
                return (
                    <ArtPiece
                        key={i}
                        position={item.pos}
                        rotation={[0, 0, 0]}
                        scale={item.scale} // Ensure depth is 1 or passed correctly
                        url={item.url}
                        data={{
                            title: item.title,
                            description: item.description
                        }}
                        onSelect={onArtSelect}
                    />
                );
            })}
        </group>
    );
}
