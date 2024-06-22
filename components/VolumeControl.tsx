import React, {useState} from "react";
import {Slider} from "@nextui-org/react";
import {VolumeHighIcon, VolumeLowIcon} from "@/components/icons";

interface VolumeControlProps {
    setVolume: (volume: number) => void;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({setVolume}) => {
    const [volume, setVolumeState] = useState<number>(100);
    const [, setIsMuted] = useState<boolean>(false);
    const [prevVolume, setPrevVolume] = useState<number>(100);

    const handleVolumeChange = (value: number | number[]) => {
        const newVolume = Array.isArray(value) ? value[0] : value;
        setVolumeState(newVolume);
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
        if (newVolume !== 0) {
            setPrevVolume(newVolume);
        }
    };

    const toggleMute = () => {
        setIsMuted((prevIsMuted) => {
            const newVolume = prevIsMuted ? prevVolume : 0;
            setVolumeState(newVolume);
            setVolume(newVolume);
            if (!prevIsMuted) {
                setPrevVolume(volume);
            }
            return !prevIsMuted;
        });
    };

    return (
        <div className="flex flex-col w-full h-full items-center justify-center">
            <Slider
                aria-label="Volume"
                size="sm"
                color="foreground"
                value={volume}
                onChange={handleVolumeChange}
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
