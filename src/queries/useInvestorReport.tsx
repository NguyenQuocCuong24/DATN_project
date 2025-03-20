import { investorReportManageApiRequest } from "@/apiRequests/investor-report";
import { KEY_QUERIES } from "@/constants/key-queries.const";
import { searchParamsInvestorReport } from "@/types/investorReport.type";
import { DataInvestorReportInput } from "@/validations/investorReport.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateInvestorReportMutation = (
  onSuccessCallback?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: investorReportManageApiRequest.createInvestorReport,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.INVESTOR_REPORT],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};

export const useGetInvestorReportsQuery = (
  start: number,
  end: number,
  params: searchParamsInvestorReport,
  enable?: boolean
) => {
  return useQuery({
    queryKey: [KEY_QUERIES.INVESTOR_REPORT, start, end, params],
    queryFn: () =>
      investorReportManageApiRequest.getInvestorReports(start, end, params),

    enabled: enable,
  });
};

export const useGetInvestorReportByIdQuery = (id: string | null) => {
  return useQuery({
    queryKey: [KEY_QUERIES.INVESTOR_REPORT, id],
    queryFn: () => {
      return investorReportManageApiRequest.getInvestorReportById(id as string);
    },
    enabled: Boolean(id),
  });
};
export const useUpdateInvestorReportMutation = (
  onSuccessCallback?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: DataInvestorReportInput }) =>
      investorReportManageApiRequest.updateInvestorReport(id, body),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.INVESTOR_REPORT],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};

export const useDeleteInvestorReportMutation = (
  onSuccessCallback?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      investorReportManageApiRequest.deleteInvestorReport(id),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.INVESTOR_REPORT],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
