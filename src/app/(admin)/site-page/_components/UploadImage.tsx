import TextFieldController from "@/common/TextFieldController";
import { useUploadImageMutation } from "@/queries/useMedia";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
interface IUploadImageProps {
  control: Control<
    {
      html: {
        backgroundImgs?: {
          url: string;
          alt: string;
        }[];
        backgroundVideos?: string | undefined;
      };
      url: string;
      pageCode: string;
    },
    any
  >;
  watch: UseFormWatch<{
    url: string;
    html: {
      backgroundImgs?: {
        url: string;
        alt: string;
      }[];
      backgroundVideos?: string | undefined;
    };
    pageCode: string;
  }>;
  setValue: UseFormSetValue<{
    url: string;
    html: {
      backgroundImgs?: {
        url: string;
        alt: string;
      }[];
      backgroundVideos?: string | undefined;
    };
    pageCode: string;
  }>;
  getValues: UseFormGetValues<{
    html: {
      backgroundImgs?: {
        url: string;
        alt: string;
      }[];
      backgroundVideos?: string | undefined;
    };
    url: string;
    pageCode: string;
  }>;
  errors: FieldErrors<{
    url: string;
    html: {
      backgroundImgs?: {
        url: string;
        alt: string;
      }[];
      backgroundVideos?: string | undefined;
    };
    pageCode: string;
  }>;
  disabled: boolean;
}
const UploadImage = (props: IUploadImageProps) => {
  const { control, watch, setValue, errors, disabled = false } = props;
  const uploadImageMutation = useUploadImageMutation();
  const backgroundImgs = watch("html.backgroundImgs");
  const { fields } = useFieldArray({
    control,
    name: "html.backgroundImgs",
  });
  const [loadingState, setLoadingState] = useState<{
    [key: number]: boolean;
  }>({});
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoadingState(() => ({ [index]: true }));
    try {
      const formData = new FormData();
      formData.append("file", file);
      const updateImageResult = await uploadImageMutation.mutateAsync(formData);
      const uploadedUrl = updateImageResult.payload.url;

      setValue(`html.backgroundImgs.${index}.url`, uploadedUrl, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoadingState(() => ({}));
    }
  };
  return (
    <Stack direction='column' gap={4} mt={4}>
      <Typography variant='h6' className='text-primary'>
        Tải ảnh banner
      </Typography>
      <Box className='overflow-x-scroll flex gap-4'>
        {fields.map((field, index) => (
          <Stack spacing={2} key={field.id} direction='column'>
            <Controller
              name={`html.backgroundImgs.${index}.url`}
              control={control}
              render={({ field: { value } }) =>
                loadingState[index] ? (
                  <Box className='flex w-[480px] h-[270px] justify-center items-center'>
                    <CircularProgress />
                  </Box>
                ) : value ? (
                  <Stack
                    direction='column'
                    alignItems='center'
                    className='relative h-full bg-bgPrimary shadow-md'
                  >
                    <Box className='w-[480px] h-[270px]'>
                      <Image
                        src={value}
                        alt={`Ảnh ${index}`}
                        loading='lazy'
                        fill
                        sizes='100%'
                        className='object-contain'
                      />
                    </Box>
                    {!disabled && (
                      <Box
                        className='absolute right-1 top-1 rounded-full opacity-80 hover:opacity-90 cursor-pointer bg-white shadow-md'
                        onClick={() =>
                          setValue(`html.backgroundImgs.${index}.url`, "", {
                            shouldValidate: true,
                            shouldDirty: true,
                          })
                        }
                      >
                        <CancelIcon fontSize='large' htmlColor='black' />
                      </Box>
                    )}
                  </Stack>
                ) : (
                  // <Button
                  //   variant='outlined'
                  //   component='label'
                  //   className='h-[100%]'
                  //   fullWidth
                  // >
                  //   Tải ảnh
                  //   <input
                  //     type='file'
                  //     hidden
                  //     accept='image/*'
                  //     onChange={(e) => handleFileUpload(e, index)}
                  //   />
                  // </Button>
                  <Button
                    className={`w-[480px] h-[270px] flex justify-center items-center border  ${
                      errors?.html?.backgroundImgs?.message &&
                      "!border-txtError"
                    } rounded-sm hover:border-2 hover:border-primary `}
                    startIcon={
                      <Image
                        src='/assets/icons/icon_add.svg'
                        width={50}
                        height={50}
                        alt='addImage'
                      />
                    }
                    variant='outlined'
                    component='label'
                  >
                    <input
                      type='file'
                      hidden
                      accept='image/*'
                      onChange={(e) => {
                        handleFileUpload(e, index);
                      }}
                    />
                  </Button>
                )
              }
            />
            {errors.html?.backgroundImgs?.[index]?.url && (
              <Typography color='error'>
                {errors.html.backgroundImgs[index].url.message}
              </Typography>
            )}
            {backgroundImgs?.[index]?.url && (
              <TextFieldController
                name={`html.backgroundImgs.${index}.alt`}
                control={control}
                placeholder='Mô tả ảnh'
                size='small'
                disabled={disabled}
              />
            )}

            {/* {!disabled && (
              <Button
                variant='contained'
                color='error'
                fullWidth
                onClick={() => remove(index)}
              >
                Xóa
              </Button>
            )} */}
          </Stack>
        ))}
      </Box>
      {/* {!disabled && (
        <Button
          variant='outlined'
          color='primary'
          className='!mb-2 w-fit'
          onClick={() => {
            const bgImgCurrentValue = getValues("html.backgroundImgs");
            if (
              bgImgCurrentValue?.length === 0 ||
              (bgImgCurrentValue &&
                bgImgCurrentValue[bgImgCurrentValue.length - 1]?.url)
            ) {
              append({ url: "", alt: "" });
            } else {
              toast.error("Vui lòng tải ảnh trước khi thêm mới", {
                position: "bottom-left",
              });
            }
          }}
        >
          Thêm ảnh
        </Button>
      )} */}
      {
        // Error message
        errors.html?.backgroundImgs?.message && (
          <Typography color='error'>
            {errors.html?.backgroundImgs?.message}
          </Typography>
        )
      }
    </Stack>
  );
};

export default UploadImage;
