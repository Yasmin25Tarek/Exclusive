"use server"
import { getUserToken } from '@/lib/server-utils';


export async function getUserWishList() {
    try {
        const token = await getUserToken();
        const response = await fetch(
            `${process.env.NEXTAUTH_API_BASE_URL}/api/v1/wishlist`,
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
                message: "Error in fetching wishlist"
            }
        }
        return {
            data: data,
            success: true,
            message: "Fetching wishlist successfully"
        }
    } catch (error) {
        return {
            data: null,
            success: false,
            message: "Something Went Wrong"
        }
    }

}
export async function removeUserWishList() {
    try {
        const token = await getUserToken();
        const response = await fetch(
            `${process.env.NEXTAUTH_API_BASE_URL}/api/v1/wishlist`,
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
                message: data.message || "Error in fetching wishlist"
            }
        }
        return {
            data: data,
            success: true,
            message: data.message || "Fetching wishlist successfully"
        }
    } catch (error) {        
        return {
            data: null,
            success: false,
            message: error as string || "Something Went Wrong"
        }
    }

}
export async function addToWishList(productId: string) {
    try {
        const token = await getUserToken();
        const response = await fetch(
            `${process.env.NEXTAUTH_API_BASE_URL}/api/v1/wishlist`,
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
                message: data.message || "Adding to wishlist failed"
            }
        }
        return {
            data: data,
            success: true,
            message: data.message || "Adding to wishlist successfully"
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
export async function removeFromWishList(productId: string) {
    try {
        const token = await getUserToken();
        const response = await fetch(
            `${process.env.NEXTAUTH_API_BASE_URL}/api/v1/wishlist/${productId}`,
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
                message: data.message || "Adding to wishlist failed"
            }
        }
        return {
            data: data,
            success: true,
            message: data.message || "Adding to wishlist successfully"
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

