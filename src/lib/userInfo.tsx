"use client";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/src/store/selectors";

export const useUserInfo = (infoType: "fullName" | "firstName") => {
  const currentUser = useSelector(selectCurrentUser);

  const getFormattedName = (name: string) => {
    return name[0].toUpperCase() + name.slice(1);
  };

  const firstName = currentUser
    ? getFormattedName(currentUser.firstName)
    : null;
  const lastName = currentUser ? getFormattedName(currentUser.lastName) : null;
  const fullName = firstName && lastName ? `${firstName} ${lastName}` : null;

  const userInfo = {
    firstName,
    fullName,
    email: currentUser?.email,
    phoneNumber: currentUser?.phoneNumber,
    address: currentUser?.address,
    userUID: currentUser?.userUID,
    role: currentUser?.role,
  };

  return userInfo[infoType] || "";
};
