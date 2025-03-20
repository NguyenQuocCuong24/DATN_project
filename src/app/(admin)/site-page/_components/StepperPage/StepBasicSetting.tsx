// "use client";
// import { pageManageApiRequest } from "@/apiRequests/page";
// import TextFieldController from "@/common/TextFieldController";
// import { renderTxt } from "@/constants/object-const";
// import { useUpdatePageSeoMutation } from "@/queries/usePageSeo";
// import { usePageStore } from "@/stores/pageStores";
// import { convertToKebabCase, handleErrorCode } from "@/utils/common";
// import {
//   BackgroundImageSchema,
//   PageBodyReqType,
// } from "@/validations/page.schema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid2";
// import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";
// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import { z } from "zod";
// import UploadImage from "../UploadImage";
// import UploadVideo from "../UploadVideo";
// import { useRouter, useSearchParams } from "next/navigation";
// import { debounce } from "lodash";

// // const StepBasicSettingValidate = z.object({
// //   html: z.object({
// //     backgroundImgs: z.array(BackgroundImageSchema).optional(),
// //     backgroundVideos: z.string().optional(),
// //   }),
// //   url: z.string().min(1, "Slug URL không được để trống"),
// //   pageCode: z.string().min(1, "Mã CODE trang không được để trống"),
// //   name: z.string().optional(),
// // });

// const baseSchema = z.object({
//   html: z.object({
//     backgroundImgs: z.array(BackgroundImageSchema).optional(),
//     backgroundVideos: z.string().optional(),
//   }),
//   url: z.string().min(1, "Slug URL không được để trống"),
//   pageCode: z.string().min(1, "Mã CODE trang không được để trống"),
//   name: z.string().optional(),
// });

// const schemaWithRefine = baseSchema.refine(
//   async (data) => {
//     const response = await pageManageApiRequest.getPageSeoByQueryParams({
//       "data.pageCode": data.pageCode,
//     });
//     return response?.payload?.data.length === 0;
//   },
//   {
//     message: "Mã CODE trang đã tồn tại",
//     path: ["pageCode"],
//   }
// );

// interface IStepBasicSetting {
//   nextStep?: (bodyData: PageBodyReqType) => void;
//   bodyData: PageBodyReqType;
//   type?: "stepper" | "tab";
//   isPost?: boolean;
// }

// const StepBasicSetting = (props: IStepBasicSetting) => {
//   const updatePageSeoMutation = useUpdatePageSeoMutation();
//   const {
//     isSelectedMedia,
//     updateSelectedMedia,
//     isSelectedPage,
//     updateSelectedPage,
//   } = usePageStore();
//   const { nextStep, bodyData, type = "stepper", isPost } = props;
//   const params = useSearchParams();
//   const router = useRouter();
//   const typeForm = params.get("type") ?? "";
//   const StepBasicSettingValidate =
//     typeForm === "create" ? schemaWithRefine : baseSchema;
//   type StepBasicSettingFormType = z.infer<typeof StepBasicSettingValidate>;

//   const {
//     control,
//     setValue,
//     watch,
//     handleSubmit,
//     reset,
//     getValues,
//     setError,
//     clearErrors,
//     formState: { errors },
//   } = useForm<StepBasicSettingFormType>({
//     resolver: zodResolver(StepBasicSettingValidate),
//     defaultValues: {
//       html: {
//         backgroundImgs: bodyData?.html.backgroundImgs || [
//           {
//             // test https://cms-api-uat.unikgate.vn/images/3-capy.avif
//             url: "",
//             alt: "",
//           },
//         ],
//         backgroundVideos: bodyData?.html.backgroundVideos || "",
//       },
//       url: bodyData?.url || "",
//       pageCode: bodyData?.pageCode || "",
//       name: bodyData?.name || "",
//     },
//   });

//   useEffect(() => {
//     if (type !== "tab") return;
//     reset({
//       html: {
//         backgroundImgs: bodyData?.html.backgroundImgs || [],
//         backgroundVideos: bodyData?.html.backgroundVideos || "",
//       },
//       url: bodyData?.url || "",
//       pageCode: bodyData?.pageCode || "",
//       name: bodyData?.name || "",
//     });
//     if (bodyData?.html.backgroundVideos) {
//       updateSelectedMedia("video");
//     } else {
//       updateSelectedMedia("image");
//     }
//   }, [type, bodyData, reset, updateSelectedMedia]);

//   const updatePageSeo = async (data: StepBasicSettingFormType) => {
//     try {
//       const res = await updatePageSeoMutation.mutateAsync({
//         id: isSelectedPage?.id || "",
//         body: {
//           ...bodyData,
//           ...data,
//           url: convertToKebabCase(data.url),
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
//       handleErrorCode(error);
//       console.error(error);
//     }
//   };

