import {  z } from "zod"

export const addressFormSchema = z.object({
  cartId: z.string().nonempty({message: "cartId is required"}),
  details: z.string().nonempty({message: "Address is required"}).min(6, "Address must be at least 6 char"),
  city: z.string().nonempty({message: "The City is required"}).min(6, "The City must be at least 6 char"),
  phone:z.string().nonempty({message:"Phone Number is reqiurd."}).regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {message: "Invalid phone number"}),
  paymentMethod: z.enum(["cash", "card"], {
    message: "Payment method is required"
  })
})
export type addressFormType = z.infer<typeof addressFormSchema>

export const addressFormState = {
  success: false,
  error: {
    cartId: [],
    details: [],
    city: [],
    phone: [],
    paymentMethod: [],
  },
  message: null, 
  callbackUrl: "",
};

export type addressFormStateType = {
  success: boolean;
  error: {
    cartId?: string[];
    details?: string[];
    city?: string[];
    phone?: string[];
    paymentMethod?: string[];

  };
  message: string | null;
  callbackUrl?: string
};