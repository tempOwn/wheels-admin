import { RootState } from "..";
import { TTeamMembers } from "../types/team";

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectTeamMembers = (state: RootState): TTeamMembers | null =>
  state.team.teamMembers;
export const selectCustomers = (state: RootState) => state.customer.customers;
