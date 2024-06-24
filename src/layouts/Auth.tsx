"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import CoverImage from "@/public/assets/images/login-cover-image.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const getPageTitle = () => {
    if (pathname === "/login") return "Sign in for free";
    if (pathname === "/forgot-password") return "Enter your email address";
    if (pathname === "/reset-password") return "Reset your password";

    return "Welcome";
  };

  return (
    <div className="align-center flex h-screen w-full">
      <div className="hidden lg:block lg:w-1/2">
        <Image className="h-full w-full" src={CoverImage} alt="Cover Image" />
      </div>

      <div className="w-full bg-[#F1F5F8] px-5 py-10 lg:w-1/2 lg:py-16">
        <div className="mb-10 flex w-full flex-col items-center space-y-5">
          <h1 className="flex items-end space-x-1 font-bold leading-none text-wheels-primary">
            <span className="-mb-1 text-5xl lg:text-6xl">Wheels</span>
            <span className="h-2.5 w-2.5 rounded-full bg-wheels-grey"></span>
          </h1>

          <p className="text-lg font-bold text-wheels-primary md:text-xl lg:text-2xl">
            {getPageTitle()}
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}
