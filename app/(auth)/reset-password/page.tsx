import ResetPassword from "@/src/modules/auth/reset-password";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function Page() {
  return <ResetPassword />;
}
