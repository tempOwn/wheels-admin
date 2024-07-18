import { TApiDataResponse, TApiResponse } from "./generic";

export type TAmbassador = {
  createdAt: string;
  customersOnboarded: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  rentalsCompleted: number;
  updatedAt: string;
  _id: string;
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
