"use client"
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useWishList } from '@/context/WishListContext';
import { addToCart } from '@/services/cart.services';
import { addToWishList } from '@/services/wishlist.services';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function AddToWishListBtn({productId, ...props}: {productId:string, [Key: string]: string;}) {
    const { getWishListDetails} = useWishList();
    async function addProductWishlist(productId: string) {
        const res = await addToWishList(productId);

        if(res.success){
            toast.success(res.message, {position: "top-center",});
            getWishListDetails()
        }else {
            toast.error(res.message, { position:"top-center"});
        }
        
    }
   
  return (
    <Button  onClick={()=> addProductWishlist(productId) } {...props}>
        <Heart />
      </Button>
    
  )
}
