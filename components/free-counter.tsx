"use client";

import {useEffect, useState } from "react";
import {Card, CardContent} from "@/components/ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";
import axios from "axios";
interface FreeCounterProps {
    apiLimit: number;
    isPro: boolean;
}
const FreeCounter = ({apiLimit = 0, isPro =false}: FreeCounterProps) => {
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        setMounted(true);
    },[]);
    if(!mounted) return null;
    if(isPro) return null;
    
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
        <div className="px-3">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-6">
                    <div className="text-center text-white text-sm mb-4 space-y-2">
                        <p>
                            {MAX_FREE_COUNTS - apiLimit}/{MAX_FREE_COUNTS} Wishes left!
                        </p>
                        <Progress value={(apiLimit/MAX_FREE_COUNTS) * 100} className="h-3"/>
                    </div>
                    <Button className="w-full" variant="premium" onClick={onSubscribe}>
                        Bribe Orange CAT
                        <Zap className="w-4 h-4 ml-2 fill-white"/>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
 
export default FreeCounter;
