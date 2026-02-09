"use client";

import { useLoader, ThreeElements } from "@react-three/fiber";
import { TDSLoader } from "three/examples/jsm/loaders/TDSLoader.js";
import { Suspense } from "react";

export default function ArcadeModel(props: ThreeElements['group']) {
    const model = useLoader(TDSLoader, "/arcade machine model/elevatoraction.3ds", (loader) => {
        loader.setResourcePath("/arcade machine model/");
    });

    // TDSLoader returns a Group, so we can just primitive it
    return (
        <Suspense fallback={null}>
            <primitive object={model} {...props} />
        </Suspense>
    );
}
