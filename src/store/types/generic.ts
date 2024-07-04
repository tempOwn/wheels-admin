export type TApiResponse<T> = {
  data: T;
  statusCode: number;
  message: string;
  success?: boolean;
};
