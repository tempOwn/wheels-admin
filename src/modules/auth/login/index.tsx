"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/src/lib/utils";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { loginFormSchema } from "../formSchema";
import { useLoginMutation } from "@/src/store/api/auth";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/src/store/hooks";
import { setToLocalStorage } from "@/src/lib/storage";
import { WHEELS_ADMIN_TOKEN, WHEELS_ADMIN_USER } from "@/src/lib/constants";
import { setCredentials } from "@/src/store/features/authSlice";
import { handleApiErrors } from "@/src/store/api/helper";
import PasswordInput from "@/src/components/core/password-input";
import { Button } from "@/src/components/core/button";
import LoadingSpinner from "@/src/components/core/loaders/LoadingSpinner";
import type { TLoginResponse } from "@/src/store/types/auth";

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();

  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    formState: { errors },
    register,
    ...form
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      id: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    await login(values)
      .unwrap()
      .then((response: TLoginResponse) => {
        const user = response.data;
        const token = user?.auth_token as string;
        setToLocalStorage(WHEELS_ADMIN_USER, JSON.stringify(user));
        setToLocalStorage(WHEELS_ADMIN_TOKEN, token);

        dispatch(
          setCredentials({
            token,
            user,
          }),
        );
        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      })
      .catch((err) => {
        handleApiErrors(err);
      });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto flex w-full max-w-96 flex-col items-center justify-center xl:max-w-md">
      <div className="flex w-full flex-col space-y-5">
        <label className="flex w-full flex-col items-start space-y-1">
          <span className="text-sm text-wheels-grey">User ID</span>
          <input
            {...register("id")}
            className="w-full rounded-lg border border-wheels-border bg-white p-3 text-sm outline-none focus:border-wheels-primary"
            type="text"
            placeholder="Enter User Id"
          />
          {errors.id && (
            <span className="text-xs text-red-500">{errors.id.message}</span>
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

        <Button
          type="submit"
          size="lg"
          className={cn("w-full", {
            "cursor-not-allowed": isLoading,
          })}
          disabled={isLoading}>
          {isLoading ? <LoadingSpinner /> : "Login"}
        </Button>
      </div>
    </form>
  );
}
