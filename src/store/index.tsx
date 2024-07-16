import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import customerReducer from "./features/customerSlice";
import { customerApi } from "./api/customer";
import { authApi } from "./api/auth";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    [authApi.reducerPath]: authApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, customerApi.middleware),
});
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
