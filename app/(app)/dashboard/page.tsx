import type { Metadata } from "next";
import Customers from "@/src/modules/customers";

export const metadata: Metadata = {
  title: "Customers",
};

export default function Page() {
  return <Customers />;
}
