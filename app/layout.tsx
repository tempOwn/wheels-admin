import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/src/components/core/toast";

export const metadata: Metadata = {
  title: "Wheels Admin",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          richColors
          position="top-right"
          toastOptions={{
            duration: 2000,
          }}
        />
      </body>
    </html>
  );
}
