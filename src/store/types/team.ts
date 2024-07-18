export interface TGetAllTeamMembersResponse {
  data: TTeamMembers;
  message: string;
  statusCode: number;
  success: boolean;
}

export type TTeamMembers = {
  docs: TTeamMember[];
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

export type TAddTeamMemberDto = {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  address: string;
  phoneNumber: string;
  gender: string;
  nin: string;
};

export type TAddTeamMemberResponse = {
  status: number;
  message: {
    message: [string];
    error: string;
    statusCode: number;
  };
  timeStamp: string;
};

export type TTeamMember = {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  address: string;
  status:
    | "active"
    | "inactive"
    | "rented-out"
    | "returned"
    | "available"
    | "faulty";
  phoneNumber: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  userUID: string;
  phoneOrEmailVerified: boolean;
  fullName: string;
  id: string;
};
