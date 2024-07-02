import { TUser } from "./user";

export type TLoginDto = {
  id: string;
  password: string;
};
export type TLoginResponse = {
  statusCode: number;
  message: string;
  success?: boolean;
  data: TUser;
};
export type TResetPasswordDto = {
  email: string;
};
export type TResetPasswordResponse = {
  otp: string;
};
export type TForgotPassword = {
  otp: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
