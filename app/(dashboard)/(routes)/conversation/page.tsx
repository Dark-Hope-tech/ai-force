"use client";
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';    
import Heading from '@/components/heading'
import Head from 'next/head';
import { MessageSquare } from 'lucide-react';
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
import { cn } from '@/lib/utils';
import { UserAvtar } from '@/components/user-avtar';
import { OrangeCatAvtar } from '@/components/orange-cat-avtar';
import { useProModal } from '@/hooks/use-pro-modal';
const ConversationPage = () => {
    const proModal = useProModal();
    const router =  useRouter();
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }   
    }); 

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try{
            const userMessage = {
                "role":"user",
                "content":data.prompt
            }
            
            const newMessages = [...messages, userMessage];
            const response = await axios.post("/api/conversation",{
                messages: newMessages
            });
            const orangeCatMessage = {
                "role":response.data.message.role,
                "content":response.data.message.content
            }
            const updatedMessages = [...newMessages, orangeCatMessage];
            console.log("Updated Messages: ", updatedMessages);
            setMessages(updatedMessages);
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
                title="Conversation"
                description="Bringing the Force of our Most advance Conversation Model"
                icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
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
                                            <Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent' disabled={isLoading} placeholder="What do you want to ask with our Orange Cat ..BILLOUTA" {...field}/>
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
                    {messages.length==0 && !isLoading && (
                        <div>
                            <Empty
                                emptyImageUrl="/cat_with_specs.png"
                                label='No Conversation started with Cute CAT'
                                className='relative h-96 w-96'
                            />
                        </div>
                    )}
                    <div className='flex flex-col gap-y-4'>
                        {
                            messages.map((message)=>(
                                <div key={message.content} className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg", message.role === "user"? "bg-white border border-black/10" :"bg-muted")}>
                                    {message.role === "user"?<UserAvtar/>:<OrangeCatAvtar/>}
                                    <p className={cn("text-sm",message.role==="user"?" font-sans font-semibold":"font-mono")}>
                                        {message.content}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ConversationPage;