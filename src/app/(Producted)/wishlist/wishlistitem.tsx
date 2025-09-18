import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import AddToCartBtn from '@/app/(shop)/products/AddToCartBtn';
import { useWishList } from '@/context/WishListContext';
import { IWishListProduct } from '@/interfaces/wishlist.interface';
import { Badge } from '@/components/ui/badge';
import { Trash, X } from 'lucide-react';
import { removeFromWishList } from '@/services/wishlist.services';
import { toast } from 'sonner';


interface Props {
    product: IWishListProduct;
}

export default function WishListItem({ product }: Props) {
    const { wishListDetails, setwishListDetails } = useWishList()

    async function removeProductFromWhishList(productId: string) {
        const res = await removeFromWishList(productId);

        if (res?.message === "success") {
            toast.success(res.message, {
                position: "top-center"
            });
            setwishListDetails(res.data)
        } else {
            toast.error(res.message, {
                position: "top-center"
            });

        }
    }


    return (
        <div className="border rounded-lg shadow-md p-4">
            <div className="flex items-center gap-5 relative">
                <Badge onClick={() => removeProductFromWhishList(product._id)}
                    className="absolute -top-2 -end-0.5 h-8 min-w-7 rounded px-1 font-mono tabular-nums"
                    variant="destructive">
                    <Trash size={20} />
                </Badge>
                <Image
                    src={product.imageCover}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover rounded-md"
                />
            </div>
            <div className="flex flex-col">
                <AddToCartBtn productId={product._id} />
                <h3 className='font-medium mt-2 line-clamp-1 hover:text-red-500'>
                    <Link href={`/products/${product._id}`}>
                        {product.title}
                    </Link>
                </h3>
            </div>
            <p className="text-gray-700">{product.price} EGP</p>
        </div>
    )
}
