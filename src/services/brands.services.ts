export default async function getbrands() {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/brands`
        );
        if (!response.ok) 
            throw new Error(response.statusText || "Failed to fetch brands");
            const data = await response.json();
            return data
    } catch (error) {
        console.log(error);
        return { error: error as string }
    }
};
export async function getBrandDetails(id: string) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/brands/${id}`,
            {
                cache: "no-cache"
            }
        );
        
        if (!response.ok) 
            throw new Error(response.statusText || "Failed to fetch brands");
        const result = await response.json();
        console.log("Fetched brand data:", result);
        return result.data
    } catch (error) {
        console.log(error);
        return null;
    }
}
