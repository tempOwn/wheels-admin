import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./helper";
import {
  TAddTeamMemberDto,
  TAddTeamMemberResponse,
  TGetAllTeamMembersResponse,
} from "../types/team";
import { getAllTeamMembers } from "../features/teamSlice";

export const teamApi = createApi({
  reducerPath: "teamApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllTeamMembers: builder.mutation<TGetAllTeamMembersResponse, any>({
      query: () => ({
        url: "/admin-teams",
        method: "GET",
      }),
    }),
    addTeamMember: builder.mutation<TAddTeamMemberResponse, TAddTeamMemberDto>({
      query: (body) => ({
        url: "/admin-teams/add-team-member",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetAllTeamMembersMutation, useAddTeamMemberMutation } =
  teamApi;
