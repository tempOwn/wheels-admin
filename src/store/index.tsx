import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import teamReducer from "./features/teamSlice";
import { authApi } from "./api/auth";
import { teamApi } from "./api/team";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    team: teamReducer,
    [authApi.reducerPath]: authApi.reducer,
    [teamApi.reducerPath]: teamApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
