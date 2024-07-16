import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import teamReducer from "./features/teamSlice";
import customerReducer from "./features/customerSlice";
import { authApi } from "./api/auth";
import { teamApi } from "./api/team";
import { customerApi } from "./api/customer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    team: teamReducer,
    customer: customerReducer,
    [authApi.reducerPath]: authApi.reducer,
    [teamApi.reducerPath]: teamApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      teamApi.middleware,
      customerApi.middleware,
    ),
});
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
