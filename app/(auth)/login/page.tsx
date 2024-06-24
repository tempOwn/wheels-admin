import Login from "@/src/modules/auth/login";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return <Login />;
}
