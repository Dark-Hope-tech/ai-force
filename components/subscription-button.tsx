"use client";

import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";

interface SubscriptionButtonProps {
    isPro: boolean;
};

export const SubscriptionButton = ({isPro}:SubscriptionButtonProps) =>{
    const [loading, setLoading] = useState(false);
    const onClick = async() => {
        try{
            setLoading(true);
            const response = await axios.get("/api/stripe");
            window.location.href = (await response).data.url;
        }catch(err){
            console.error("[Billing Error] :" + err);
        } finally{
            setLoading(false);
        }
    }
    return (
        <Button disabled={loading} variant={isPro?"premium":"default"} onClick={onClick}>
            {isPro? "Manage Subscription" : "Upgrade to Pro"}
            {!isPro && <Zap className='w-4 h-4 ml-2 fill-white'/>}
        </Button>
    )
}