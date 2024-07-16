import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./helper";
import type { TAmbassadorsStatsResponse } from "../types/ambassadors";

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
  }),
});

export const { useGetAmbassadorsStatsQuery } = ambassadorsApi;
