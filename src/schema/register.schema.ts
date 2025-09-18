import { z } from "zod"


export const registerFormSchema = z.object({
  name: z.string({message: "Please enter your name"}),
  email: z.email({message: "Please enter a valid email address."}),
  password: z.string().nonempty({message: "Password is required"}).min(6, "Password must be at least 6 char"),
  rePassword: z.string().nonempty({message: "Password is required"}).min(6, "Password must be at least 6 char"),
  phone:z.string().nonempty({message:"Phone Number is reqiurd."}).regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {message: "Invalid phone number"}),
}).refine((data) => data.password === data.rePassword, {
message: "Password is not match", path: ["rePassword"]
})
export type RegisterValues = z.infer<typeof registerFormSchema>

export const formState = {
  success: false,
  error: {},
  message: null, 
};

export type formStateType = {
  success: boolean;
  error: {
    name?: string[];
    email?: string[];
    password?: string[];
    rePassword?: string[];
    phone?: string[];
  };
  message: string | null;
};