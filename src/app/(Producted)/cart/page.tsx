"use client"
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { removeFromCart, removeUserCart, UpdateQtyProductCart } from '@/services/cart.services'
import { useCart } from '@/context/CartContext'
import { X } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { toast } from 'sonner'




export default function CartPage() {
const {cartDetails, setCartDetails} = useCart();


 async function removeCartItems() {
  const res = await removeUserCart();
  if(res?.message === "success"){
    toast.success("Cart removed successfully",  {
        position:"top-center"
      });
    setCartDetails(null)
  }else{
    toast.error(res.message || "Something Went Wrong!!!");

  }
 }
 async function UpdateQuantityProductCart(productId: string, count: number) {
  const res = await UpdateQtyProductCart(productId, count);
  
  if(res?.message === "success"){
    toast.success(res.message,  {
        position:"top-center"
      });
    setCartDetails(res.data)
  }else{
    toast.error(res.message,{
        position:"top-center"
      } );

  }
 }
 async function removeProductFromCart(productId: string) {
  const res = await removeFromCart(productId);
  
  if(res?.message === "success"){
    toast.success(res.message,  {
        position:"top-center"
      });
    setCartDetails(res.data)
  }else{
    toast.error(res.message,{
        position:"top-center"
      } );

  }
 }

  return (
    <section className='py-20'>
      <div className="container mx-auto">
      {cartDetails? (
        <>
        <section className="mb-20">
          <Table className='mb-6'>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartDetails.data.products.map((product)=>(

                <TableRow key={product._id}>
                <TableCell className="font-medium flex items-center gap-5 " >
                <div className="flex items-center gap-5 relative">
                    <Badge onClick={() => removeProductFromCart(product.product._id)}
                      className="absolute -top-2 -start-0.5  rounded-full px-1 font-mono tabular-nums"
                      variant="destructive">
                      <X size={15}/>
                  </Badge>
                  <Image src={product.product.imageCover}
                    alt={product.product.title} width={54} height={54} />
                  <h3 >{product.product.title}</h3>
                </div>
               </TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <div className="flex gap-4 items-center">
                  <Button variant={"outline"} size={"sm"} onClick={() => UpdateQuantityProductCart( product.product._id, product.count - 1)}>
                    -</Button>
                    {product.count}
                  <Button variant={"outline"} size={"sm"} onClick={() => UpdateQuantityProductCart( product.product._id, product.count + 1)}>
                    +</Button>
                  </div>
                </TableCell>
                <TableCell className="text-right">{product.count * product.price}</TableCell>
              </TableRow>

))}
            </TableBody>
          </Table>
          <div className="flex justify-between">
            <Button variant="outline">
              <Link href={"/product"}>Return To Shop</Link>
            </Button>
            <Button variant="destructive" onClick={removeCartItems} >
              Remove All
            </Button>
            <Button variant="outline" >
              <Link href={"/cart"}>Update Cart</Link>
            </Button>
          </div>
        </section>
        <section>
          <div className="flex justify-between">
          <div className="flex items-center gap4 w-5/12">
            <Input placeholder='Coupon Code' />
            <Button variant='destructive'>Apply Coupon</Button>
          </div>
          <div className="w-5/12 py-8 px-6 border-2 border-gray-950">
          <h3 className="font-bold mb-6 text-xl">Cart Total</h3>
          <ul className="divide-y divide-gray-950">
            <li className="py-6 flex justify-between">
              <span>Subtotal:</span> <span>{cartDetails.data.totalCartPrice} EGP</span>
            </li>
            <li className="py-6 flex justify-between">
              <span>Shipping:</span> <span>Free</span>
            </li>
            <li className="py-6 flex justify-between">
              <span>Total:</span> <span>{cartDetails.data.totalCartPrice} EGP</span>
            </li>
          </ul>
          <div className="flex justify-center">
            <Button variant='destructive' asChild>
              <Link href={"/checkout"}>
              Procees to checkout
              </Link>
              </Button>
          </div>
          </div>
          </div>
        </section>
      </>):(<>
      <div className="flex flex-col gap-4 justify-center items-center">
          <h2 className='text-2xl font-bold '>Your Cart Is Empty</h2>
          <div>
            <Button variant="outline">
              <Link href={"/products"}>Return To Shop</Link>
            </Button>
          </div>
      </div>


      </>)}
        
      </div>
    </section>
  )
}
