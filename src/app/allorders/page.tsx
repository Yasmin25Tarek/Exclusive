import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getOrderDetails, getOrders } from "@/services/order.services";
import { IOrder } from "@/interfaces/order.interface";
import OrderItem from "./orderitem";



export default async function allOrders() {
  const { data: orders }: { data: IOrder[] } = await getOrders()


  return (
    <section className='py-12'>
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">All Orders</h2>
        <Table>
          <TableHeader>
            <TableRow className="font-bold">
              <TableHead>Create Date</TableHead>
              <TableHead>Update Date</TableHead>
              <TableHead>Paymant Method</TableHead>
              <TableHead>More Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders && orders.map((order) => (
              <OrderItem key={order._id} order={order} />
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
