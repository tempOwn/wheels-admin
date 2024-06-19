"use client";
import Image from "next/image";
import CoverImage from "@/public/assets/images/login-cover-image.png";
import UnlockIcon from "@/src/components/icons/UnlockIcon";
import { useState } from "react";

export function ResetPassword() {
  const [isValid, setIsValid] = useState<boolean>(true);
  const [error, setError] = useState({
    currentField: "",
    newField: "",
    confirmField: "",
  });
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const saveUserData = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formValidation = (e: any) => {
    e.preventDefault();
    let valid = true;

    if (formData.currentPassword === "") {
      valid = false;
      error.currentField = "Old Password is required";
    } else if (formData.newPassword === "") {
      valid = false;
      error.newField = "New Password is required";
    } else if (formData.newPassword.length < 8) {
      valid = false;
      error.newField = "Password should be more than 8 characters";
      formData.newPassword = "";
    } else if (formData.confirmNewPassword === "") {
      valid = false;
      error.confirmField = "Confirmation Password is required";
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      valid = false;
      error.newField = "Passwords do not match";
      error.confirmField = "Passwords do not match";
    }
    setIsValid(valid);
    setTimeout(() => {
      setError({
        currentField: "",
        newField: "",
        confirmField: "",
      });
    }, 5000);
  };

  return (
    <div className="align-center flex h-[100vh] w-full">
      <div className="hidden w-3/5 md:block lg:block">
        <Image className="h-full w-full" src={CoverImage} alt="Cover Image" />
      </div>
      <div className=" flex w-full flex-col items-center px-4 py-8 md:w-2/5 lg:w-2/5 lg:px-10">
        <h1 className="mb-6 text-4xl font-bold text-wheels-primary">
          Reset Password
        </h1>
        <span>
          <UnlockIcon />
        </span>
        <p className="my-5 text-xs">
          Please enter your new password twice to ensure that they match
        </p>
        <form
          onSubmit={formValidation}
          className=" flex h-full w-full flex-col items-center justify-between px-2 lg:w-[80%]">
          <div className="flex w-full flex-col items-center space-y-2">
            <label className="flex w-full flex-col items-start space-y-2">
              <span className="text-xs text-wheels-grey">Current Password</span>
              <input
                name="currentPassword"
                className={`${error.currentField ? "placeholder-red border-[2px] border-red-500" : ""} w-full rounded-lg border p-2 text-sm`}
                onChange={saveUserData}
                type="password"
                placeholder={error.currentField || "Current Password"}
              />
            </label>
            <label className="flex w-full flex-col items-start space-y-2">
              <span className="text-xs text-wheels-grey">New Password</span>
              <input
                name="newPassword"
                className={`${error.newField ? "placeholder-red border-[2px] border-red-500" : ""} w-full rounded-lg border p-2 text-sm`}
                onChange={saveUserData}
                type="password"
                placeholder={error.newField || "New Password"}
              />
            </label>
            <label className="flex w-full flex-col items-start space-y-2">
              <span className="text-xs text-wheels-grey">
                Re-enter New Password
              </span>
              <input
                name="confirmNewPassword"
                className={`${error.confirmField ? "placeholder-red border-[2px] border-red-500" : ""} w-full rounded-lg border p-2 text-sm`}
                type="password"
                onChange={saveUserData}
                placeholder={error.confirmField || "Confirm New Password"}
              />
            </label>
          </div>
          <button
            className={`${isValid ? "bg-white text-wheels-primary" : "bg-wheels-primary text-white"} text-semibold w-full rounded-lg border-[1px] border-wheels-primary px-10 py-4`}
            type="submit">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
