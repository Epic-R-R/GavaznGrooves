import React from "react";
import {Slider} from "@nextui-org/react";
import {VolumeHighIcon, VolumeLowIcon} from "@/components/icons";

interface VolumeControlProps {
    volume: number;
    setVolume: (volume: number) => void;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({volume, setVolume}) => {
    const handleVolumeChange = (value: number | number[]) => {
        const newVolume = Array.isArray(value) ? value[0] : value;
        setVolume(newVolume);
    };

    return (
        <div className="flex flex-col w-full h-full items-center justify-center">
            <Slider
                aria-label="Volume"
                size="sm"
                color="foreground"
                value={volume}
                onChange={handleVolumeChange}
                minValue={0}
                maxValue={100}
                step={1}
                classNames={{
                    track: "bg-default-500/30",
                    thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
                }}
                startContent={
                    <VolumeLowIcon className="text-2xl"/>
                }
                endContent={
                    <VolumeHighIcon className="text-2xl"/>
                }
            />
        </div>
    );
};