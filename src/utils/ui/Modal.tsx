import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FC, ReactNode } from "react";

interface ModalProps {
    title: string;
    isOpen: boolean;
    children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ title, isOpen, children }) => {
    return (
        <>
            <Dialog
                open={isOpen}
                as="div"
                className="relative z-10 focus:outline-none"
                onClose={() => {}}
            >
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-sm">
                    <div className="flex items-center justify-center min-h-full p-4 bg-neutral/20">
                        <DialogPanel
                            transition
                            className="p-8 bg-white border shadow-md sm:w-3/5 border-accent/10 glass"
                        >
                            <DialogTitle
                                as="h3"
                                className="text-xl font-medium text-center drop-shadow-md"
                            >
                                {title}
                            </DialogTitle>
                            <div className="divider"></div>
                            <div>{children}</div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
};
