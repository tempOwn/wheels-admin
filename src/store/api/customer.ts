import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./helper";
import {
  TCustomers,
  TGetAllCustomersDto,
  TGetAllCustomersResponse,
} from "../types/customers";

export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllCustomers: builder.query<TCustomers, TGetAllCustomersDto>({
      query: (params) => ({
        url: "/admin-customer/get-all-customers",
        method: "GET",
        params,
      }),
      transformResponse: (response: TGetAllCustomersResponse) => response.data,
    }),
  }),
});

export const { useGetAllCustomersQuery } = customerApi;
