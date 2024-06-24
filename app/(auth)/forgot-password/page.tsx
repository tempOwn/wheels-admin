import ForgotPassword from "@/src/modules/auth/forgot-password";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function Page() {
  return <ForgotPassword />;
}
