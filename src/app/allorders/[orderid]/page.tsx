
import { IOrder } from '@/interfaces/order.interface';
import { getOrderDetails } from '@/services/order.services';
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CartItem, IOrderDetails } from '@/interfaces/orderDetails.interface';
import { IProduct } from '@/interfaces/product.interface';
import Image from 'next/image';


export default async function OrderDetailsPage({ params: { orderid } }: { params: { orderid: string } }) {

    const { data: orderDetails }: { data: IOrderDetails } = await getOrderDetails(orderid);




    return (
        <section className='py-20'>
            <div className="container mx-auto">
                {orderDetails ? (
                    <>
                        <section className="mb-20">
                            <Table className='mb-6'>
                                <TableHeader>
                                    <TableRow className='font-bold text-2xl'>
                                        <TableHead >Product</TableHead>
                                        <TableHead className="text-left">Price</TableHead>
                                        <TableHead className="text-left">Quantity</TableHead>
                                        <TableHead className="text-left">Subtotal</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orderDetails.cartItems.map((item, index) => (
                                        <TableRow key={item._id}>
                                            <TableCell className="font-medium flex items-center gap-5 " >
                                                <div className="flex items-center gap-5 relative">
                                                    <div className="flex items-center gap-4 mb-6">
                                                        <Image
                                                            src={item.product.imageCover}
                                                            alt={item.product.title}
                                                            width={60}
                                                            height={60}
                                                            className="rounded"
                                                        />
                                                    <h3 >{item.product.title}</h3>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{item.product.ratingsQuantity}</TableCell>
                                            <TableCell>{item.count}</TableCell>
                                            <TableCell>{item.price}</TableCell>

                                        </TableRow>
                                    ))}

                                    <div className="flex flex-col border-t-4 border-black text-xl">
                                    <div className="flex justify-between ">
                                        <h3 className='text-xl font-bold'>Address: </h3>
                                    <TableCell>{orderDetails.shippingAddress?.details}</TableCell>
                                    </div>
                                    <TableCell className='text-right'>{orderDetails.shippingAddress?.city}</TableCell>
                                    <div className="flex justify-between ">
                                        <h3 className='text-xl font-bold'>Phone Number: </h3>
                                    <TableCell>{orderDetails.shippingAddress?.phone}</TableCell>
                                    </div>
                                    <div className="flex justify-between ">
                                        <h3 className='text-xl font-bold'>Total Price: </h3>
                                    <TableCell>{orderDetails.totalOrderPrice}</TableCell>
                                    </div>

                                    </div>

                                </TableBody>
                            </Table>

                        </section>

                    </>) : (<>
                        <div className="flex flex-col gap-4 justify-center items-center">
                            <h2 className='text-2xl font-bold '>Your Orders List Is Empty</h2>
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
