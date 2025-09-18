"use client"
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { addToCart } from '@/services/cart.services';
import { LoaderCircle } from 'lucide-react';
import { useTransition } from 'react'
import { toast } from 'sonner';

export default function AddToCartBtn({productId, ...props}: {productId:string, [Key: string]: string;}) {
    const [isPending, stertTransition] = useTransition();
    const { getCartDetails} = useCart();
    async function addProductCart(productId: string) {
      stertTransition(async ()=>{
        const res = await addToCart(productId);
        if(res.success){
            toast.success(res.message, {position: "top-center",});
            getCartDetails()
        }else {
            toast.error(res.message, { position:"top-center"});
        }
      });
        
    }
   
  return (
    <Button disabled={isPending} onClick={()=> addProductCart(productId) } {...props}>
      {isPending ? <LoaderCircle className='animate-spin'/> : "Add To Cart"}
      </Button>
    
  )
}
