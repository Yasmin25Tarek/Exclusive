import React from 'react'

export default async function getCategories() {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/categories`
        );
        if (!response.ok) 
            throw new Error(response.statusText || "Failed to fetch categories");
            const data = await response.json();
            return data
    } catch (error) {
        console.log(error);
        return { error: error as string }
    }
}
export async function getCategortDetails(id: string) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/categories/${id}`,
            {
                cache: "no-cache"
            }
        );
        if (!response.ok) 
            throw new Error(response.statusText || "Failed to fetch Categories");
            const result = await response.json();
        console.log("Fetched brand data:", result);
        return result.data
    } catch (error) {
        console.log(error);
        return null;
    }
}
