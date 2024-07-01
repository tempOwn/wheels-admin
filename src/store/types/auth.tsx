export type TLoginDto = {
  email: string;
  password: string;
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
