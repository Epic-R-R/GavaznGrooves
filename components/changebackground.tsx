"use client";

import {useState} from 'react';
import {Button} from "@nextui-org/button";
import {backgrounds} from "@/config/backgrounds";
import { MdOutlineChangeCircle } from "react-icons/md";

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
                <MdOutlineChangeCircle size={24}/>
            </Button>
            <style jsx global>{`
                body {
                    background-image: url(${backgrounds[currentBackgroundIndex].url});
                }
            `}</style>
        </div>
    );
}
