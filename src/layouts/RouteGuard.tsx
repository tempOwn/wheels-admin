"use client";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "../store/hooks";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getFromLocalStorage, removeFromLocalStorage } from "../lib/storage";
import { WHEELS_ADMIN_TOKEN, WHEELS_ADMIN_USER } from "../lib/constants";
import { removeCredentials } from "../store/features/authSlice";
import { selectCurrentUser } from "../store/selectors";

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [authorized, setAuthorized] = useState<boolean>(false);
  const authToken = getFromLocalStorage(WHEELS_ADMIN_TOKEN);

  function authCheck(url: string) {
    const publicPath = ["/"];

    const path = url.split("?")[0];
    if (authToken) {
      const decodedToken = JSON.parse(window.atob(authToken.split(".")[1]));
      if (decodedToken.exp * 1000 < Date.now() && !publicPath.includes(path)) {
        setAuthorized(false);
        dispatch(removeCredentials());
        [WHEELS_ADMIN_USER, WHEELS_ADMIN_TOKEN].forEach((key) =>
          removeFromLocalStorage(key),
        );

        router.push("/");
      }
    }
    if (!currentUser && !publicPath.includes(path)) {
      setAuthorized(false);
      dispatch(removeCredentials());
      console.log(currentUser);
      console.log(!publicPath.includes(path));
      router.push("/");
    } else {
      setAuthorized(true);
    }
  }
  useEffect(() => {
    // on initial load - run auth check
    authCheck(pathname);
  }, []);

  return authorized && children;
}
