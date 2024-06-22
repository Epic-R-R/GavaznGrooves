"use client";

import {useState} from 'react';
import {Button} from "@nextui-org/button";
import {backgrounds} from "@/config/backgrounds";
import {Image} from "@nextui-org/react";

export default function BackgroundChanger() {
    const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

    const toggleBackground = () => {
        setCurrentBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    };

    return (
        <div>
            <Button
                isIconOnly
                variant="light"
                onClick={toggleBackground}
            >
                <Image
                    src="refresh.svg"
                    alt="Refresh icon"
                    height={26}
                    width={26}
                />
            </Button>
            <style jsx global>{`
                body {
                    background-image: url(${backgrounds[currentBackgroundIndex].url});
                }
            `}</style>
        </div>
    );
}
