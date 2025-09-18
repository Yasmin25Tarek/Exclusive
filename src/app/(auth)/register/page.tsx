"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import handleRegister from "@/services/register.services"
import { useActionState, useEffect } from "react"
import { formState, registerFormSchema, RegisterValues } from "@/schema/register.schema"


export default function RegisterPage() {
  const router = useRouter()
  const [action, formAction]= useActionState(handleRegister, formState)
  const form = useForm<RegisterValues>(
    {resolver: zodResolver(registerFormSchema), 
      defaultValues: {name:"" ,email:"", password:"", rePassword:"", phone:""}});
      
  useEffect(()=> {
    if(action) {
      if(!action.success && action.message){
        toast.error(action.message, { 
          position: "top-center",
        });
      }
      if(action.success && action.message){
        toast.success(action.message, {
          position: "top-center",
        });
        router.push("/login")
      }
      
  }},[action])

  return (
      <section className="py-20">
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-7">Register</h1>
       <Form {...form}>
      <form action={formAction}  className="space-y-8">
        {/* *********** Nmae Field ************* */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="username@domain.com" {...field} />
              </FormControl>
              <FormMessage>{action?.error?.name?.[0]}</FormMessage>{" "}
            </FormItem>
          )}
        />
        {/* *********** Email Field ************* */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="username@domain.com" {...field} />
              </FormControl>
              <FormMessage>{action?.error?.email?.[0]}</FormMessage>{" "}
            </FormItem>
          )}
        />
        {/* *********** Password Field ************* */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder="*******" {...field} />
              </FormControl>
              <FormMessage>{action?.error?.password?.[0]}</FormMessage>{" "}
            </FormItem>
          )}
        />
        {/* *********** Confirm Password Field ************* */}
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type='rePassword' placeholder="*******" {...field} />
              </FormControl>
              <FormMessage>{action?.error?.rePassword?.[0]}</FormMessage>{" "}
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
   </section>
   
  )
}