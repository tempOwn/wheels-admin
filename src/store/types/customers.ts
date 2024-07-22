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
