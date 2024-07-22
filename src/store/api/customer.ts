import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./helper";
import {
  TCustomers,
  TgetAllCustomersDto,
  TgetAllCustomersResponse,
} from "../types/customers";

export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllCustomers: builder.query<TCustomers, TgetAllCustomersDto>({
      query: (params) => ({
        url: "/admin-customer/get-all-customers",
        method: "GET",
        params,
      }),
      transformResponse: (response: TgetAllCustomersResponse) => response.data,
    }),
  }),
});

export const { useGetAllCustomersQuery } = customerApi;
