"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Shard({ position, color, size }: { position: [number, number, number], color: string, size: number }) {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        meshRef.current.rotation.x = Math.sin(t / 4) / 4;
        meshRef.current.rotation.y = Math.cos(t / 2) / 4;
        meshRef.current.position.y += Math.sin(t + position[0]) / 1000;
    });

    return (
        <mesh ref={meshRef} position={position}>
            <octahedronGeometry args={[size, 0]} />
            <meshStandardMaterial
                color={color}
                transparent
                opacity={0.4}
                roughness={0.1}
                metalness={0.9}
            />
        </mesh>
    );
}

export default function ThreeBackground() {
    const shards = useMemo(() => {
        return Array.from({ length: 8 }).map(() => ({
            position: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 5] as [number, number, number],
            color: Math.random() > 0.5 ? "#0038A8" : "#A48072",
            size: Math.random() * 0.8 + 0.2,
        }));
    }, []);

    return (
        <div className="absolute inset-0 z-[-1] pointer-events-none opacity-40">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                {shards.map((shard, i) => (
                    <Shard key={i} {...shard} />
                ))}
            </Canvas>
        </div>
    );
}
