import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./helper";
import type {
  TFileUploadDto,
  TFileUploadResponse,
  TMultipleFileUploadResponse,
  TMultipleFileUploadDto,
} from "../types/file";

export const fileApi = createApi({
  reducerPath: "fileApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    uploadSingleFile: builder.mutation<
      TFileUploadResponse["data"],
      TFileUploadDto
    >({
      query: ({ file }) => ({
        url: "/file/upload",
        method: "POST",
        body: file,
      }),
      transformResponse: (response: TFileUploadResponse) => response.data,
    }),
    uploadMultipleFiles: builder.mutation<
      TMultipleFileUploadResponse["data"],
      TMultipleFileUploadDto
    >({
      query: ({ files }) => ({
        url: "/file/uploads",
        method: "POST",
        body: files,
      }),
      transformResponse: (response: TMultipleFileUploadResponse) =>
        response.data,
    }),
  }),
});

export const { useUploadSingleFileMutation, useUploadMultipleFilesMutation } =
  fileApi;
