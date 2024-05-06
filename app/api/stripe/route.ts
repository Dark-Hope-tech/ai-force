import {auth , currentUser} from "@clerk/nextjs"
import { NextResponse} from "next/server"
import prismadb from "@/lib/prismadb"
import {stripe} from "@/lib/stripe"
import { absoluteUrl } from "@/lib/utils"

const settingUrl = absoluteUrl("/settings");
export async function GET(){
    try{
        const {userId} = auth();
        const user = await currentUser();
        if(!user || !userId)
            return new NextResponse("Unauthorized",{status: 401});
        const userSubscription = await prismadb.userSubscription.findUnique({
            where: {
                userId,
            }
        });
        if(userSubscription && userSubscription.stripeCustomerId){
            const stripeSession =  await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingUrl,
            });
            console.log(stripeSession);
            return new NextResponse(JSON.stringify({url: stripeSession.url}));
        }
        const stripeSession =  await stripe.checkout.sessions.create({
            success_url: settingUrl,
            cancel_url: settingUrl,
            payment_method_types: ['card'],
            mode: 'subscription',
            billing_address_collection: 'required',
            shipping_address_collection: {
                allowed_countries: ['IN'],
            },
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data:{
                        currency: "INR",
                        product_data:{
                            name: "Premium Subscription",
                            description: "Unlock all the premium features",
                        },
                        unit_amount: 20000,
                        recurring:{
                            interval: "month",
                        },
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                userId
            }
        });
        return new NextResponse(JSON.stringify({url: stripeSession.url}));
    }
    catch(err){
        console.error("[STRIPE] [GET] Error: ", err);
        return new NextResponse("Internal Error ",{status: 500});
    }
}