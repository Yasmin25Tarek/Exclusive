import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const verifyCodeSchema = z.object({
  code: z.string().min(4, "Code is reqiured"),
});

export type VerifyCodeFormValues = z.infer<typeof verifyCodeSchema>;
