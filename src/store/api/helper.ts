import { toast } from "sonner";

export const handleApiErrors = (err: any, callback?: () => void) => {
  if (err && err.data?.message) {
    const errorMessage = err.data.message || "Unable to complete operation";
    toast.error(errorMessage, callback && { onAutoClose: callback });
  } else {
    toast.error(
      "Unable to complete operation",
      callback && { onAutoClose: callback },
    );
  }
};

export const handleApiSuccessResponse = (
  response: any,
  callback?: () => void,
) => {
  const successMessage = response.message || "Operation completed successfully";

  toast.success(successMessage, callback && { onAutoClose: callback });
};
