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
  rentalTotal: number;
  customerTotal: number;
  assetsReturnedTotal: number;
};

export type TGetCustomerStatsResponse = TApiResponse<TCustomerStats>;

export type TCustomerActivitiesDto = {
  id: string;
  search?: string;
  sort?: string;
  page?: number;
};

export type TCustomerActivities = {
  action: string;
  asset: string;
  rentalInfo: {
    _id: string;
    createdAt: string;
    isReturned: boolean;
    expectedReturnDate: string;
    rentalDate: string;
    rentalModel: string;
    customerName: string;
    customerPhoneNumber: string;
    assets: { _id: string; assetType: string; serialNo: string }[];
    updatedAt: string;
    ambassador: string;
    _v: number;
  };
  _id: string;
};

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

export type TGetCustomerByIdResponse = TApiResponse<{
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  idCard: [
    {
      _id: string;
      name: string;
      src: string;
      key: string;
      mimetype: string;
      size: number;
      createdAt: string;
      updatedAt: string;
      __v: number;
    },
  ];
  status: string;
  updatedAt: string;
  createdAt: string;
  role: string;
  address: string;
  totalCustomerRentals: number;
  energy_box: number;
  capsule: number;
  big_energy: number;
}>;
