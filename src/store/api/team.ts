import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./helper";
import {
  TAddTeamMemberDto,
  TAddTeamMemberResponse,
  TGetTeamMemberById,
  TGetTeamMemberByIdResponse,
} from "../types/team";

export const teamApi = createApi({
  reducerPath: "teamApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getTeamMemberById: builder.query<
      TGetTeamMemberByIdResponse,
      TGetTeamMemberById
    >({
      query: (id) => ({
        url: `/admin-teams/${id}`,
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

export const { useGetTeamMemberByIdQuery, useAddTeamMemberMutation } = teamApi;
