// import { pageManageApiRequest } from "@/apiRequests/page";
// import TextFieldController from "@/common/TextFieldController";
// import { URL_PRODUCTION } from "@/config";
// import { renderTxt } from "@/constants/object-const";
// import { useUpdatePageSeoMutation } from "@/queries/usePageSeo";
// import { usePageStore } from "@/stores/pageStores";
// import { convertSlugUrl } from "@/utils/common";
// import {
//   PageBodyReqType,
//   SeoBasicSchema,
//   StepSeoBasicType,
// } from "@/validations/page.schema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// import { Box, Button, Stack, TextField, Typography } from "@mui/material";
// import classNames from "classnames";
// import Image from "next/image";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// type IStepSeoBasic = {
//   nextStep?: (bodyData: PageBodyReqType) => void;
//   backStep?: (bodyData: PageBodyReqType) => void;
//   bodyData: PageBodyReqType;
//   type?: "stepper" | "tab";
//   activeStep?: number;
//   dirtyStep?: boolean;
// };

// const StepSeoBasic = (props: IStepSeoBasic) => {
//   const {
//     nextStep,
//     backStep,
//     bodyData,
//     type = "stepper",
//     activeStep,
//     dirtyStep,
//   } = props;
//   const {
//     isSelectedPage,
//     updateSelectedPage,
//     kindOfPage,
//     postCurrent,
//     newsCurrent,
//   } = usePageStore();
//   const {
//     control,
//     watch,
//     handleSubmit,
//     getValues,
//     reset,
//     formState: { errors },
//   } = useForm<StepSeoBasicType>({
//     resolver: zodResolver(SeoBasicSchema),
//     defaultValues: {
//       title: bodyData?.seo?.title || "",
//       description: bodyData?.seo?.description || "",
//     },
//   });
//   const router = useRouter();
//   const params = useSearchParams();
//   const updatePageSeoMutation = useUpdatePageSeoMutation();
//   const title = watch("title");
//   const description = watch("description");
//   const typeForm = params.get("type") ?? "";
//   useEffect(() => {
//     if (type !== "tab") return;
//     reset({
//       title: bodyData?.seo?.title || "",
//       description: bodyData?.seo?.description || "",
//     });
//   }, [type, bodyData, reset]);

//   const updatePageSeo = async (data: StepSeoBasicType) => {
//     try {
//       const res = await updatePageSeoMutation.mutateAsync({
//         id: isSelectedPage?.id || "",
//         body: {
//           ...bodyData,
//           seo: {
//             ...bodyData.seo,
//             title: data.title,
//             description: data.description,
//           },
//         },
//       });

