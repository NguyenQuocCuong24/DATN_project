import { productManageApiRequest } from "@/apiRequests/product";
import { productTypeManageApiRequest } from "@/apiRequests/productType";
import { KEY_QUERIES } from "@/constants/key-queries.const";
import { searchParamsProduct } from "@/types/product.type";
import { searchParamsProductType } from "@/types/productType.type";
import { DataProductType } from "@/validations/product.schema";
import { TDataProductType } from "@/validations/productType.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateProductTypeMutation = (
  onSuccessCallback?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productTypeManageApiRequest.createProductType,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.PRODUCT_TYPE],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};

export const useGetProductTypesQuery = (
  start: number,
  end: number,
  params: searchParamsProductType,
  enable?: boolean
) => {
  return useQuery({
    queryKey: [KEY_QUERIES.PRODUCT_TYPE, start, end, params],
    queryFn: () =>
      productTypeManageApiRequest.getProductTypes(start, end, params),
    enabled: enable,
  });
};

export const useGetProductTypeByIdQuery = (id: string | null) => {
  return useQuery({
    queryKey: [KEY_QUERIES.PRODUCT, id],
    queryFn: () => {
      return productTypeManageApiRequest.getProductTypeById(id as string);
    },
    enabled: Boolean(id),
  });
};
export const useUpdateProductTypeMutation = (
  onSuccessCallback?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: TDataProductType }) =>
      productTypeManageApiRequest.updateProductType(id, body),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.PRODUCT_TYPE],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};

export const useDeleteProductTypeMutation = (
  onSuccessCallback?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      productTypeManageApiRequest.deleteProductType(id),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.PRODUCT_TYPE],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
