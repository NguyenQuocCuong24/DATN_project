// import {
//   PageBodyReqType,
//   SeoAdvancedSchema,
//   StepSeoAdvancedType,
// } from "@/validations/page.schema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import AddIcon from "@mui/icons-material/Add";
// import CodeIcon from "@mui/icons-material/Code";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { Box, Button, IconButton, Typography } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useFieldArray, useForm } from "react-hook-form";
// import AdditionalTags from "../AdditionalMetas";
// import JsonView from "@uiw/react-json-view";
// import dynamic from "next/dynamic";
// import { toast } from "react-toastify";
// import { useUpdatePageSeoMutation } from "@/queries/usePageSeo";
// import { usePageStore } from "@/stores/pageStores";
// import { pageManageApiRequest } from "@/apiRequests/page";
// import classNames from "classnames";
// import { useRouter, useSearchParams } from "next/navigation";
// const AddMarkupDialog = dynamic(() => import("../AddMarkupDialog"), {
//   ssr: false,
//   loading: () => <div>Loading...</div>,
// });
// type IStepSeoAdvanced = {
//   nextStep?: (bodyData: PageBodyReqType) => void;
//   backStep?: (bodyData: PageBodyReqType) => void;
//   bodyData: PageBodyReqType;
//   type?: "stepper" | "tab";
// };

// const StepSeoAdvanced = (props: IStepSeoAdvanced) => {
//   const params = useSearchParams();
//   const typeForm = params.get("type") ?? "";
//   const { nextStep, backStep, bodyData, type = "stepper" } = props;
//   const router = useRouter();
//   const { isSelectedPage, updateSelectedPage, kindOfPage } = usePageStore();
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const { control, handleSubmit, watch, getValues, setValue, reset } =
//     useForm<StepSeoAdvancedType>({
//       resolver: zodResolver(SeoAdvancedSchema),
//       defaultValues: {
//         jsonLDs:
//           bodyData?.seo?.jsonLDs?.map((markup: { markup: string }) => markup) ||
//           [],
//         metas: {
//           canonical: bodyData?.seo?.metas?.canonical || "",
//           site_name: bodyData?.seo?.metas?.site_name || "TVAM",
//           type: bodyData?.seo?.metas?.type || "article",
//           url: bodyData?.seo?.metas?.url || "",
//           openGraph: {
//             title:
//               bodyData?.seo?.metas?.openGraph?.title ||
//               bodyData?.seo?.title ||
//               "",
//             description:
//               bodyData?.seo?.metas?.openGraph?.description ||
//               bodyData?.seo?.description ||
//               "",
//             image:
//               bodyData?.seo?.metas?.openGraph?.image ||
//               (bodyData?.html?.backgroundImgs?.length &&
//                 bodyData?.html?.backgroundImgs[0].url) ||
//               "",
//           },
//         },
//       },
//     });
//   const updatePageSeoMutation = useUpdatePageSeoMutation();

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "jsonLDs",
//   });

//   const handleAddMarkup = (markup: string) => {
//     append({ markup });
//     setDialogOpen(false);
//   };

//   useEffect(() => {
//     if (type !== "tab") return;
//     reset({
//       jsonLDs:
//         bodyData?.seo?.jsonLDs?.map((markup: { markup: string }) => markup) ||
//         [],
//       metas: {
//         canonical: bodyData?.seo?.metas?.canonical,
//         site_name: bodyData?.seo?.metas?.site_name || "TVAM",
//         type: bodyData?.seo?.metas?.type || "website",
//         url: bodyData?.seo?.metas?.url,
//         openGraph: {
//           title:
//             bodyData?.seo?.metas?.openGraph?.title ||
//             bodyData?.seo?.title ||
//             "",
//           description:
//             bodyData?.seo?.metas?.openGraph?.description ||
//             bodyData?.seo?.description ||
//             "",
//           image:
//             bodyData?.seo?.metas?.openGraph?.image ||
//             (bodyData?.html?.backgroundImgs?.length &&
//               bodyData?.html.backgroundImgs[0].url) ||
//             "",
//           // "https://cms-api-uat.unikgate.vn/images//2240f165-a3d4-492f-b1d8-3090f42841a2",
//         },
//       },
//     });
//   }, [type, bodyData, reset]);

//   const updatePageSeo = async (data: StepSeoAdvancedType) => {
//     try {
//       const res = await updatePageSeoMutation.mutateAsync({
//         id: isSelectedPage?.id || "",
//         body: {
//           ...bodyData,
//           seo: {
//             ...bodyData.seo,
//             jsonLDs: data.jsonLDs.map((item) => ({ markup: item.markup })),
//             metas: data.metas,
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
//             jsonLDs: data.jsonLDs.map((item) => ({ markup: item.markup })),
//             metas: data.metas,
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
//       <Box pb={4}>
//         <Box>
//           <Typography variant='h6' className='text-primary'>
//             Structured Data Markup
//           </Typography>
//           <Typography className='!text-xs' color='text.secondary'>
//             Thêm markup vào trang này để công cụ tìm kiếm có thể hiển thị nó
//             dưới dạng kết quả ở nhiều định dạng
//           </Typography>
//         </Box>

//         <Box className='mt-4 flex flex-col gap-3'>
//           {fields.map((field, index) => (
//             <Box
//               key={field.id}
//               className='flex items-center justify-between hover:shadow-md p-2 cursor-pointer rounded hover:border-primary border-2 border-solid'
//             >
//               <Box className='flex flex-row gap-5 items-center'>
//                 <CodeIcon />
//                 <JsonView value={JSON.parse(field.markup)} />
//               </Box>
//               <IconButton
//                 size='small'
//                 onClick={() => remove(index)}
//                 color='error'
//               >
//                 <DeleteIcon />
//               </IconButton>
//             </Box>
//           ))}
//         </Box>

//         <Box
//           onClick={() => setDialogOpen(true)}
//           className='flex flex-row items-center justify-center mt-4 w-fit text-primary border-b-2 border-transparent hover:border-primary transition-all cursor-pointer'
//         >
//           <AddIcon />
//           Thêm mới markup
//         </Box>
//       </Box>

//       <AdditionalTags
//         watch={watch}
//         control={control}
//         setValue={setValue}
//         bodyData={bodyData}
//       />

//       {dialogOpen && (
//         <AddMarkupDialog
//           open={dialogOpen}
//           onClose={() => setDialogOpen(false)}
//           onApply={handleAddMarkup}
//         />
//       )}

//       <Box className='flex gap-4 mt-6'>
//         {backStep && (
//           <Button
//             variant='outlined'
//             color='primary'
//             onClick={() => {
//               const watchAllFields = getValues();
//               backStep({
//                 ...props.bodyData,
//                 seo: {
//                   ...bodyData.seo,
//                   jsonLDs: watchAllFields.jsonLDs.map((item) => ({
//                     markup: item.markup,
//                   })),
//                   metas: watchAllFields.metas,
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
//           {type === "stepper" ? "Cập nhật SEO" : "Cập nhật"}
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default StepSeoAdvanced;