//   const handleSubmitForm = handleSubmit(async (data) => {
//     if (
//       isSelectedMedia === "image" &&
//       !(data.html?.backgroundImgs && data.html?.backgroundImgs[0]?.url)
//     ) {
//       toast.error("Vui lòng chọn ảnh");
//       return;
//     } else if (isSelectedMedia === "video" && !data.html.backgroundVideos) {
//       toast.error("Vui lòng chọn video");
//       return;
//     } else {
//       if (isSelectedMedia === "image") {
//         data.html.backgroundVideos = "";
//       } else if (isSelectedMedia === "video") {
//         data.html.backgroundImgs = [];
//       }
//       if (type === "stepper" && nextStep) {
//         nextStep({
//           ...bodyData,
//           ...data,
//           url: convertToKebabCase(data.url),
//         });
//       } else {
//         await updatePageSeo(data);
//       }
//     }
//   });
//   const url = watch("url");
//   // Tạo hàm debounce để kiểm tra pageCode
//   const debouncedCheckPageCode = debounce(async (value: string) => {
//     if (!value) return;
//     try {
//       const response = await pageManageApiRequest.getPageSeoByQueryParams({
//         "data.pageCode": value,
//       });
//       if (response?.payload?.data.length > 0) {
//         setError("pageCode", {
//           type: "validate",
//           message: "Mã CODE trang đã tồn tại",
//         });
//       } else {
//         clearErrors("pageCode");
//       }
//     } catch (error) {
//       console.error("Lỗi kiểm tra pageCode:", error);
//     }
//   }, 300);
//   console.log("StepBasicSetting", errors);
//   return (
//     <>
//       <Box
//         component='form'
//         onSubmit={handleSubmitForm}
//         noValidate
//         className='w-full py-8 px-4'
//       >
//         <Typography variant='h6' className='text-primary'>
//           Cài đặt cơ bản trang
//         </Typography>
//         <Grid container width='100%' spacing={2} mt={2}>
//           <Grid size={{ xs: 12, md: 12 }}>
//             <Stack direction='row' gap={4}>
//               <TextFieldController
//                 name='pageCode'
//                 control={control}
//                 label='Mã code trang'
//                 disabled={typeForm == "view" || typeForm == "update"}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   setValue("pageCode", value);
//                   debouncedCheckPageCode(value);
//                 }}
//               />
//               <TextFieldController
//                 name='name'
//                 control={control}
//                 label='Tên trang'
//                 disabled={typeForm == "view"}
//               />
//               <TextFieldController
//                 name='url'
//                 control={control}
//                 label='Slug URL'
//                 disabled={isPost || typeForm == "view"}
//                 suggestText={
//                   url && (
//                     <span className='text-sm text-gray-500'>
//                       https://www.../{convertToKebabCase(url || "")}
//                     </span>
//                   )
//                 }
//               />
//             </Stack>
//           </Grid>
//           <Grid size={{ xs: 12, md: 12 }}>
//             {typeForm !== "view" && (
//               <Stack direction='row' gap={2} alignItems='center'>
//                 <Typography variant='h6' className='text-primary'>
//                   Chọn loại media:
//                 </Typography>
//                 <RadioGroup
//                   row
//                   value={isSelectedMedia}
//                   onChange={(e) =>
//                     updateSelectedMedia(e.target.value as "image" | "video")
//                   }
//                 >
//                   <FormControlLabel
//                     value='image'
//                     control={<Radio />}
//                     label='Chọn ảnh'
//                   />
//                   <FormControlLabel
//                     value='video'
//                     control={<Radio />}
//                     label='Chọn video'
//                   />
//                 </RadioGroup>
//               </Stack>
//             )}
//             {isSelectedMedia === "image" ? (
//               <UploadImage
//                 control={control}
//                 watch={watch}
//                 setValue={setValue}
//                 errors={errors}
//                 getValues={getValues}
//                 disabled={typeForm == "view"}
//               />
//             ) : (
//               isSelectedMedia === "video" && (
//                 <UploadVideo
//                   setValue={setValue}
//                   control={control}
//                   errors={errors}
//                   setError={setError}
//                   disabled={typeForm == "view"}
//                 />
//               )
//             )}

//             <Box className='flex gap-4 mt-10'>
//               {typeForm === "view" && (
//                 <Button
//                   variant='outlined'
//                   color='primary'
//                   onClick={() => router.back()}
//                 >
//                   Quay lại
//                 </Button>
//               )}
//               {typeForm !== "view" && (
//                 <Button variant='contained' color='primary' type='submit'>
//                   {renderTxt[type]}
//                 </Button>
//               )}
//             </Box>
//           </Grid>
//         </Grid>
//       </Box>
//     </>
//   );
// };

// export default StepBasicSetting;
