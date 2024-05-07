"use client";
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';    
import Heading from '@/components/heading'
import { MusicIcon, UndoIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {Form, FormControl, FormField, FormItem} from '@/components/ui/form';
import { formSchema } from './constants';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState,useEffect } from 'react';
import axios from "axios"
import { Empty } from '@/components/empty';
import Loader from '@/components/loader';
import { useProModal } from '@/hooks/use-pro-modal';
const MusicPage = () => {
    const proModal = useProModal();
    const router =  useRouter();
    const [music, setMusic] = useState<string>();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }   
    }); 

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try{
            setMusic(undefined);
            const response = await axios.post("/api/music",data);
            setMusic(response.data.audio);
            form.reset();
        }
        catch(err:any){
            if(err?.response?.status == 403)
                proModal.onOpen();
        }
        finally{
            router.refresh();
        }
    }
    return (
        <div>
            <Heading
                title="Meow Music Company"
                description="Meow Meow Meow Meow Meeeeeooooowwww"
                icon={MusicIcon}
                iconColor="text-yellow-500"
                bgColor="bg-yellow-500/10"
            />
            <div className='px-4 lg:px-8'>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                            <FormField
                                name="prompt"
                                render={({field}) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className='m-0 p-0'>
                                            <Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent' disabled={isLoading} placeholder="Me Me Meowwwwwww ..... Me Meeeee Meow" {...field}/>
                                        </FormControl>
                                    </FormItem> 
                                )}
                            />
                            <Button className='col-span-12 lg:col-span-2 w-full' disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className='space-y-4 mt-4'>
                    {isLoading && (
                        <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
                            <Loader/>
                        </div>
                    )}
                    {!music && !isLoading && (
                        <Empty
                            emptyImageUrl="/orange-cat-singing.png"
                            label='Meow Meow Meow Meow Meeeeeooooowwww'
                            className='relative h-72 w-64'
                        />
                    )}
                    {music && (
                        <audio controls className='w-full mt-8'>
                            <source src={music}/>
                        </audio>
                    )}
                </div>
            </div>
        </div>
    );
}
 
export default MusicPage;