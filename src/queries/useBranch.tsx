import { KEY_QUERIES } from "@/constants/key-queries.const";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { searchParamsBranch } from "@/types/branch.type";
import { branchManageApiRequest } from "./../apiRequests/branch";
import { DataBranchType } from "@/validations/branch.schema";

export const useCreateBranchMutation = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: branchManageApiRequest.createBranchs,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.BRANCH],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};

export const useGetBranchsQuery = (
  start: number,
  end: number,
  params: searchParamsBranch,
  enable?: boolean
) => {
  return useQuery({
    queryKey: [KEY_QUERIES.BRANCH, start, end, params],
    queryFn: () => branchManageApiRequest.getBranchs(start, end, params),
    enabled: enable,
  });
};

export const useGetBranchByIdQuery = (id: string | null) => {
  return useQuery({
    queryKey: [KEY_QUERIES.BRANCH, id],
    queryFn: () => {
      return branchManageApiRequest.getBranchById(id as string);
    },
    enabled: Boolean(id),
  });
};
export const useUpdateBranchMutation = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: DataBranchType }) =>
      branchManageApiRequest.updateBranch(id, body),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.BRANCH],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};

export const useDeleteBranchMutation = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => branchManageApiRequest.deleteBranch(id),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.BRANCH],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
