import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./helper";
import type {
  TAmbassadorsListDto,
  TAmbassadorsListResponse,
  TAmbassadorsStatsResponse,
} from "../types/ambassadors";

export const ambassadorsApi = createApi({
  reducerPath: "ambassadorsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAmbassadorsStats: builder.query<TAmbassadorsStatsResponse["data"], void>(
      {
        query: () => ({
          url: "/admin-ambassador/get-ambassador-stats",
          method: "GET",
        }),
        transformResponse: (response: TAmbassadorsStatsResponse) =>
          response.data,
      },
    ),
    getAmbassadors: builder.query<
      TAmbassadorsListResponse["data"],
      TAmbassadorsListDto
    >({
      query: (params) => ({
        url: "/admin-ambassador/get-all-ambassador",
        method: "GET",
        params,
      }),
      transformResponse: (response: TAmbassadorsListResponse) => response.data,
    }),
  }),
});

export const { useGetAmbassadorsStatsQuery, useGetAmbassadorsQuery } =
  ambassadorsApi;
