import { z } from 'zod';

const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[0-9]/, "Password must contain at least 1 number")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least 1 special character")
  .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
  .regex(/[a-z]/, "Password must contain at least 1 lowercase letter");

export const SignupSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: passwordSchema,
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
  
  export type SignupInput = z.infer<typeof SignupSchema>;