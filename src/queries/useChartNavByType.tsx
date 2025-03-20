import { chartNavByTypeManageApiRequest } from "@/apiRequests/chart-nav-by-type";
import { KEY_QUERIES } from "@/constants/key-queries.const";
import { searchParamsChartNavByType } from "@/types/chartNavByType.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetListDataChartNavByTypesQuery = (
  start: number,
  end: number,
  params: searchParamsChartNavByType,
  enable?: boolean
) => {
  return useQuery({
    queryKey: [KEY_QUERIES.CHART_NAV_BY_TYPE, start, end, params],
    queryFn: () =>
      chartNavByTypeManageApiRequest.getListDataChartNavByTypes(
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
      return chartNavByTypeManageApiRequest.getDataChartNavByTypeById(
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
      chartNavByTypeManageApiRequest.updateDataChartNavByType(id, body),
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
