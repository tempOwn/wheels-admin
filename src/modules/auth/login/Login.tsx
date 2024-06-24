"use client";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CoverImage from "@/public/assets/images/login-cover-image.png";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(6, { message: "Required" })
    .email("This is not a valid email."),
  password: z.string().min(6, { message: "Required" }),
});

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
  }

  return (
    <div className="align-center flex h-screen w-full">
      <div className="hidden lg:block lg:w-1/2">
        <Image className="h-full w-full" src={CoverImage} alt="Cover Image" />
      </div>

      <div className="w-full bg-[#F1F5F8] px-5 py-10 lg:w-1/2 lg:py-16">
        <div className="flex w-full flex-col items-center space-y-5">
          <h1 className="flex items-end space-x-1 font-bold leading-none text-wheels-primary">
            <span className="-mb-1 text-5xl lg:text-6xl">Wheels</span>
            <span className="h-2.5 w-2.5 rounded-full bg-wheels-grey"></span>
          </h1>

          <p className="text-lg font-bold text-wheels-primary md:text-xl lg:text-2xl">
            Sign in for free
          </p>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto mt-10 flex w-full max-w-96 flex-col items-center justify-center">
          <div className="flex w-full flex-col">
            <label className="flex w-full flex-col items-start space-y-1">
              <span className="text-sm text-wheels-grey">Email Address</span>
              <input
                {...register("email")}
                className="w-full rounded-lg border border-wheels-border bg-white p-3 text-sm outline-none focus:border-wheels-primary"
                type="email"
                placeholder="Enter Email Address"
              />
              {errors.email && (
                <span className="text-xs text-red-500">
                  {errors.email.message}
                </span>
              )}
            </label>

            <label className="mb-2 mt-5 flex w-full flex-col items-start space-y-2">
              <span className="text-sm text-wheels-grey">Password</span>
              <input
                {...register("password")}
                className="w-full rounded-lg border border-wheels-border bg-white p-3 text-sm outline-none focus:border-wheels-primary"
                type="password"
                placeholder="Enter Password"
              />
              {errors.password && (
                <span className="text-xs text-red-500">
                  {errors.password.message}
                </span>
              )}
            </label>

            <button className="ml-auto text-sm text-wheels-grey">
              Forgot Password ?
            </button>
          </div>

          <div className="mt-20 flex w-full flex-col items-center space-y-4 text-sm text-wheels-grey lg:space-y-6">
            <p className="text-center">
              You acknowledge that you read and agree to our
              <span className="font-medium text-wheels-grey-3">
                Terms of Service
              </span>{" "}
              and our{" "}
              <span className="font-medium text-wheels-grey-3">
                Privacy Policy
              </span>
            </p>

            <button
              className="text-semibold w-full rounded-lg border border-wheels-primary bg-white px-10 py-3 transition-all duration-200 ease-in-out hover:bg-wheels-primary hover:text-white"
              type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
