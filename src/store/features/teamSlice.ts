import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  searchQuery: "",
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
    searchTeamMembers: (
      state,
      { payload: { searchQuery } }: PayloadAction<{ searchQuery: string }>,
    ) => {},
  },
});

export default teamSlice.reducer;
export const { getTeamMemberById, searchTeamMembers } = teamSlice.actions;
