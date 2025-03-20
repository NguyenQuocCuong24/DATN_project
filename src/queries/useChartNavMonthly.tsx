import { chartNavMonthlyManageApiRequest } from "@/apiRequests/chart-nav-monthly";
import { KEY_QUERIES } from "@/constants/key-queries.const";
import { searchParamsChartNavMonthly } from "@/types/chartNavMonthly.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetListDataChartNavMonthlysQuery = (
  start: number,
  end: number,
  params: searchParamsChartNavMonthly,
  enable?: boolean
) => {
  return useQuery({
    queryKey: [KEY_QUERIES.CHART_NAV_MONTHLY, start, end, params],
    queryFn: () =>
      chartNavMonthlyManageApiRequest.getListDataChartNavMonthlys(
        start,
        end,
        params
      ),
    enabled: enable,
  });
};

export const useGetByIdQuery = (id: string | null) => {
  return useQuery({
    queryKey: [KEY_QUERIES.CHART_NAV_MONTHLY, id],
    queryFn: () => {
      return chartNavMonthlyManageApiRequest.getDataChartNavMonthlyById(
        id as string
      );
    },
    enabled: Boolean(id),
  });
};
export const useUpdateChartNavMonthlyMutation = (
  onSuccessCallback?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: any }) =>
      chartNavMonthlyManageApiRequest.updateDataChartNavMonthly(id, body),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.CHART_NAV_MONTHLY],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
