import type { Metadata } from "next";
import CustomersProfile from "@/src/modules/customers-profile";

export const metadata: Metadata = {
  title: "Customer's Profile",
};

export default function Page() {
  return <CustomersProfile/>;
}
