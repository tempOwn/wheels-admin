import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(6, { message: "Required" })
    .email("This is not a valid email."),
  password: z.string().min(6, { message: "Required" }),
});

export const forgotPasswordFormSchema = z.object({
  email: z
    .string()
    .min(6, { message: "Required" })
    .email("This is not a valid email."),
});

export const resetPasswordFormSchema = z
  .object({
    code: z
      .string({
        message: "Required",
        invalid_type_error: "Must be a number",
      })
      .min(6, { message: "Required" })
      .max(6, { message: "Required" }),
    password: z.string().min(6, { message: "Required" }),
    confirmPassword: z.string().min(6, { message: "Required" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });
