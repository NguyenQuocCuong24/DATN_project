import { mediaApiRequest } from "@/apiRequests/upload";
import { useMutation } from "@tanstack/react-query";

export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: mediaApiRequest.uploadImages,
  });
};

export const useUploadFileMutation = () => {
  return useMutation({
    mutationFn: mediaApiRequest.uploadFile,
  });
};
