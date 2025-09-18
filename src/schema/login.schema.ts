import {  z } from "zod"


export const loginFormSchema = z.object({
  email: z.email({message: "Please enter a valid email address."}),
  password: z.string().nonempty({message: "Password is required"}).min(6, "Password must be at least 6 char")
})
export type LoginFormValues = z.infer<typeof loginFormSchema>