//       if (res.status === 200) {
//         toast.success("Cập nhật trang thành công");
//         if (isSelectedPage?.id) {
//           const pageDetails = await pageManageApiRequest.getPageSeoById(
//             isSelectedPage.id
//           );
//           updateSelectedPage(pageDetails.payload);
//         }
//       }
//     } catch (error) {
//       toast.error("Update failed");
//       console.error(error);
//     }
//   };
//   const handleSubmitForm = handleSubmit(
//     async (data) => {
//       if (type === "stepper" && nextStep) {
//         nextStep({
//           ...props.bodyData,
//           seo: {
//             ...bodyData.seo,
//             title: data.title,
//             description: data.description,
//           },
//         });
//       } else {
//         await updatePageSeo(data);
//       }
//     },
//     (errors) => {
//       console.log(errors);
//     }
//   );
//   return (
//     <Box
//       component='form'
//       onSubmit={handleSubmitForm}
//       className={classNames("w-full py-8 px-[15px]", {
//         "px-8": kindOfPage === "page",
//       })}
//       noValidate
//     >
//       <Typography variant='h6' className='text-primary'>
//         {kindOfPage === "page"
//           ? "Thông tin SEO cơ bản"
//           : "Cập nhật một số thông tin SEO cơ bản dưới đây:"}
//       </Typography>
//       <Stack direction='row' gap={5} className=''>
//         <Box className='mt-4 w-1/2 flex flex-col gap-2'>
//           <Controller
//             name='title'
//             control={control}
//             render={({ field }) => (
//               <Box className='flex flex-col'>
//                 <label className='font-semibold'>Tiêu đề</label>
//                 <TextField
//                   {...field}
//                   variant='outlined'
//                   fullWidth
//                   disabled={typeForm == "view"}
//                   error={!!errors.title}
//                   helperText={errors.title?.message}
//                   sx={{
//                     "& .MuiFormHelperText-root": {
//                       marginLeft: 0,
//                     },
//                   }}
//                 />
//                 {title !== bodyData?.seo?.metas?.openGraph?.title &&
//                   ((type === "stepper" && dirtyStep) || type === "tab") && (
//                     <Box className='flex flex-row gap-1 py-2 items-center'>
//                       <ErrorOutlineIcon htmlColor={"#eab308"} />
//                       <Typography className='text-sm text-yellow-500 mt-1'>
//                         Nội dung tiêu đề ở Seo media và tiêu đề bài viết không
//                         giống, bạn có thể thay đổi để đồng nhất?
//                       </Typography>
//                     </Box>
//                   )}
//               </Box>
//             )}
//           />
//           <TextFieldController
//             control={control}
//             name='description'
//             label='Mô tả'
//             placeholder='Mô tả'
//             id='outlined-multiline-static'
//             multiline
//             minRows={4}
//             disabled={typeForm == "view"}
//           />
//         </Box>
//         <Stack className='mt-4 w-1/2'>
//           <Typography className='text-gray-600'>
//             Xem trước hiển thị trên Google
//           </Typography>
//           <Stack className='p-3 border-1 border-gray-200 rounded-sm border-2'>
//             <Stack direction='row' alignItems='center' gap={1}>
//               <Box className='w-11 h-11 flex items-center justify-center bg-slate-200 border-2 border-slate-300 overflow-hidden rounded-full relative'>
//                 <Image
//                   src='/favicon.svg'
//                   alt='TVS Logo'
//                   width={60}
//                   height={60}
//                   className='object-contain'
//                 />
//               </Box>
//               <Box>
//                 <Typography className='text-lg'>{bodyData.name}</Typography>
//                 <Typography className='text-sm'>
//                   {URL_PRODUCTION}{" "}
//                   <ArrowForwardIosIcon sx={{ fontSize: "8px" }} />{" "}
//                   {kindOfPage === "page"
//                     ? convertSlugUrl(bodyData.url)
//                     : kindOfPage === "post"
//                     ? postCurrent?.data?.slug
//                     : newsCurrent?.data?.slug || ""}
//                 </Typography>
//               </Box>
//             </Stack>
//             <h3 className='text-[#1a0dab] text-lg font-semibold mt-2'>
//               {title}
//             </h3>
//             <p className='truncate-2-lines'>{description}</p>
//           </Stack>
//         </Stack>
//       </Stack>

//       <Box className='flex gap-4 mt-6'>
//         {backStep && activeStep !== 0 && (
//           <Button
//             variant='outlined'
//             color='primary'
//             onClick={() => {
//               const watchAllFields = getValues();
//               backStep({
//                 ...props.bodyData,
//                 seo: {
//                   ...bodyData.seo,
//                   title: watchAllFields.title,
//                   description: watchAllFields.description,
//                 },
//               });
//             }}
//           >
//             Quay lại
//           </Button>
//         )}
//         {typeForm === "view" && (
//           <Button
//             variant='outlined'
//             color='primary'
//             onClick={() => router.push("/site-page")}
//           >
//             Quay lại
//           </Button>
//         )}
//         <Button variant='contained' color='primary' type='submit'>
//           {renderTxt[type]}
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default StepSeoBasic;
