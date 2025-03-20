// import Video from "@/common/VideoCustom";
// import { useUploadFileMutation } from "@/queries/useMedia";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   Stack,
//   Typography,
// } from "@mui/material";
// import {
//   Control,
//   Controller,
//   FieldErrors,
//   UseFormSetError,
//   UseFormSetValue,
// } from "react-hook-form";
// import CancelIcon from "@mui/icons-material/Cancel";
// import Image from "next/image";
// import { toast } from "react-toastify";
// interface IUploadVideoProps {
//   control: Control<
//     {
//       html: {
//         backgroundImgs?: {
//           url: string;
//           alt: string;
//         }[];
//         backgroundVideos?: string | undefined;
//       };
//       url: string;
//       pageCode: string;
//     },
//     any
//   >;
//   setValue: UseFormSetValue<{
//     url: string;
//     html: {
//       backgroundImgs?: {
//         url: string;
//         alt: string;
//       }[];
//       backgroundVideos?: string | undefined;
//     };
//     pageCode: string;
//   }>;
//   errors: FieldErrors<{
//     url: string;
//     html: {
//       backgroundImgs: {
//         url: string;
//         alt: string;
//       }[];
//       backgroundVideos?: string | undefined;
//     };
//     pageCode: string;
//   }>;
//   setError: UseFormSetError<{
//     html: {
//       backgroundImgs: {
//         url: string;
//         alt: string;
//       }[];
//       backgroundVideos?: string | undefined;
//     };
//     url: string;
//     pageCode: string;
//   }>;
//   disabled: boolean;
// }
// const UploadVideo = (props: IUploadVideoProps) => {
//   const { control, setValue, errors, setError, disabled = false } = props;
//   const uploadVideoMutation = useUploadFileMutation();

//   const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const allowedTypes = ["video/mp4", "video/webm", "video/ogg"];
//     const MAX_SIZE = 10 * 1024 * 1024;

//     if (!allowedTypes.includes(file.type)) {
//       toast.error("Chỉ chấp nhận các tệp video định dạng MP4, WebM, hoặc OGG.");
//       return;
//     }

//     if (file.size > MAX_SIZE) {
//       toast.error("Dung lượng tệp quá lớn, vui lòng chọn tệp nhỏ hơn 10MB.");
//       return setError("html.backgroundVideos", {
//         type: "manual",
//         message: "File quá lớn. Tối đa 10MB.",
//       });
//     }

//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       const updateImageResult = await uploadVideoMutation.mutateAsync(formData);
//       const uploadedUrl = updateImageResult.payload.url;
//       setValue("html.backgroundVideos", uploadedUrl, {
//         shouldValidate: true,
//         shouldDirty: true,
//       });
//     } catch (error) {
//       console.error("Upload failed:", error);
//     }
//   };
//   return (
//     <Stack direction='column' gap={4} mt={4}>
//       <Typography variant='h6' className='text-primary'>
//         Tải video banner
//       </Typography>
//       <Box className='w-1/2'>
//         <Controller
//           name={`html.backgroundVideos`}
//           control={control}
//           render={({ field: { value } }) =>
//             uploadVideoMutation.isPending ? (
//               <Box className='flex w-full aspect-h-9 justify-center items-center'>
//                 <CircularProgress />
//               </Box>
//             ) : value ? (
//               <Box className=' relative aspect-w-16 bg-bgPrimary shadow-md'>
//                 <Video src={value} className='object-contain' />
//                 {!disabled && (
//                   <Box
//                     className='absolute right-1 top-1 rounded-full opacity-80 hover:opacity-90 cursor-pointer bg-white shadow-md'
//                     onClick={() =>
//                       setValue(`html.backgroundVideos`, "", {
//                         shouldValidate: true,
//                         shouldDirty: true,
//                       })
//                     }
//                   >
//                     <CancelIcon fontSize='large' htmlColor='black' />
//                   </Box>
//                 )}
//               </Box>
//             ) : (
//               <Button
//                 className={`relative overflow-hidden aspect-w-16 aspect-h-9 border !normal-case ${
//                   errors.html?.backgroundVideos?.message && "!border-txtError"
//                 } rounded-sm hover:border-2 hover:border-primary `}
//                 variant='outlined'
//                 component='label'
//               >
//                 <Image
//                   src='/assets/icons/icon_add.svg'
//                   width={50}
//                   height={50}
//                   alt='addImage'
//                   className='absolute object-contain top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
//                 />
//                 <input
//                   type='file'
//                   hidden
//                   accept='video/*'
//                   onChange={(e) => {
//                     handleVideoUpload(e);
//                   }}
//                 />
//               </Button>
//             )
//           }
//         />
//         {errors.html?.backgroundVideos?.message && (
//           <Typography color='error' className='!text-xs'>
//             {errors.html?.backgroundVideos?.message}
//           </Typography>
//         )}
//       </Box>
//     </Stack>
//   );
// };

// export default UploadVideo;
