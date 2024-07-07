import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TGetAllTeamMembersResponse,
  TTeamMember,
  TTeamMembers,
} from "../types/team";

interface TeamState {
  id: string;
  teamMembers: TTeamMembers | null;
}
const initialState: TeamState = {
  id: "",
  teamMembers: null,
};

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    getTeamMemberById: (
      state,
      { payload: { id } }: PayloadAction<{ id: string }>,
    ) => {
      state.id = id;
    },
    getAllTeamMembers: (
      state,
      {
        payload: { teamMembers },
      }: PayloadAction<{
        teamMembers: null | TTeamMembers;
      }>,
    ) => {
      state.teamMembers = teamMembers;
    },
  },
});

export default teamSlice.reducer;
export const { getTeamMemberById, getAllTeamMembers } = teamSlice.actions;
