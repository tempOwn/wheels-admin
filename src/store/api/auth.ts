import { createApi } from "@reduxjs/toolkit/query/react";
import { TLoginDto, TLoginResponse } from "../types/auth";
import { baseQueryWithReauth } from "./helper";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<TLoginResponse, TLoginDto>({
      query: (body) => ({
        url: "/admin-auth/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
