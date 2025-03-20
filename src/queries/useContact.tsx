import { contactManageApiRequest } from "@/apiRequests/contacts";
import { KEY_QUERIES } from "@/constants/key-queries.const";
import { searchParamsContact } from "@/types/contact.type";
import { useQuery } from "@tanstack/react-query";

export const useGetContactsQuery = (
  start: number,
  end: number,
  params: searchParamsContact,
  enable?: boolean
) => {
  return useQuery({
    queryKey: [KEY_QUERIES.CONTACT, start, end, params],
    queryFn: () => contactManageApiRequest.getContacts(start, end, params),
    enabled: enable,
  });
};
