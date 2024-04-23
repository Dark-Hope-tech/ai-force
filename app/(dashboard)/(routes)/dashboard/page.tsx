"use client";
import { Button } from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { deflate } from "zlib";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { ArrowRight, Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Conversation",
    icon : MessageSquare,
    color:"text-violet-500",
    bgColor:"bg-violet-500/10",
    href:"/conversation"
  },
  {
    label: "Music Generation",
    icon : Music,
    color:"text-orange-500",
    bgColor:"bg-orange-500/10",
    href:"/music"
  },
  {
    label: "Image Generation",
    icon : ImageIcon,
    color:"text-green-500",
    bgColor:"bg-green-500/10",
    href:"/image"
  },
  {
    label: "Video Generation",
    icon : VideoIcon,
    color:"text-pink-500",
    bgColor:"bg-pink-500/10",
    href:"/video"
  },
  {
    label: "Code Generation",
    icon : Code,
    color:"text-yellow-500",
    bgColor:"bg-yellow-500/10",
    href:"/code"
  },

]
const montserrat = Montserrat({ weight:"600",subsets: ["latin"] });
const DashboardPage =() => {
  const router = useRouter();
  return (
    <div>
	    <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the Power of 
        </h2>
        <h1 className={cn("text-4xl text-purple-500",montserrat.className && "text-center font-bold")}>AI Force</h1>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {
          tools.map((tool) => (
            <Card onClick={()=> router.push(tool.href)} key={tool.href} className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer">
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md",tool.bgColor)}>
                  <tool.icon className={cn("w-8 h-8",tool.color)} />
                </div>
                <div>
                  {tool.label}
                </div>
              </div>
              <ArrowRight/>
            </Card>
          ))
        }
      </div>
    </div>
  );
}

export default DashboardPage;
