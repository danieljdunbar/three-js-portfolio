export interface ArtItem {
    details: ArtDetails;
    pos: [number, number, number];
    scale: [number, number];
}

export interface ArtDetails {
    title: string;
    description: string;
    url: string;
}

export interface MovementState {
    moveForward: boolean;
    moveBackward: boolean;
    rotateLeft: boolean;
    rotateRight: boolean;
}