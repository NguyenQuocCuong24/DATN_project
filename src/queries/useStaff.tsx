import { staffManageApiRequest } from "@/apiRequests/staffs";
import { KEY_QUERIES } from "@/constants/key-queries.const";
import { searchParamsTeam } from "@/types/staff.type";
import { DataStaffInput } from "@/validations/staff.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateStaffMutation = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: staffManageApiRequest.createStaff,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.STAFF],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};

export const useGetStaffsQuery = (
  start: number,
  end: number,
  params: searchParamsTeam,
  enable?: boolean
) => {
  return useQuery({
    queryKey: [KEY_QUERIES.STAFF, start, end, params],
    queryFn: () => staffManageApiRequest.getStaffs(start, end, params),

    enabled: enable,
  });
};

export const useGetStaffByIdQuery = (id: string | null) => {
  return useQuery({
    queryKey: [KEY_QUERIES.STAFF, id],
    queryFn: () => {
      return staffManageApiRequest.getStaffById(id as string);
    },
    enabled: Boolean(id),
  });
};
export const useUpdateStaffMutation = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: DataStaffInput }) =>
      staffManageApiRequest.updateStaff(id, body),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.STAFF],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};

export const useDeleteStaffMutation = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => staffManageApiRequest.deleteStaff(id),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.STAFF],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
