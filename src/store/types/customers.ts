import { TApiResponse } from "./generic";

export type TCustomer = {
  _id: string;
  firstName: string;
  email: string;
  lastName: string;
  phoneOrEmailVerified: boolean;
  role: string;
  address: string;
  status: "active" | "inactive";
  phoneNumber: string;
  gender: string;
  onBoardedBy: string;
  passportPhotograph: string;
  idCard: string;
  addressProof: string;
  createdAt: string;
  updatedAt: string;
  userUID: string;
  fullName: string;
  id: string;
};
