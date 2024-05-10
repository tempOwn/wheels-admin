"use client";
import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import useOnclickOutside from "react-cool-onclickoutside";
import Link from "next/link";

import DashboardIcon from "../components/icons/DashboardIcon";
import AssetIcon from "../components/icons/AssetIcon";
import UserWithCheckMarkIcon from "../components/icons/UserWithCheckMarkIcon";
import UsersIcon from "../components/icons/UsersIcon";
import LogoutIcon from "../components/icons/LogoutIcon";
import BellIcon from "../components/icons/BellIcon";
import WheelsLogo from "../components/svgs/WheelsLogo";
import UserIcon from "../components/icons/UserIcon";
import PerformanceIcon from "../components/icons/PerformanceIcon";
import HelpIcon from "../components/icons/HelpIcon";
import WheelIcon from "../components/icons/WheelIcon";
import MenuIcon from "../components/icons/MenuIcon";
import MagnifyingGlassIcon from "../components/icons/MagnifyingGlassIcon";

const sidebarLinks = [
  {
    label: "Dashboard",
    icon: <DashboardIcon />,
    href: "/dashboard",
  },
  {
    label: "Ambassadors",
    icon: <UserIcon />,
    href: "/",
  },
  {
    label: "Customers",
    icon: <UserWithCheckMarkIcon />,
    href: "/",
  },
  {
    label: "Assets",
    icon: <AssetIcon />,
    href: "/assets",
  },
  {
    label: "Team",
    icon: <UsersIcon />,
    href: "/",
  },
  {
    label: "Performance",
    icon: <PerformanceIcon />,
    href: "/",
  },
  {
    label: "Help Station",
    icon: <HelpIcon />,
    href: "/",
  },
  {
    label: "Settings",
    icon: <WheelIcon />,
    href: "/",
  },
];

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const pathname = usePathname();

  const inputSearch = useRef<any>(null);

  const ref = useOnclickOutside(() => {
    setOpenSidebar(false);
  });

  const handleLogout = () => {
    //
    setOpenSidebar(!openSidebar);
  };

  const handleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <div className="flex">
      <aside
        ref={ref}
        className={`${openSidebar ? "translate-x-0" : "-translate-x-full"} fixed z-10 flex h-full w-60 flex-col justify-between space-y-10 border-r border-[rgba(0,0,0,0.10)] bg-white px-5 py-10 transition-transform duration-300 ease-in-out lg:translate-x-0 2xl:w-80 3xl:w-1/3`}
      >
        <div>
          <div className="flex items-center justify-center">
            <WheelsLogo />
          </div>

          <div className="mt-16 space-y-7 lg:space-y-8">
            {sidebarLinks.map(({ href, icon, label }, index) => (
              <Link
                href={href}
                key={index}
                onClick={handleSidebar}
                className={`${pathname === href ? "font-medium text-wheels-primary" : "text-wheels-secondary opacity-50 hover:text-wheels-primary hover:opacity-100"} flex items-center space-x-3 text-sm transition-colors duration-200 ease-in-out lg:space-x-4 lg:text-15 2xl:text-base 3xl:text-lg`}
              >
                {icon}
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3"
          >
            <LogoutIcon />
            <span className="text-sm text-wheels-error duration-200 ease-in-out hover:font-medium hover:transition-colors lg:text-15 2xl:text-base 3xl:text-lg">
              Logout
            </span>
          </button>
        </div>
      </aside>

      <div className="relative w-full lg:left-60 lg:w-[calc(100%-240px)] 2xl:left-80 2xl:w-[calc(100%-320px)] 3xl:left-1/3 3xl:w-[calc(100%-1/3)]">
        <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.10)] p-5 xl:px-10 3xl:px-16">
          <div className="relative">
            <span
              onClick={() => inputSearch.current.focus()}
              className="absolute left-0 top-[5px] opacity-50"
            >
              <MagnifyingGlassIcon />
            </span>
            <input
              ref={inputSearch}
              type="text"
              className="border-none pl-7 text-15 text-wheels-primary outline-none"
              placeholder="Search..."
            />
          </div>

          <div className="flex items-center space-x-4 lg:space-x-8">
            <Link
              href="/notifications"
              className="opacity-50 hover:opacity-100"
            >
              <BellIcon />
            </Link>

            <div className="lg:flex lg:items-center lg:space-x-3">
              <p className="hidden text-15 font-medium text-wheels-primary lg:block">
                Daniel Benson
              </p>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-wheels-primary">
                <span className="text-[13px] font-semibold leading-[0px] text-white">
                  A
                </span>
              </div>
            </div>

            <button className="flex h-6 w-6 items-center justify-center text-wheels-secondary lg:hidden">
              <span
                className={`${openSidebar && "hidden"}`}
                onClick={() => setOpenSidebar(true)}
              >
                <MenuIcon />
              </span>
              <span
                className={`text-xl font-medium ${!openSidebar && "hidden"}`}
              >
                X
              </span>
            </button>
          </div>
        </div>

        <main className="bg-[#F1F5F8] p-5 xl:px-10 xl:py-8 3xl:px-16 3xl:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
