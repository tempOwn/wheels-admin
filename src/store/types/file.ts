import type { TApiResponse } from "./generic";

export type TFileUploadDto = {
  file: FormData;
};

export type TMultipleFileUploadDto = {
  files: FormData;
};

export type TFileUploadResponse = TApiResponse<string>;
export type TMultipleFileUploadResponse = TApiResponse<string[]>;
