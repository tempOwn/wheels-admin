import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import teamReducer from "./features/teamSlice";
import { authApi } from "./api/auth";
import { teamApi } from "./api/team";
import { ambassadorsApi } from "./api/ambassadors";
import { fileApi } from "./api/file";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    team: teamReducer,
    [authApi.reducerPath]: authApi.reducer,
    [teamApi.reducerPath]: teamApi.reducer,
    [ambassadorsApi.reducerPath]: ambassadorsApi.reducer,
    [fileApi.reducerPath]: fileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      teamApi.middleware,
      ambassadorsApi.middleware,
      fileApi.middleware,
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
