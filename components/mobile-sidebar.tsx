"use client";
import {Button} from '@/components/ui/button';
import { Sheet,SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Sidebar from './sidebar';
import {useState, useEffect} from 'react';
interface MobileSidebarProps {
    apiLimitCount: number;
    isPro: boolean;
}
const MobileSidebar = ({apiLimitCount =0, isPro =false}: MobileSidebarProps) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if(!isMounted) return null;
    return (  
        <Sheet>
            <SheetTrigger>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu/>  
                </Button>
            </SheetTrigger>
            <SheetContent className='p-0' side="left">
                <Sidebar isPro={isPro} apiLimit={apiLimitCount}/>
            </SheetContent>
        </Sheet>   
    );
}
 
export default MobileSidebar;