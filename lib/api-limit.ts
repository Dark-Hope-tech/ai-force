import {auth } from '@clerk/nextjs';
import prisma from './prismadb';
import { MAX_FREE_COUNTS } from '@/constants';

export const increaseApiLimit = async () => {
    const {userId}  = auth();
    if(!userId) return;
    const userApilimit = await prisma?.userApiLimit.findUnique({
        where: {
            userId
        }
    });
    if(userApilimit){
        await prisma?.userApiLimit.update({
            where: {userId :userId},
            data:{count : userApilimit.count + 1}
        })
    } else{
        await prisma?.userApiLimit.create({
            data:{
                userId,
                count: 1
            }
        });
    }
}

export const checkApiLimit = async ()=>{
    const {userId}  = auth();
    if(!userId) return;
    const userApilimit = await prisma?.userApiLimit.findUnique({
        where: {
            userId
        }
    });
    if(!userApilimit || userApilimit.count < MAX_FREE_COUNTS) return true; 
    return false;
}

export const getApiLimit = async ()=>{
    const {userId} = auth();
    if(!userId) return 0;
    const userApiLimit  = await prisma?.userApiLimit.findUnique({
        where: {
            userId
        }
    });
    if(!userApiLimit) return 0;
    return userApiLimit.count;
}