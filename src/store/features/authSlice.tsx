import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WHEELS_ADMIN_USER, WHEELS_ADMIN_TOKEN } from "@/src/lib/constants";
import { getFromLocalStorage } from "@/src/lib/storage";

const initialState = {
  user: getFromLocalStorage(WHEELS_ADMIN_USER)
    ? JSON.parse(getFromLocalStorage(WHEELS_ADMIN_USER) || "{}")
    : null,
  token: getFromLocalStorage(WHEELS_ADMIN_TOKEN)
    ? JSON.parse(getFromLocalStorage(WHEELS_ADMIN_TOKEN) || "{}")
    : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, token },
      }: PayloadAction<{ user: string; token: string }>,
    ) => {
      state.user = user;
      state.token = token;
    },
    removeCredentials: (state) => {
      state.user = "";
      state.token = "";
    },
  },
});
export default authSlice.reducer;
export const { setCredentials, removeCredentials } = authSlice.actions;
