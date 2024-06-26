import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import Replicate from "replicate";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY
});

export async function POST(req : Request){
    try{
        const userId = auth();
        const body = await req.json();
        const {prompt} = body;

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }
        

        if(!prompt){
            return new NextResponse("Messages is required", {status: 400});
        }
       
        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();
        if(!freeTrial && !isPro)
            return new NextResponse("API Limit Exceeded", {status: 403});

        const output = await replicate.run(
            "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
            {
              input: {
                prompt_a: prompt,
              }
            }
        );
        if(!isPro)
            await increaseApiLimit();
        return NextResponse.json(output);
    }
    catch (err){
        console.log("[MUSIC API ERROR ]: ", err);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}