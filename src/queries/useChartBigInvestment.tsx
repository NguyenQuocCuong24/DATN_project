import { ChartBigInvestmentManageApiRequest } from "@/apiRequests/chart_big_investment";
import { KEY_QUERIES } from "@/constants/key-queries.const";
import { searchParamsChartBigInvestment } from "@/types/chartBigInvestment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetListDataChartBigInvestmentQuery = (
  start: number,
  end: number,
  params: searchParamsChartBigInvestment,
  enable?: boolean
) => {
  return useQuery({
    queryKey: [KEY_QUERIES.CHART_BIG_BY_TYPE, start, end, params],
    queryFn: () =>
      ChartBigInvestmentManageApiRequest.getListDataChartBigInvestment(
        start,
        end,
        params
      ),
    enabled: enable,
  });
};

export const useGetDataChartBigByTypeByIdQuery = (id: string | null) => {
  return useQuery({
    queryKey: [KEY_QUERIES.CHART_BIG_BY_TYPE, id],
    queryFn: () => {
      return ChartBigInvestmentManageApiRequest.getDataChartBigInvestmentById(
        id as string
      );
    },
    enabled: Boolean(id),
  });
};
export const useUpdateChartBigMutation = (
  onSuccessCallback?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: any }) =>
      ChartBigInvestmentManageApiRequest.updateDataChartBigInvestment(id, body),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.CHART_BIG_BY_TYPE],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
