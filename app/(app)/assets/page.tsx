import type { Metadata } from "next";
import Assets from "@/src/modules/assets";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Assets",
};

export default function Page() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Assets />
    </Suspense>
  );
}
