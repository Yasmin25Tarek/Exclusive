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
import { loginFormSchema, LoginFormValues } from "@/schema/login.schema"
import { signIn } from "next-auth/react";
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"




export default function LoginPage() {
  const router = useRouter()
  const form = useForm<LoginFormValues>({resolver: zodResolver(loginFormSchema), defaultValues: {email:"", password:""}});

  async function onSubmit(values: LoginFormValues){
  try {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect:false,
      callbackUrl: "/",
    });
    if(res?.ok){
      toast.success(res?.error || "Login Successfully", {
        position:"top-center"
      });
      router.push("/");
    } else{
      toast.error(res?.error || "Something went wrong", {
        position:"top-center"
      });
    }
  } catch (error) {
    console.log(error);
    
  }
}
  return (
      <section className="py-20">
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-7">Login</h1>
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="username@domain.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder="*******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-5 items-center">
        <Button type="submit" className="px-10">Submit</Button>
          <Link href={"/forgotPassword"} className="underline text-blue-600">Forgot Password? Click Here</Link>
        </div>
      </form>
    </Form>
    </div>
   </section>
   
  )
}