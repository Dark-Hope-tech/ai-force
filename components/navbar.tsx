import {Button} from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { Ghost, Menu, User } from 'lucide-react';
import MobileSidebar from './mobile-sidebar';
import { getApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';
const Navbar = async() => {
    const apiLimitCount = await getApiLimit();
    const isPro = await checkSubscription();
    return (
        <div className="flex items-center p-4">
            <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount}/>
            <div className='flex w-full justify-end'>
                <UserButton afterSignOutUrl="/sign-in"/>
            </div>
        </div>
    );
}
 
export default Navbar;