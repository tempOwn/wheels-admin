import type { Metadata } from "next";
import Inventory from "@/src/modules/inventory";

export const metadata: Metadata = {
  title: "Inventory",
};

export default function Page() {
  return <Inventory />;
}
