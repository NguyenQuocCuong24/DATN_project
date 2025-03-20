import { productManageApiRequest } from "@/apiRequests/product";
import { KEY_QUERIES } from "@/constants/key-queries.const";
import { searchParamsProduct } from "@/types/product.type";
import { DataProductType } from "@/validations/product.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateProductMutation = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productManageApiRequest.createProduct,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.PRODUCT],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};

export const useGetProductsQuery = (
  start: number,
  end: number,
  params: searchParamsProduct,
  enable?: boolean
) => {
  return useQuery({
    queryKey: [KEY_QUERIES.PRODUCT, start, end, params],
    queryFn: () => productManageApiRequest.getProducts(start, end, params),
    enabled: enable,
  });
};

export const useGetProductByIdQuery = (id: string | null) => {
  return useQuery({
    queryKey: [KEY_QUERIES.PRODUCT, id],
    queryFn: () => {
      return productManageApiRequest.getProductById(id as string);
    },
    enabled: Boolean(id),
  });
};
export const useUpdateProductMutation = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: DataProductType }) =>
      productManageApiRequest.updateProduct(id, body),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.PRODUCT],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};

export const useDeleteProductMutation = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => productManageApiRequest.deleteProduct(id),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [KEY_QUERIES.PRODUCT],
        });
      }, 500);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
