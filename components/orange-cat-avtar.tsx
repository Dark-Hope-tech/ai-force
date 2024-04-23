import { AvatarImage } from "@radix-ui/react-avatar";
import {Avatar} from "./ui/avatar";

export const OrangeCatAvtar = () => {
    return (  
        <Avatar className="h-20 w-20">
            <AvatarImage className="p-1" src="/orangecat.png"/>
        </Avatar>
    );
}
