'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { toast } from "sonner";


import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { resetPassword } from '@/services/auth.services';
import { ResetPasswordFormValues, resetPasswordSchema } from '@/schema/resetPass.schema';

export default function ResetPasswordPage() {
  const router = useRouter();
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    const storedCode = localStorage.getItem("verifiedCode");

    if (!storedEmail || !storedCode) {
      toast.error("Please check to your email.");
      router.push("/forgotPassword");
      return;
    }

    setEmail(storedEmail);
    setCode(storedCode);
  }, [router]);

  async function onSubmit(values: ResetPasswordFormValues) {
    try {
      const res = await resetPassword(email, code, values.password);
      if(res?.ok){
          toast.success(res?.error || "Change Password successfully", {
              position:"top-center"
            });
            localStorage.removeItem("resetEmail");
            localStorage.removeItem("verifiedCode");
      router.push("/login");
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
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-7">Change Password</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Confirm</Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
