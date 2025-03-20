import { companyPolicyManageApiRequest } from "@/apiRequests/companyPolicy";
import { KEY_QUERIES } from "@/constants/key-queries.const";
import { searchParamsCompanyPolicy } from "@/types/companyPolicy.type";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateCompanyPolicyMutation = (
  onSuccessCallback?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: companyPolicyManageApiRequest.createCompanyPolicy,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.COMPANY_POLICY],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};

export const useGetcompanyPoliciesQuery = (
  start: number,
  end: number,
  params: searchParamsCompanyPolicy,
  enable?: boolean
) => {
  return useQuery({
    queryKey: [KEY_QUERIES.COMPANY_POLICY, start, end, params],
    queryFn: () =>
      companyPolicyManageApiRequest.getCompanyPolicies(start, end, params),
    enabled: enable,
  });
};

export const useGetCompanyPolicyByIdQuery = (id: string | null) => {
  return useQuery({
    queryKey: [KEY_QUERIES.COMPANY_POLICY, id],
    queryFn: () => {
      return companyPolicyManageApiRequest.getCompanyPolicyById(id as string);
    },
    enabled: Boolean(id),
  });
};
export const useUpdateCompanyPolicyMutation = (
  onSuccessCallback?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: any }) =>
      companyPolicyManageApiRequest.updateCompanyPolicy(id, body),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.COMPANY_POLICY],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};

export const useDeleteCompanyPolicyMutation = (
  onSuccessCallback?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      companyPolicyManageApiRequest.deleteCompanyPolicy(id),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.COMPANY_POLICY],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
