"use client";

import {Kbd} from "@nextui-org/kbd";
import {Button} from "@nextui-org/button";
import {Modal, ModalContent, ModalHeader, ModalBody} from "@nextui-org/modal";
import {useDisclosure} from "@nextui-org/use-disclosure";
import {MdOutlineKeyboardCommandKey} from "react-icons/md";

export const ShortcutsModal = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <Button
                onPress={onOpen}
                variant="light"
                isIconOnly
            >
                <MdOutlineKeyboardCommandKey size={24}/>
            </Button>
            <Modal
                backdrop="blur"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                radius="lg"
                classNames={{
                    body: "py-6",
                    backdrop: "bg-[#1A202C]/80 backdrop-opacity-100",
                    base: "border-[#2D3748] bg-[#2D3748] dark:bg-[#1A202C] text-[#ECEFF4]",
                    header: "border-b-[1px] border-[#2D3748] bg-[#2D3748] dark:bg-[#1A202C] text-[#ECEFF4]",
                    closeButton: "hover:bg-[#2D3748] hover:text-[#ECEFF4] active:bg-[#1A202C] active:text-[#CBD5E0]",
                }}
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex justify-center items-center">Shortcuts</ModalHeader>
                        <ModalBody className="flex flex-col items-center">
                            <div className="flex w-full justify-between items-center mb-2">
                                <Kbd keys={["up", "down"]}>Up/Down</Kbd>
                                <span>Increase/Decrease player volume</span>
                            </div>
                            <div className="flex w-full justify-between items-center mb-2">
                                <Kbd keys={["space"]}>Spacer</Kbd>
                                <span>Pause/Play Music</span>
                            </div>
                            <div className="flex w-full justify-between items-center mb-2">
                                <Kbd>F</Kbd>
                                <span>Enter Full Screen</span>
                            </div>
                        </ModalBody>
                    </>
                </ModalContent>
            </Modal>
        </>
    );
}
