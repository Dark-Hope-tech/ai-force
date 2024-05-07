"use client";
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';    
import Heading from '@/components/heading'
import Image from "next/image";
import Head from 'next/head';
import { Download, ImageIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {Form, FormControl, FormField, FormItem} from '@/components/ui/form';
import { ImageAmountOptions, ImageResolutionOptions, formSchema } from './constants';
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
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';
import { Card, CardFooter } from '@/components/ui/card';
import { useProModal } from '@/hooks/use-pro-modal';
const ImagePage = () => {
    const router =  useRouter();
    const proModal = useProModal();
    const [images,setImages] = useState<string[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512",
        }   
    }); 

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try{
            setImages([]);
            const response = await axios.post("/api/image",data);
            console.log(response.data);
            const urls = response.data.map((image:{url:string})=>image.url);
            setImages(urls);
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
                title="Image Generation"
                description="Describe me your LOVE! I will draw it for you"
                icon={ImageIcon}
                iconColor="text-pink-700"
                bgColor="bg-pink-700/10"
            />
            <div className='px-4 lg:px-8'>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                            <FormField
                                name="prompt"
                                render={({field}) => (
                                    <FormItem className="col-span-12 lg:col-span-6">
                                        <FormControl className='m-0 p-0'>
                                            <Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent' disabled={isLoading} placeholder="What women is of your type?" {...field}/>
                                        </FormControl>
                                    </FormItem> 
                                )}
                            />
                            <FormField
                                name="amount"
                                control={form.control}
                                render={({field}) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value}/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {ImageAmountOptions.map((option)=>(
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem> 
                                )}
                            />
                            <FormField
                                name="resolution"
                                control={form.control}
                                render={({field}) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value}/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {ImageResolutionOptions.map((option)=>(
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
                        <div className='p-20'>
                            <Loader/>
                        </div>
                    )}
                    {images.length==0 && !isLoading && (
                        <div>
                            <Empty
                                emptyImageUrl="/orange-cat-drawing.png"
                                label='Orange Cat is waiting for your Description'
                                className='relative h-96 w-96'
                            />
                        </div>
                    )}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8'>
                        {
                            images.map((src)=>(
                                <Card key={src} className='rounded-lg overflow-hidden'>
                                    <div className='relative aspect-square'>
                                        <Image
                                            fill
                                            alt='IMAGE'
                                            src={src}
                                        />
                                    </div>
                                    <CardFooter className='p-2'>
                                        <Button className='w-full' variant="secondary" onClick={()=>window.open(src)}>
                                            <Download className='h-4 w-4 mr-2'/>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ImagePage;