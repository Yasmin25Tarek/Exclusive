import { IOrder } from '@/interfaces/order.interface'
import React from 'react'
import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import Link from 'next/link'


export default function OrderItem({order}: {order: IOrder }) {
  return (
     <TableRow>
                <TableCell >{order.createdAt}</TableCell>
                <TableCell>{order.updatedAt}</TableCell>
                <TableCell>{order.paymentMethodType}</TableCell>
                <TableCell>
                  <Button asChild variant={'destructive'}>
                    <Link href={`/allorders/${order._id}`}>More Details</Link>
                  </Button>
                </TableCell>
              </TableRow>
  )
}
