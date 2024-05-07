"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "./ui/badge";
import { Check, Code, ImageIcon, MessageSquare, Music, VideoIcon, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
const tools = [
    {
      label: "Conversation",
      icon : MessageSquare,
      color:"text-violet-500",
      bgColor:"bg-violet-500/10",
    },
    {
      label: "Music Generation",
      icon : Music,
      color:"text-orange-500",
      bgColor:"bg-orange-500/10",
    },
    {
      label: "Image Generation",
      icon : ImageIcon,
      color:"text-green-500",
      bgColor:"bg-green-500/10",
    },
    {
      label: "Video Generation",
      icon : VideoIcon,
      color:"text-pink-500",
      bgColor:"bg-pink-500/10",
    },
    {
      label: "Code Generation",
      icon : Code,
      color:"text-yellow-500",
      bgColor:"bg-yellow-500/10",
    }
];
export const ProModal = () => {
    const proModal  = useProModal();
    const [leoading, setLoading] = useState(false);
    const onSubscribe = async() => {
        try{
            setLoading(true);
            const response = await axios.get("/api/stripe");
            window.location.href = (await response).data.url;
        }catch(err){
            console.error(err,"STRIPE CLIENT ERROR");
        } finally{
            setLoading(false);
        }
    }
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
                        {tools.map((tool)=>(
                            <Card key={tool.label} className="p-3 border-black/5 flex items-center justify-between">
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                        <tool.icon className={cn("w-6 h-6", tool.color)}/>
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {tool.label}
                                    </div>
                                </div>
                                <Check className="text-primary w-5 h-5"/>
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button disabled={leoading} size="lg" variant="premium" className="w-full" onClick={onSubscribe}>
                        Upgrade
                        <Zap className="w-4 h-5 ml-2 fill-white"/>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}