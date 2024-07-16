import { RootState } from "..";

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCustomers = (state: RootState) => state.customer.customers;
