import { TApiResponse } from "./generic";

export type TGetAllCustomersResponse = TApiResponse<TCustomers>;

export type TGetAllCustomersDto = {
  search?: string;
  page?: number;
  sort?: string;
};

export type TCustomers = {
  docs: TCustomer[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  offset: number;
  page: number;
  pagingCounter: number;
  prevPage: number | null;
  totalDocs: number;
  totalPages: number;
};

export type TCustomer = {
  _id: string;
  firstName: string;
  email: string;
  lastName: string;
  status: "active" | "inactive";
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  userUID: string;
  ambassador: [
    {
      _id: string;
      firstName: string;
      email: string;
      lastName: string;
      phoneOrEmailVerified: boolean;
      role: string;
      address: string;
      status: string;
      phoneNumber: string;
      gender: string;
      password: string;
      createdAt: string;
      updatedAt: string;
      userUID: string;
      __v: number;
    },
  ];
  rentalsMade: number;
  energy_box: number;
  capsule: number;
  big_energy: number;
};

export type TCustomerStats = {
  rentalTotal: 3;
  customerTotal: 6;
  assetsReturnedTotal: 0;
};

export type TGetCustomerStatsResponse = TApiResponse<TCustomerStats>;

export type TCustomerActivitiesDto = {
  id: string;
  search?: string;
  sort?: string;
  page?: number;
};

export type TCustomerActivities = {};

export type TGetCustomerActivitiesResponse = TApiResponse<{
  docs?: TCustomerActivities[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  offset?: number;
  prevPage?: number;
  nextPage?: number;
}>;

export type TAddCustomersDto = {
  addressProof: string;
  idCard: string;
  passportPhotograph: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumber: string;
  gender: string;
  role: string;
  nin: string;
};

export type TEditCustomersDto = {
  idCard: string;
  addressProof: string;
  passportPhotograph: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumber: string;
  gender: string;
};

export type TAddCustomerResponse = TApiResponse<{}>;
