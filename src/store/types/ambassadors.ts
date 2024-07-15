import { TApiResponse } from "./generic";

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
