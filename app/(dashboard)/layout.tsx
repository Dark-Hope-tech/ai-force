import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { getApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';
const DashboardPage = async ({children}:{children: React.ReactNode}) => {
    const apiLimit = await getApiLimit();
    const isPro = await checkSubscription();
    return ( 
        <div className="h-full relative">
            <div className="hidden h-full md:w-72 md:flex md:flex-col  md:fixed md:inset-y-0 bg-gray-900">
                <Sidebar isPro={isPro} apiLimit ={apiLimit}/>
            </div>
            <main className="md:pl-72">
                <Navbar/>
                {children}
            </main>
        </div>
    );
}
 
export default DashboardPage;