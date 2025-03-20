import { pageManageApiRequest } from "@/apiRequests/page";
import { KEY_QUERIES } from "@/constants/key-queries.const";
import { PageBodyReqType } from "@/validations/page.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreatePageSeoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: pageManageApiRequest.createPageSeo,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.PAGES],
        });
      }, 500);
    },
  });
};

export const useGetPageSeoQuery = (
  start: number,
  end: number,
  enable?: boolean
) => {
  return useQuery({
    queryKey: [KEY_QUERIES.PAGES, start, end],
    queryFn: async () => {
      return await pageManageApiRequest.getPageSeoByQueryParams({
        _start: start,
        _end: end,
        "data.type": "PAGE",
        "data.company": "TVAM",
      });
    },
    enabled: enable,
    staleTime: 0,
  });
};

export const useGetPageSeoByIdQuery = (id: string) => {
  return useQuery({
    queryKey: [KEY_QUERIES.PAGES, id],
    queryFn: () => pageManageApiRequest.getPageSeoById(id),
  });
};

export const useUpdatePageSeoMutation = () => {
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: Partial<PageBodyReqType>;
    }) => pageManageApiRequest.updatePageSeo(id, body),
  });
};

export const useDeletePageSeoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => pageManageApiRequest.deletePageSeo(id),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.PAGES],
        });
      }, 500);
    },
  });
};
