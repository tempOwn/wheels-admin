import type { Metadata } from "next";
import Customers from "@/src/modules/customers";
import Team from "@/src/modules/team";

export const metadata: Metadata = {
  title: "Team",
};

export default function Page() {
  return <Team />;
}
