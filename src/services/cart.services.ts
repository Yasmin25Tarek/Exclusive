"use server"
import { getUserToken } from '@/lib/server-utils';


export async function getUserCart() {
    try {
        const token = await getUserToken();
        const response = await fetch(
            `${process.env.NEXTAUTH_API_BASE_URL}/api/v1/cart`,
            {
                headers: {
                    token: token as string,
                }
            }
        );
        const data = await response.json();
        if (!response.ok) {
            return {
                data: null,
                success: false,
                message: "Error in fetching cart"
            }
        }
        return {
            data: data,
            success: true,
            message: "Fetching cart successfully"
        }
    } catch (error) {
        return {
            data: null,
            success: false,
            message: "Something Went Wrong"
        }
    }

}
export async function removeUserCart() {
    try {
        const token = await getUserToken();
        const response = await fetch(
            `${process.env.NEXTAUTH_API_BASE_URL}/api/v1/cart`,
            {
                method: "DELETE",
                headers: {
                    token: token as string,
                }
            }
        );
        const data = await response.json();
        if (!response.ok) {
            return {
                data: null,
                success: false,
                message: data.message || "Error in fetching cart"
            }
        }
        return {
            data: data,
            success: true,
            message: data.message || "Fetching cart successfully"
        }
    } catch (error) {        
        return {
            data: null,
            success: false,
            message: error as string || "Something Went Wrong"
        }
    }

}
export async function addToCart(productId: string) {
    try {
        const token = await getUserToken();
        const response = await fetch(
            `${process.env.NEXTAUTH_API_BASE_URL}/api/v1/cart`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: token as string,
                },
                body: JSON.stringify({productId})
            }
        );
        const data = await response.json();
        if (!response.ok) {
            return {
                data: null,
                success: false,
                message: data.message || "Adding to cart failed"
            }
        }
        return {
            data: data,
            success: true,
            message: data.message || "Adding to cart successfully"
        }
    } catch (error) {
        console.log(error);
        
        return {
            data: null,
            success: false,
            message: error as string || "Something Went Wrong"
        }
    }

}
export async function removeFromCart(productId: string) {
    try {
        const token = await getUserToken();
        const response = await fetch(
            `${process.env.NEXTAUTH_API_BASE_URL}/api/v1/cart/${productId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    token: token as string,
                },
                body: JSON.stringify({productId})
            }
        );
        const data = await response.json();
        if (!response.ok) {
            return {
                data: null,
                success: false,
                message: data.message || "Adding to cart failed"
            }
        }
        return {
            data: data,
            success: true,
            message: data.message || "Adding to cart successfully"
        }
    } catch (error) {
        console.log(error);
        
        return {
            data: null,
            success: false,
            message: error as string || "Something Went Wrong"
        }
    }

}
export async function UpdateQtyProductCart(productId: string, count: number) {
    try {
        const token = await getUserToken();
        const response = await fetch(
            `${process.env.NEXTAUTH_API_BASE_URL}/api/v1/cart/${productId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    token: token as string,
                },
                body: JSON.stringify({count})
            }
        );
        const data = await response.json();
        if (!response.ok) {
            return {
                data: null,
                success: false,
                message: data.message || "Updated quantity in cart failed"
            }
        }
        return {
            data: data,
            success: true,
            message: data.message || "Updated from cart successfully"
        }
    } catch (error) {
        console.log(error);
        
        return {
            data: null,
            success: false,
            message: error as string || "Something Went Wrong"
        }
    }

}
