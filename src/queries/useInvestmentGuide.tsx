import { investmentGuideManageApiRequest } from "@/apiRequests/investmentGuide";
import { pageManageApiRequest } from "@/apiRequests/page";
import { KEY_QUERIES } from "@/constants/key-queries.const";
import { searchParamsInvestmentGuide } from "@/types/investmentGuide.type";

import { DataInvestmentGuideApiType } from "@/validations/investmentGuide.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateInvestmentGuideMutation = (
  onSuccessCallback?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: investmentGuideManageApiRequest.createInvestmentGuide,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.POST],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};

export const useGetInvestmentGuidePostSeoQuery = () => {
  return useQuery({
    queryKey: [KEY_QUERIES.PAGES],
    queryFn: async () => {
      return await pageManageApiRequest.getPageSeoByQueryParams({
        "data.type": "POST",
      });
    },
  });
};

export const useGetInvestmentGuidesQuery = (
  start: number,
  end: number,
  params: searchParamsInvestmentGuide,
  enable?: boolean
) => {
  return useQuery({
    queryKey: [KEY_QUERIES.POST, start, end, params],
    queryFn: () =>
      investmentGuideManageApiRequest.getInvestmentGuides(start, end, params),

    enabled: enable,
  });
};

export const useGetInvestmentGuideByIdQuery = (id: string | null) => {
  return useQuery({
    queryKey: [KEY_QUERIES.POST, id],
    queryFn: () => {
      return investmentGuideManageApiRequest.getInvestmentGuideById(
        id as string
      );
    },
    enabled: Boolean(id),
  });
};
export const useUpdateInvestmentGuideMutation = (
  onSuccessCallback?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: DataInvestmentGuideApiType;
    }) => investmentGuideManageApiRequest.updateInvestmentGuide(id, body),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.POST],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};

export const useDeleteInvestmentGuideMutation = (
  onSuccessCallback?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      investmentGuideManageApiRequest.deleteInvestmentGuide(id),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.POST],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
