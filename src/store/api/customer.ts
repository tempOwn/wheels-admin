import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./helper";
import { getAllCustomersResponse } from "../types/customers";

export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllCustomers: builder.mutation<getAllCustomersResponse, any>({
      query: ({ search, page }) => ({
        url: "/admin-customer/get-all-customers",
        method: "GET",
        params: { search, page },
      }),
    }),
  }),
});

export const { useGetAllCustomersMutation } = customerApi;
