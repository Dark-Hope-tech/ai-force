import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export async function POST(req : Request){
    try{
        const userId = auth();
        const body = await req.json();
        const messages = body;

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }
        if(!openai.apiKey){
            return new NextResponse("OpenAI API Key is not set", {status: 500});
        }

        if(!messages){
            return new NextResponse("Messages is required", {status: 400});
        }
        const completion = await openai.chat.completions.create({
            messages: messages.messages,
            model: "gpt-3.5-turbo",
        });
        return NextResponse.json(completion.choices[0]);
    }
    catch (err){
        console.log("Conversation API Error: ", err);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}