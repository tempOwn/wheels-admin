import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./helper";
import type {
  TAddTeamMemberDto,
  TAddTeamMemberResponse,
  TGetAllTeamMembersDto,
  TGetAllTeamMembersResponse,
} from "../types/team";

export const teamApi = createApi({
  reducerPath: "teamApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["TeamMembers"],
  endpoints: (builder) => ({
    getAllTeamMembers: builder.query<
      TGetAllTeamMembersResponse["data"],
      TGetAllTeamMembersDto
    >({
      query: (params) => ({
        url: "/admin-teams",
        method: "GET",
        params,
      }),
      providesTags: ["TeamMembers"],
      transformResponse: (response: TGetAllTeamMembersResponse) =>
        response.data,
    }),
    addTeamMember: builder.mutation<TAddTeamMemberResponse, TAddTeamMemberDto>({
      query: (body) => ({
        url: "/admin-teams/add-team-member",
        method: "POST",
        body,
      }),
      invalidatesTags: ["TeamMembers"],
    }),
  }),
});

export const { useGetAllTeamMembersQuery, useAddTeamMemberMutation } = teamApi;
