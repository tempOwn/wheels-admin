import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WHEELS_ADMIN_USER, WHEELS_ADMIN_TOKEN } from "@/src/lib/constants";
import { getFromLocalStorage } from "@/src/lib/storage";
import { TUser } from "../types/user";

const parseJSON = (value: string | null) => {
  try {
    return value ? JSON.parse(value) || "{}" : null;
  } catch (error) {
    return null;
  }
};

type AuthState = {
  user: null | TUser;
  token: null | string;
};

const initialState: AuthState = {
  user: parseJSON(getFromLocalStorage(WHEELS_ADMIN_USER)),
  token: parseJSON(getFromLocalStorage(WHEELS_ADMIN_TOKEN)),
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

export default authSlice.reducer;
export const { setCredentials, removeCredentials } = authSlice.actions;