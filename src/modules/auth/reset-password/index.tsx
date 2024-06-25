"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { resetPasswordFormSchema } from "../formSchema";
import { useState } from "react";
import OpenEyeIcon from "@/src/components/icons/OpenEyeIcon";
import ClosedEyeIcon from "@/src/components/icons/ClosedEyeIcon";

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

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

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

        <label className="flex w-full flex-col items-start space-y-2">
          <span className="text-sm text-wheels-grey">Password</span>
          <div className="flex w-full items-center space-x-2 rounded-lg border border-wheels-border bg-white p-3 focus:border-wheels-primary">
            <input
              {...register("password")}
              className="w-full text-sm outline-none focus:border-wheels-primary"
              type={isVisible ? "text" : "password"}
              placeholder="Enter Password"
            />
            <span onClick={toggleVisibility}>
              {isVisible ? <OpenEyeIcon /> : <ClosedEyeIcon />}
            </span>
          </div>
          {errors.password && (
            <span className="text-xs text-red-500">
              {errors.password.message}
            </span>
          )}
        </label>

        <label className="flex w-full flex-col items-start space-y-2">
          <span className="text-sm text-wheels-grey">Confirm Password</span>
          <div className="flex w-full items-center space-x-2 rounded-lg border border-wheels-border bg-white p-3 focus:border-wheels-primary">
            <input
              {...register("confirmPassword")}
              className="w-full text-sm outline-none focus:border-wheels-primary"
              type={isVisible ? "text" : "password"}
              placeholder="Enter Password"
            />
            <span onClick={toggleVisibility}>
              {isVisible ? <OpenEyeIcon /> : <ClosedEyeIcon />}
            </span>
          </div>
          {errors.confirmPassword && (
            <span className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>
      </div>

      <div className="mt-20 flex w-full text-sm text-wheels-grey lg:space-y-6">
        <button
          className="w-full rounded-lg border border-wheels-primary bg-white px-10 py-3 font-semibold transition-all duration-200 ease-in-out hover:bg-wheels-primary hover:text-white"
          type="submit">
          Reset Password
        </button>
      </div>
    </form>
  );
}
