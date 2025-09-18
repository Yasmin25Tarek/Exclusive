"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { addressFormSchema, addressFormState, addressFormType } from '@/schema/address.schema';
import { handlePayment } from '@/services/order.services';
import { useCart } from '@/context/CartContext';


export default function CheckoutPage() {
  const { cartDetails, setCartDetails } = useCart()
  const router = useRouter()
  const [action, formAction] = useActionState(handlePayment, addressFormState)
  const form = useForm<addressFormType>(
    {
      resolver: zodResolver(addressFormSchema),
      defaultValues: { details: "", city: "", phone: "", cartId: "", paymentMethod:"cash" }
    });
 useEffect(() => {
  if (cartDetails?.cartId) {
    form.setValue("cartId", cartDetails.cartId)
  }
}, [cartDetails])

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (action) {
      if (action.success && action.message) {
        if(form.getValues("paymentMethod")  === "cash"){
        toast.success(action.message, {
          position: "top-center",
        });
        setCartDetails(null);
        timeout = setTimeout(() => {
          router.push(action.callbackUrl || "/allorders");
        }, 2000);
      } else {
        window.location.href = action.callbackUrl as string;
      }
      } else if (!action.success && action.message) {
        toast.error(action.message, {
          position: "top-center", 
        });
      }
    } return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    }


  }, [action, router])



  return (
    <section className="py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-7">Billing Details</h1>
        <Form {...form}>
          <form action={formAction} className="space-y-8">
            {/* *********** Address Field ************* */}
            <input type="hidden" {...form.register("cartId")} />
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Details</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder="*******" {...field} />
                  </FormControl>
                  <FormMessage>{action?.error?.details?.[0]}</FormMessage>{" "}
                </FormItem>
              )}
            />
            {/* *********** City Password Field ************* */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder="*******" {...field} />
                  </FormControl>
                  <FormMessage>{action?.error?.city?.[0]}</FormMessage>{" "}
                </FormItem>
              )}
            />
            {/* ***********  Phone Field ************* */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type='tel' placeholder="*******" {...field} />
                  </FormControl>
                  <FormMessage>{action?.error?.phone?.[0]}</FormMessage>{" "}
                </FormItem>
              )}
            />
            {/* ***********  Payment Method Field ************* */}
           <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Payment Method</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  name={field.name}
                  className="flex flex-col"
                >
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="cash" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Cash
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="card" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Card
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </section>

  )
}