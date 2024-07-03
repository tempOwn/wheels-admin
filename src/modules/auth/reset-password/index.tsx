"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { resetPasswordFormSchema } from "../formSchema";
import PasswordInput from "@/src/components/core/password-input";
import { Button } from "@/src/components/core/button";

export default function ResetPassword() {
  const {
    formState: { errors },
    register,
    getValues,
    ...form
  } = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof resetPasswordFormSchema>) {
    console.log(values);
    // TODO: Call api and handle response
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto flex w-full max-w-96 flex-col items-center justify-center xl:max-w-md">
      <div className="flex w-full flex-col space-y-5">
        <label className="flex w-full flex-col items-start space-y-1">
          <span className="text-sm text-wheels-grey">OTP Code</span>
          <input
            {...register("code")}
            className="w-full rounded-lg border border-wheels-border bg-white p-3 text-sm outline-none focus:border-wheels-primary"
            type="text"
            placeholder="Enter OTP Code"
          />
          {errors.code && (
            <span className="text-xs text-red-500">{errors.code.message}</span>
          )}
        </label>

        <div>
          <PasswordInput
            {...register("password")}
            label="Password"
            placeholder="Enter Password"
          />
          {errors.password && (
            <span className="text-xs text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        <div>
          <PasswordInput
            {...register("confirmPassword")}
            label="Confirm Password"
            placeholder="Enter Password"
          />
          {errors.confirmPassword && (
            <span className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
      </div>

      <div className="mt-10 flex w-full text-sm text-wheels-grey lg:space-y-6">
        <Button size="lg" className="w-full">
          Reset Password
        </Button>
      </div>
    </form>
  );
}
