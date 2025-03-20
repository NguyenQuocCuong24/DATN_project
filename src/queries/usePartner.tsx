import { partnerManageApiRequest } from "@/apiRequests/partner";
import { KEY_QUERIES } from "@/constants/key-queries.const";
import { searchParamsPartner } from "@/types/partner.type";
import { DataPartnerType } from "@/validations/partner.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreatePartnerMutation = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: partnerManageApiRequest.createPartner,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.PARTNER],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};

export const useGetPartnersQuery = (
  start: number,
  end: number,
  params: searchParamsPartner,
  enable?: boolean
) => {
  return useQuery({
    queryKey: [KEY_QUERIES.PARTNER, start, end, params],
    queryFn: () => partnerManageApiRequest.getPartners(start, end, params),

    enabled: enable,
  });
};

export const useGetPartnerByIdQuery = (id: string | null) => {
  return useQuery({
    queryKey: [KEY_QUERIES.PARTNER, id],
    queryFn: () => {
      return partnerManageApiRequest.getPartnerById(id as string);
    },
    enabled: Boolean(id),
  });
};
export const useUpdatePartnerMutation = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: DataPartnerType }) =>
      partnerManageApiRequest.updatePartner(id, body),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.PARTNER],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};

export const useDeletePartnerMutation = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => partnerManageApiRequest.deletePartner(id),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.PARTNER],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
