"use client";

import { useEffect, useState } from "react";
import {Card, CardContent} from "@/components/ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
interface FreeCounterProps {
    apiLimit: number;
}
const FreeCounter = ({apiLimit = 0}: FreeCounterProps) => {
    const [mounted, setMounted] = useState(false);
    useEffect(()=>{
        setMounted(true);
    },[]);
    if(!mounted) return null;
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
                    <Button className="w-full" variant="premium">
                        Bribe Orange CAT
                        <Zap className="w-4 h-4 ml-2 fill-white"/>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
 
export default FreeCounter;