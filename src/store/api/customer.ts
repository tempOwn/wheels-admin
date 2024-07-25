import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./helper";
import {
  TCustomers,
  TCustomerStats,
  TEditCustomersDto,
  TGetAllCustomersDto,
  TGetAllCustomersResponse,
  TGetCustomerStatsResponse,
} from "../types/customers";

export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getCustomersStats: builder.mutation<TCustomerStats, any>({
      query: () => ({
        url: "admin-customer/get-customer-stats",
        method: "GET",
      }),
      transformResponse: (response: TGetCustomerStatsResponse) => response.data,
    }),
    getAllCustomers: builder.query<TCustomers, TGetAllCustomersDto>({
      query: (params) => ({
        url: "/admin-customer/get-all-customers",
        method: "GET",
        params,
      }),
      transformResponse: (response: TGetAllCustomersResponse) => response.data,
    }),
    getCustomerActivities: builder.query<TCustomerStats, any>({
      query: () => ({
        url: "admin-customer/get-customer-activities",
        method: "GET",
      }),
      transformResponse: (response: TGetCustomerStatsResponse) => response.data,
    }),
    getRental: builder.mutation<string, any>({
      query: (id) => ({
        url: `admin-customer/get-rental/${id}`,
        method: "GET",
      }),
    }),
    getCustomerById: builder.mutation<string, any>({
      query: (id) => ({
        url: `admin-customer/${id}`,
        method: "GET",
        id,
      }),
    }),
    addCustomer: builder.mutation<string, any>({
      query: (body) => ({
        url: "admin-customer/create-customer",
        method: "GET",
        body,
      }),
    }),
    editCustomer: builder.mutation<TEditCustomersDto, any>({
      query: (body) => ({
        url: `admin-customer/edit-customer/${body.id}`,
        method: "GET",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllCustomersQuery,
  useAddCustomerMutation,
  useEditCustomerMutation,
  useGetCustomerActivitiesQuery,
  useGetCustomerByIdMutation,
  useGetCustomersStatsMutation,
  useGetRentalMutation,
} = customerApi;
