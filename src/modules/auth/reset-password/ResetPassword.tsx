import Image from "next/image";
import CoverImage from "@/public/assets/images/login-cover-image.png";
import UnlockIcon from "@/src/components/icons/UnlockIcon";

export function ResetPassword() {
  return (
    <div className="align-center flex h-[100vh] w-full">
      <div className="hidden w-3/5 md:block lg:block">
        <Image className="h-full w-full" src={CoverImage} alt="Cover Image" />
      </div>
      <div className=" flex w-full flex-col items-center px-4 py-8 md:w-2/5 lg:w-2/5 lg:px-10">
        <h1 className="text-4xl font-bold text-wheels-primary">
          Reset Password
        </h1>
        <span>
          <UnlockIcon />
        </span>
        <p className="text-xs">
          Please enter your new password twice to ensure that they match
        </p>
        <form className=" flex w-full flex-col items-center justify-between px-2">
          <div className="flex w-full flex-col items-center space-y-2">
            <label className="flex w-full flex-col items-start space-y-2">
              <span className="text-xs text-wheels-grey">Current Password</span>
              <input
                className="w-full rounded-lg border p-2 text-sm "
                type="password"
              />
            </label>
            <label className="flex w-full flex-col items-start space-y-2">
              <span className="text-xs text-wheels-grey">New Password</span>
              <input
                className="w-full rounded-lg border p-2 text-sm "
                type="password"
              />
            </label>
            <label className="flex w-full flex-col items-start space-y-2">
              <span className="text-xs text-wheels-grey">
                Re-enter New Password
              </span>
              <input
                className="w-full rounded-lg border p-2 text-sm "
                type="password"
              />
            </label>
          </div>
          <button className="text-semibold w-full rounded-lg border-wheels-primary bg-white px-10 py-4 text-wheels-primary">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
