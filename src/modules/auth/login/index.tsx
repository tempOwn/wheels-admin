"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { loginFormSchema } from "../formSchema";
import PasswordInput from "@/src/components/core/password-input";
import { Button } from "@/src/components/core/button";

export default function Login() {
  const {
    formState: { errors },
    register,
    ...form
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    console.log(values);
    // TODO: Call api and handle response
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className=";flex mx-auto w-full max-w-96 flex-col items-center justify-center xl:max-w-md">
      <div className="flex w-full flex-col space-y-5">
        <label className="flex w-full flex-col items-start space-y-1">
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

        <Link
          href="/forgot-password"
          className="ml-auto text-sm text-wheels-grey">
          Forgot Password ?
        </Link>
      </div>

      <div className="mt-20 flex w-full flex-col items-center space-y-4 text-sm text-wheels-grey lg:space-y-6">
        <p className="text-center">
          You acknowledge that you read and agree to our
          <span className="font-medium text-wheels-grey-3">
            {" "}
            Terms of Service
          </span>{" "}
          and our{" "}
          <span className="font-medium text-wheels-grey-3">Privacy Policy</span>
        </p>

        <Button size="lg" className="w-full">
          Login
        </Button>
      </div>
    </form>
  );
}
