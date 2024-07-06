import { type } from "os";
import { TApiResponse } from "./generic";

export type TAddTeamMemberDto = {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumber: string;
  gender: string;
  role: string;
  nin: string;
};
export type TAddTeamMemberResponse = TApiResponse<{}>;

export type TGetTeamMemberById = {
  id: string;
};
export type TGetTeamMemberByIdResponse = TApiResponse<{}>;

export type TGetAllTeamMembers = {
  search: string;
  sort: Array<[string]>;
  populate: Array<[string]>;
  offSet: number;
  limit: number;
  page: number;
  role: string;
  status: string;
};
