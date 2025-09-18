"use server"
import { getUserToken } from '@/lib/server-utils';
import { addressFormSchema, addressFormStateType } from '@/schema/address.schema';
export async function handlePayment(
    formState: addressFormStateType | undefined,
    formData: FormData,
): Promise<addressFormStateType> {
    const shippingAddress = {
        details: formData.get("details"),
        phone: formData.get("phone"),
        city: formData.get("city"),
    };
    const cartId = formData.get("cartId");
    const paymentMethod = formData.get("paymentMethod");
    
    const parseData = addressFormSchema.safeParse({...shippingAddress, cartId, paymentMethod});
  if(!parseData.success){
        return {
            success: false,
            error: parseData.error?.flatten().fieldErrors,
            message: null,
            callbackUrl: "/cart",

        };
    }  
try {
    const token = await getUserToken();

    const endpoint = paymentMethod === "cash"? `api/v1/orders/${cartId}` 
    : `api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`,
        {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                token: token as string,
            },
            body:JSON.stringify(shippingAddress),
        }
    );
    const data = await res.json();

        if(!res.ok){
            return {
                success: false,
                error: {},
                message: data.message || "Faild to place order",
                callbackUrl: "/cart",
            }
        }
        return {
            success: true,
            error: {},
            message: data.message || "Order placed successfuly",
            callbackUrl: paymentMethod === "cash"? "/allorders" : data.session.url ,
            }
    
} catch (error) {
      return {
                success: false,
                error: {},
                message: error as string || "Faild to place order",

            }
    
}

}
export async function getOrders() {
       try {
        
                const token = await getUserToken();
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders`,
            {
    headers: {
      "Content-Type": "application/json",
      token: token as string, 
    },
    cache: "no-cache"
  }
        )
        
        if (!response.ok) 
            throw new Error(response.statusText || "Failed to fetch orders");
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error);
        return { error: error as string }
    }


}
export async function getOrderDetails(id: string) {
    try {

        const token = await getUserToken();

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/${id}`,
           {
    headers: {
      "Content-Type": "application/json",
      token: token as string, 
    },
    cache: "no-cache"
  }
        );
        
        if (!response.ok) 
            throw new Error(response.statusText || "Failed to fetch orders");
        const result = await response.json();
        return result
    }catch (error) {
    console.error("Error fetching order details:");
    return null;
}
}