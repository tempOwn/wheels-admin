"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { forgotPasswordFormSchema } from "../formSchema";
import FormButton from "@/src/components/core/button";

export default function ForgotPassword() {
  const {
    formState: { errors },
    register,
    ...form
  } = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof forgotPasswordFormSchema>) {
    console.log(values);
    // TODO: Call api and handle response
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className=";flex mx-auto w-full max-w-96 flex-col items-center justify-center xl:max-w-md">
      <div className="flex w-full flex-col">
        <label className="mb-2 flex w-full flex-col items-start space-y-1">
          <span className="text-sm text-wheels-grey">Email Address</span>
          <input
            {...register("email")}
            className="w-full rounded-lg border border-wheels-border bg-white p-3 text-sm outline-none focus:border-wheels-primary"
            type="email"
            placeholder="Enter Email Address"
          />
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
        </label>

        <Link href="/login" className="ml-auto text-sm text-wheels-grey">
          Remember Password ? Login
        </Link>
      </div>

      <div className="mt-20 flex w-full text-sm text-wheels-grey">
        <FormButton>Submit</FormButton>
      </div>
    </form>
  );
}
