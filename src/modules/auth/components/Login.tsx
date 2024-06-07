import Image from "next/image";
import CoverImage from "@/public/assets/images/login-cover-image.png";
import Link from "next/link";

export default function Login() {
  return (
    <div className="align-center flex h-[100vh] w-full">
      <div className="hidden w-3/5 md:block lg:block">
        <Image className="h-full w-full" src={CoverImage} alt="Cover Image" />
      </div>
      <div className="flex w-full flex-col items-center justify-between px-4 py-8 md:w-2/5 lg:w-2/5 lg:px-10">
        <div className="w-full">
          <div className="flex w-full flex-col items-center">
            <div className="flex items-end space-x-2">
              <h1 className="text-5xl font-bold text-wheels-primary md:text-5xl lg:text-7xl">
                Wheels
              </h1>
              <sub className="rounded-full bg-wheels-grey px-2 py-2"></sub>
            </div>
            <h2 className="mt-5 text-xl font-bold text-wheels-primary lg:text-3xl">
              Sign in for free
            </h2>
          </div>
          <div className="mt-10 flex flex-col items-end space-y-4">
            <form className=" flex w-full flex-col items-center space-y-2 px-2">
              <label className="flex w-full flex-col items-start space-y-2">
                <span className="text-sm text-wheels-grey">Email Address</span>
                <input
                  className="w-full rounded-lg border px-2 py-4 text-sm "
                  type="email"
                  placeholder="jonsnow@gmail.com"
                />
              </label>
              <label className="flex w-full flex-col items-start space-y-2">
                <span className="text-sm text-wheels-grey">Password</span>
                <input
                  className="w-full rounded-lg border px-2 py-4 text-sm "
                  type="password"
                  placeholder="Password"
                />
              </label>
            </form>
            <button className="text-sm text-wheels-grey">
              Forgot Password ?
            </button>
          </div>
        </div>
        <div className=" mt-10 flex w-full flex-col items-center space-y-4 text-wheels-grey">
          <div className="text-sm">
            <p className="text-center ">
              You acknowledge that you read and agree to our
            </p>
            <div className="text-center">
              <Link className="font-medium text-wheels-grey-3" href="">
                Terms of Service
              </Link>{" "}
              and our{" "}
              <Link className="font-medium text-wheels-grey-3" href="">
                Privacy Policy
              </Link>
            </div>
          </div>
          <button className="w-full rounded-sm bg-wheels-primary px-10 py-4 text-white">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
