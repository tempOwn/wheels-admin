"use client";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "../store/hooks";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getFromLocalStorage } from "../lib/storage";
import { WHEELS_ADMIN_TOKEN } from "../lib/constants";

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  // const currentUser = useSelector()
  const [authorised, setAuthorised] = useState<boolean>(false);
  const authToken = getFromLocalStorage(WHEELS_ADMIN_TOKEN);

  function authCheck(url: string) {
    const publicPath = ["/"];

    const path = url.split("?")[0];
  }
}
