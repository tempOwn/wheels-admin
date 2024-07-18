export type TApiResponse<T> = {
  data: T;
  statusCode: number;
  message: string;
  success?: boolean;
};

export type TApiDataResponse<T> = {
  docs: T;
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
