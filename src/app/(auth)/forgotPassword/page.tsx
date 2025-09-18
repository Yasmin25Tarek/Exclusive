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
import { useState } from "react"
import { ForgotPasswordFormValues, forgotPasswordSchema, VerifyCodeFormValues, verifyCodeSchema } from "@/schema/forgetPass.schema"
import { sendResetCode, verifyResetCode } from "@/services/auth.services"



export default function ForgotPasswordPage() {
const [Email, setEmail] = useState("");
const [Step, setStep] = useState<1 | 2>(1);
const router = useRouter();
  const emailForm = useForm<ForgotPasswordFormValues>(
    {resolver: zodResolver(forgotPasswordSchema), defaultValues: {email:""}});
  const codeForm = useForm<VerifyCodeFormValues>(
    {resolver: zodResolver(verifyCodeSchema), defaultValues: {code:""}});

async function handleSendCode(data: ForgotPasswordFormValues) {
    try {
      const resetCode = await sendResetCode(data.email);
      setEmail(data.email);
      localStorage.setItem("resetEmail", data.email);
      toast.success(resetCode?.error || "Email send successfully!");
      setStep(2);
    } catch (error) {
      toast.error( "Something went wrong!");
    }
  }

  async function handleVerifyCode(data: VerifyCodeFormValues) {
    try {
      await verifyResetCode(data.code);
      localStorage.setItem("verifiedCode", data.code);
      toast.success("Code verified successfully");
      router.push("/reset-password");
      
    } catch (error) {
      toast.error( "Invalid code");
    }
  }


  return (
       <section className="py-20">
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-7">Forget Passwoed</h1>
         {Step === 1 && (
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(handleSendCode)} className="space-y-8">
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Send Code</Button>
            </form>
          </Form>
        )}

        {Step === 2 && (
          <Form {...codeForm}>
            <form onSubmit={codeForm.handleSubmit(handleVerifyCode)} className="space-y-8">
              <FormField
                control={codeForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter The Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Check The Code</Button>
            </form>
          </Form>
        )}
        </div>
        </section>
  )
}
