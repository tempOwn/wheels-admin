import { TApiDataResponse, TApiResponse } from "./generic";

export type TAmbassador = {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  address: string;
  status: "active" | "inactive";
  phoneNumber: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  userUID: string;
  phoneOrEmailVerified: boolean;
  fullName: string;
  id: string;
};

export type TAmbassadorsStatsResponse = TApiResponse<{
  ambasssadorTotal: number;
  rentalTotal: number;
  customerTotal: number;
}>;

export type TAmbassadorsListDto = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  populate?: string;
};

export type TAmbassadorsListResponse = TApiResponse<
  TApiDataResponse<TAmbassador[]>
>;
