"use client";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "./ui/badge";

export const ProModal = () => {
    const proModal  = useProModal();
    return (  
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4">
                        <div className="flex items-center gap-x-2 font-bold py-1">
                            Bribe Now To
                            <Badge className="uppercase text-sm py-1" variant="premium">
                                Orange Cat
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">

                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}