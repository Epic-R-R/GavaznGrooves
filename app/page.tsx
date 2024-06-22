"use client";

import {MusicPlayer} from "@/components/music-player";
import React from "react";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center h-full">
            <MusicPlayer/>
        </main>
    );
}
