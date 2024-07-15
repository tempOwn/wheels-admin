import type { Metadata } from "next";
import Ambassadors from "@/src/modules/ambassadors";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Ambassadors",
};

export default function Page() {
  return <Ambassadors />;
}
