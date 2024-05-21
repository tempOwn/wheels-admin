import type { Metadata } from "next";
import Assets from "@/src/modules/assets";

export const metadata: Metadata = {
  title: "Assets",
};

export default function Page() {
  return <Assets />;
}
