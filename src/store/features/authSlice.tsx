import { createSlice } from "@reduxjs/toolkit";
import { WHEELS_ADMIN_USER, WHEELS_ADMIN_TOKEN } from "@/src/lib/constants";
import { getFromLocalStorage } from "@/src/lib/storage";
import { TUser } from "../types/user";
import { PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  user: null | TUser;
  token: null | string;
};

const initialState: AuthState = {
  user: getFromLocalStorage(WHEELS_ADMIN_USER)
    ? JSON.parse(getFromLocalStorage(WHEELS_ADMIN_USER) || "{}")
    : null,
  token: getFromLocalStorage(WHEELS_ADMIN_TOKEN)
    ? getFromLocalStorage(WHEELS_ADMIN_TOKEN)
    : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: any; token: string }>,
    ) => {
      state.user = user;
      state.token = token;
    },
    removeCredentials: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, removeCredentials } = authSlice.actions;
export default authSlice.reducer;
