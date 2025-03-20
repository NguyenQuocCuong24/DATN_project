import { newsManageApiRequest } from "@/apiRequests/news";
import { pageManageApiRequest } from "@/apiRequests/page";
import { KEY_QUERIES } from "@/constants/key-queries.const";
import { searchParamsNews } from "@/types/news.type";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateNewsMutation = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: newsManageApiRequest.createNews,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.NEWS],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};

export const useGetNewsPostSeoQuery = () => {
  return useQuery({
    queryKey: [KEY_QUERIES.PAGES],
    queryFn: async () => {
      return await pageManageApiRequest.getPageSeoByQueryParams({
        "data.type": "NEWS",
      });
    },
  });
};

export const useGetNewsQuery = (
  start: number,
  end: number,
  params: searchParamsNews,
  enable?: boolean
) => {
  return useQuery({
    queryKey: [KEY_QUERIES.NEWS, start, end, params],
    queryFn: () => newsManageApiRequest.getNews(start, end, params),
    enabled: enable,
  });
};

export const useGetNewsByIdQuery = (id: string | null) => {
  return useQuery({
    queryKey: [KEY_QUERIES.NEWS, id],
    queryFn: () => {
      return newsManageApiRequest.getNewsById(id as string);
    },
    enabled: Boolean(id),
  });
};
export const useUpdateNewsMutation = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: any }) =>
      newsManageApiRequest.updateNews(id, body),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.NEWS],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};

export const useDeleteNewsMutation = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => newsManageApiRequest.deleteNews(id),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.NEWS],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
