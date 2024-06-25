"use client";

import React, {FC, useEffect, useState} from "react";
import {Card, CardBody, Button, Image, CardProps, Tab, Tabs} from "@nextui-org/react";
import {
    PauseCircleIcon,
    NextIcon,
    PreviousIcon,
    ShuffleIcon,
    PlayCircleIcon
} from "@/components/icons";
import {IoLogoGithub} from "react-icons/io";
import {Category, Station} from "@/types";
import {VolumeControl} from "@/components/VolumeControl";
import {MadeWith} from "@/components/made-with";
import BackgroundChanger from "@/components/changebackground";
import {CardFooter} from "@nextui-org/card";
import {stations} from "@/config/stations";
import {Link} from "@nextui-org/link";
import {siteConfig} from "@/config/site";
import {ThemeSwitch} from "@/components/switch-theme";
import {ShortcutsModal} from "@/components/shortcuts-modal";
import Hotkeys from "react-hot-keys";
import {FaSquareXTwitter} from "react-icons/fa6";

interface MusicPlayerProps extends CardProps {
}

export const MusicPlayer: FC<MusicPlayerProps> = ({className, ...otherProps}) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [currentStation, setCurrentStation] = useState<Station | null>(null);
    const [, setSelectedCategoryName] = useState<string>("");
    const [player, setPlayer] = useState<any>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("lofi");
    const [selectedStation, setSelectedStation] = useState<string>("lofi");
    const [volume, setVolumes] = useState<number>(100);
    const tweetText = encodeURIComponent(siteConfig.text);
    const tweetUrl = encodeURIComponent(siteConfig.url);
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`;
    useEffect(() => {
        setCategories(stations);
        if (stations.length > 0) {
            setSelectedCategoryName(stations[0].name);
            if (stations[0].stations.length > 0) {
                setCurrentStation(stations[0].stations[0]);
                setIsPlaying(true);
            }
        }
    }, []);

    useEffect(() => {
        const lastStation = JSON.parse(localStorage.getItem("lastStation") || "null");
        if (lastStation) {
            setCurrentStation(lastStation);
            setIsPlaying(true);
        }
    }, []);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        document.body.appendChild(script);

        window.onYouTubeIframeAPIReady = () => {
            new window.YT.Player("player", {
                height: "0",
                width: "0",
                videoId: currentStation?.videoId,
                playerVars: {
                    autoplay: isPlaying ? 1 : 0,
                },
                events: {
                    onReady: (event: any) => {
                        setPlayer(event.target);
                    },
                },
            });
        };
    }, [currentStation?.videoId, isPlaying]);

    useEffect(() => {
        if (player) {
            player.loadVideoById(currentStation?.videoId);
        }
    }, [player, currentStation]);

    useEffect(() => {
        if (player && isPlaying) {
            player.playVideo();
        } else if (player && !isPlaying) {
            player.pauseVideo();
        }
    }, [player, isPlaying]);

    const onTogglePlay = () => {
        setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    };

    const setVolume = (volume: number) => {
        if (player) {
            player.setVolume(volume);
        }
    };

    const adjustVolume = (newVolume: number) => {
        const clampedVolume = Math.max(0, Math.min(100, newVolume));
        setVolume(clampedVolume);
        setVolumes(clampedVolume);
        if (player) {
            player.setVolume(clampedVolume);
        }
    };

    const handleSelectionCategory = (option: any) => {
        setSelectedCategory(option);
        const selectedCategory = categories.find(category => category.name === option);
        if (selectedCategory && selectedCategory.stations.length > 0) {
            setCurrentStation(selectedCategory.stations[0]);
            setIsPlaying(true);
        }
    };

    const handleSelectionChangeStation = (option: any) => {
        setSelectedStation(option);
        const selectedStation = categories
            .find(category => category.name === selectedCategory)
            ?.stations.find(station => station.name === option);
        if (selectedStation) {
            setCurrentStation(selectedStation);
            setIsPlaying(true);
        }
    };

    const goToNextStation = () => {
        const currentCategory = categories.find(category => category.name === selectedCategory);
        if (!currentCategory) return;

        const currentIndex = currentCategory.stations.findIndex(station => station.name === selectedStation);
        const nextIndex = (currentIndex + 1) % currentCategory.stations.length;
        setSelectedStation(currentCategory.stations[nextIndex].name);
        setCurrentStation(currentCategory.stations[nextIndex]);
        setIsPlaying(true);
    };

    const goToPreviousStation = () => {
        const currentCategory = categories.find(category => category.name === selectedCategory);
        if (!currentCategory) return;

        const currentIndex = currentCategory.stations.findIndex(station => station.name === selectedStation);
        const previousIndex = (currentIndex - 1 + currentCategory.stations.length) % currentCategory.stations.length;
        setSelectedStation(currentCategory.stations[previousIndex].name);
        setCurrentStation(currentCategory.stations[previousIndex]);
        setIsPlaying(true);
    };

    const handleShuffle = () => {
        let randomCategory, randomStation;

        do {
            randomCategory = categories[Math.floor(Math.random() * categories.length)];
            randomStation = randomCategory.stations[Math.floor(Math.random() * randomCategory.stations.length)];
        } while (randomCategory.name === selectedCategory && randomStation.name === selectedStation);

        setSelectedCategory(randomCategory.name);
        setCurrentStation(randomStation);
        setSelectedStation(randomStation.name);
        setIsPlaying(true);
    };

    const handleHotkey = (keyName: string, e: KeyboardEvent) => {
        e.preventDefault();
        switch (keyName) {
            case 'f':
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                } else {
                    document.exitFullscreen();
                }
                break;
            case 'space':
                onTogglePlay();
                break;
            case 'up':
                adjustVolume(volume + 5);
                break;
            case 'down':
                adjustVolume(volume - 5);
                break;
        }
    };

    return (
        <Hotkeys
            keyName="f,space,up,down"
            onKeyDown={handleHotkey}
            filter={(event) => {
                const target = event.target as HTMLElement;
                return !['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
            }}
        >

            <Card
                isBlurred
                className="max-w-[900px]"
                shadow="md"
                {...otherProps}
            >
                {currentStation ? (
                    <>
                        <CardBody>
                            <div className="audio-player">
                                <div id="player"></div>
                            </div>
                            <div
                                className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                                <div className="relative col-span-6 md:col-span-4">
                                    <Image
                                        alt="Album cover"
                                        className="object-fill"
                                        height={300}
                                        shadow="md"
                                        src={currentStation.picture}
                                        width="100%"
                                        isZoomed
                                    />
                                </div>

                                <div className="flex flex-col col-span-6 md:col-span-8">
                                    <div className="flex justify-between items-start gap-3">
                                        <div className="flex flex-col gap-1 overflow-x-auto">
                                            <Tabs
                                                aria-label="Categories"
                                                selectedKey={selectedCategory}
                                                color="warning"
                                                onSelectionChange={handleSelectionCategory}
                                            >
                                                {categories.map((category) => (
                                                    <Tab key={category.name} title={category.name}/>
                                                ))}
                                            </Tabs>
                                        </div>
                                        <div className="flex justify-start items-center gap-1">
                                            <Image
                                                src="logo.svg"
                                                alt="Logo image"
                                                width={50}
                                                height={50}
                                            />
                                            <p className="font-bold text-inherit">Gavazn Grooves</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col mt-4 gap-2">
                                        <Tabs
                                            aria-label="Stations"
                                            selectedKey={selectedStation}
                                            color="success"
                                            onSelectionChange={handleSelectionChangeStation}
                                        >
                                            {categories
                                                .find(category => category.name === selectedCategory)
                                                ?.stations.map(station => (
                                                    <Tab key={station.name} title={station.name}/>
                                                ))}
                                        </Tabs>
                                    </div>

                                    <div className="flex flex-col mt-3 gap-1">
                                        <VolumeControl volume={volume} setVolume={adjustVolume}/>
                                    </div>
                                    <div className="flex w-full items-center justify-center space-x-4 mt-4">
                                        <Button
                                            isIconOnly
                                            className="w-auto h-auto data-[hover]:bg-foreground/10"
                                            radius="full"
                                            variant="light"
                                            onClick={goToPreviousStation}
                                        >
                                            <PreviousIcon/>
                                        </Button>
                                        <Button
                                            isIconOnly
                                            className="w-auto h-auto data-[hover]:bg-foreground/10"
                                            radius="full"
                                            variant="light"
                                            onClick={onTogglePlay}
                                        >
                                            {isPlaying ? (
                                                <PauseCircleIcon size={54}/>
                                            ) : (
                                                <PlayCircleIcon size={54}/>
                                            )}
                                        </Button>
                                        <Button
                                            isIconOnly
                                            className="data-[hover]:bg-foreground/10"
                                            radius="full"
                                            variant="light"
                                            onClick={goToNextStation}
                                        >
                                            <NextIcon/>
                                        </Button>
                                        <Button
                                            isIconOnly
                                            className="data-[hover]:bg-foreground/10"
                                            radius="full"
                                            variant="light"
                                            onClick={handleShuffle}
                                        >
                                            <ShuffleIcon/>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                        </CardBody>
                        <CardFooter
                            className="flex flex-col md:flex-row md:justify-between justify-center items-center">
                            <div className="w-full md:w-auto">
                                <MadeWith/>
                            </div>
                            <div className="flex flex-row">
                                <Link isBlock isExternal color="foreground" aria-label="Twitter"
                                      href={twitterShareUrl}>
                                    <FaSquareXTwitter size={24}/>
                                </Link>
                                <Link isBlock isExternal color="foreground" aria-label="Github"
                                      href={siteConfig.links.github}>
                                    <IoLogoGithub size={24}/>
                                </Link>
                                <Button
                                    isIconOnly
                                    variant="light"
                                >
                                    <ThemeSwitch/>
                                </Button>
                                <ShortcutsModal/>
                                <BackgroundChanger/>
                            </div>
                        </CardFooter>
                    </>
                ) : (
                    <CardBody>
                        <div>Loading stations...</div>
                    </CardBody>
                )}
            </Card>
        </Hotkeys>
    );
};
