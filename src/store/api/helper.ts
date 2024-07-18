import { toast } from "sonner";
import { Mutex } from "async-mutex";
import { RootState } from "..";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WHEELS_ADMIN_TOKEN, WHEELS_ADMIN_USER } from "@/src/lib/constants";
import { removeFromLocalStorage } from "@/src/lib/storage";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

const publicUrl = process.env.NEXT_PUBLIC_BASE_URL;
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: publicUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        //redirect to login page
        if (typeof window !== "undefined") {
          window.location.href = "/";
          removeFromLocalStorage(WHEELS_ADMIN_TOKEN);
          removeFromLocalStorage(WHEELS_ADMIN_USER);
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const handleApiErrors = (err: any, callback?: () => void) => {
  if (err && err.data?.message) {
    const errorMessage = err.data.message || "Unable to complete operation";
    toast.error(errorMessage, callback && { onAutoClose: callback });
  } else {
    toast.error(
      "Unable to complete operation",
      callback && { onAutoClose: callback },
    );
  }
};

export const handleApiSuccessResponse = (
  response: any,
  callback?: () => void,
) => {
  const successMessage = response.message || "Operation completed successfully";

  toast.success(successMessage, callback && { onAutoClose: callback });
};
