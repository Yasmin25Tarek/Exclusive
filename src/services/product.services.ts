import React from 'react'

export default async function getProducts(limit = 40) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/Products?limit=${limit}`,
            {
                cache: "no-cache"
            }
        );
        if (!response.ok) 
            throw new Error(response.statusText || "Failed to fetch Products");
            const data = await response.json();
            return data
    } catch (error) {
        console.log(error);
        return { error: error as string }
    }
}
export async function getProductsDetails(id: string) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products/${id}`,
            {
                cache: "no-cache"
            }
        );
        if (!response.ok) 
            throw new Error(response.statusText || "Failed to fetch Products");
            const data = await response.json();
            return data
    } catch (error) {
        console.log(error);
        return { error: error as string }
    }
}
