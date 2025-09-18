import { z } from "zod";
import { loginFormSchema } from "./login.schema";

export const resetPasswordSchema = z
  .object({
    password: loginFormSchema.shape.password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password is not match",
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
