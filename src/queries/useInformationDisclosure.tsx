import { informationDisclosureManageApiRequest } from "@/apiRequests/information-disclosure";
import { KEY_QUERIES } from "@/constants/key-queries.const";
import { searchParamsInfomationDisclosure } from "@/types/informationDisclosure.type";
import { DataInformationDisclosureInput } from "@/validations/informationDisclosure.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetInformationDisclosureQuery = (
  start: number,
  end: number,
  params: searchParamsInfomationDisclosure,
  enable?: boolean
) => {
  return useQuery({
    queryKey: [KEY_QUERIES.INFORMATION_DISCLOSURE, start, end, params],
    queryFn: () =>
      informationDisclosureManageApiRequest.getInformationDisclosure(
        start,
        end,
        params
      ),

    enabled: enable,
  });
};
export const useCreateInformationDisclosureMutation = (
  onSuccessCallback?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:
      informationDisclosureManageApiRequest.createInformationDisclosure,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.INFORMATION_DISCLOSURE],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
export const useGetInformationDisclosureByIdQuery = (id: string | null) => {
  return useQuery({
    queryKey: [KEY_QUERIES.INFORMATION_DISCLOSURE, id],
    queryFn: () => {
      return informationDisclosureManageApiRequest.getInformationDisclosureById(
        id as string
      );
    },
    enabled: Boolean(id),
  });
};
export const useUpdateInformationDisclosureMutation = (
  onSuccessCallback?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: DataInformationDisclosureInput;
    }) =>
      informationDisclosureManageApiRequest.updateInformationDisclosure(
        id,
        body
      ),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.INFORMATION_DISCLOSURE],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};

export const useDeleteInformationDisclosureMutation = (
  onSuccessCallback?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      informationDisclosureManageApiRequest.deleteInformationDisclosure(id),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.INFORMATION_DISCLOSURE],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
