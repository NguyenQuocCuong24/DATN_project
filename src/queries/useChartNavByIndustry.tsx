import { chartNavByIndustryManageApiRequest } from "@/apiRequests/chart-nav_by_industry";
import { KEY_QUERIES } from "@/constants/key-queries.const";
import { searchParamsChartNavByType } from "@/types/chartNavByType.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetListDataChartNavByIndustryQuery = (
  start: number,
  end: number,
  params: searchParamsChartNavByType,
  enable?: boolean
) => {
  return useQuery({
    queryKey: [KEY_QUERIES.CHART_NAV_BY_TYPE, start, end, params],
    queryFn: () =>
      chartNavByIndustryManageApiRequest.getListDataChartNavByIndustry(
        start,
        end,
        params
      ),
    enabled: enable,
  });
};

export const useGetDataChartNavByTypeByIdQuery = (id: string | null) => {
  return useQuery({
    queryKey: [KEY_QUERIES.CHART_NAV_BY_TYPE, id],
    queryFn: () => {
      return chartNavByIndustryManageApiRequest.getDataChartNavByIndustryById(
        id as string
      );
    },
    enabled: Boolean(id),
  });
};
export const useUpdateChartNavByTypeMutation = (
  onSuccessCallback?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: any }) =>
      chartNavByIndustryManageApiRequest.updateDataChartNavByIndustry(id, body),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.CHART_NAV_BY_TYPE],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
