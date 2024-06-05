import type { Metadata } from "next";
import CustomerProfile from "@/src/modules/customers/components/CustomerProfile";

export const metadata: Metadata = {
  title: "Customer's Profile",
  description: "",
};

export default function Page() {
  return <CustomerProfile />;
}
