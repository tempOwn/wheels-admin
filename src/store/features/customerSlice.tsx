import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCustomer } from "../types/customers";

const initialState: { customers: null | TCustomer[] } = { customers: null };
export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    getAllCustomers: (
      state,
      {
        payload: { customers },
      }: PayloadAction<{ customers: null | TCustomer[] }>,
    ) => {
      state.customers = customers;
    },
  },
});

export default customerSlice.reducer;
export const { getAllCustomers } = customerSlice.actions;
