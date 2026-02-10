import ArtPiece from "./ArtPiece";
import { ArtItem } from "./types";

interface GalleryWallProps {
    artData: ArtItem[];
    onArtSelect: (data: { title: string; description: string; url: string }) => void;
    position: [number, number, number];
    rotation: [number, number, number];
}

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
                        details={item.details}
                        onSelect={onArtSelect}
                    />
                );
            })}
        </group>
    );
}
