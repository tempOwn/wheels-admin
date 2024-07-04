"use client";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/src/store/selectors";

export const getUserInfo = (info: string) => {
  const currentUser = useSelector(selectCurrentUser);

  const firstName =
    currentUser &&
    currentUser.firstName[0].toUpperCase() + currentUser.firstName.slice(1);

  const lastName =
    currentUser &&
    currentUser.lastName[0].toUpperCase() + currentUser.lastName.slice(1);

  const fullName = firstName + " " + lastName;
  const email = currentUser?.email;
  const phoneNumber = currentUser?.phoneNumber;
  const address = currentUser?.address;
  const userUID = currentUser?.userUID;
  const role = currentUser?.role;

  switch (info) {
    case "firstName":
      return firstName;
      break;
    case "fullName":
      return fullName;
      break;
    case "email":
      return email;
      break;
    case "phoneNumber":
      return phoneNumber;
      break;
    case "role":
      return role;
      break;
    case "userUID":
      return userUID;
      break;
    case "address":
      return address;
      break;
    default:
      break;
  }
};
