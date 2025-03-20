// import TextFieldController from "@/common/TextFieldController";
// import { listOptionsOgTypeSeo } from "@/constants/ogTypeSeo.valueType";
// import { useUploadImageMutation } from "@/queries/useMedia";
// import { PageBodyReqType } from "@/validations/page.schema";
// import CancelIcon from "@mui/icons-material/Cancel";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   MenuItem,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import Grid from "@mui/material/Grid2";
// import Image from "next/image";
// import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form";
// type TAdditionalTagsProp = {
//   watch: UseFormWatch<{
//     jsonLDs: {
//       markup: string;
//     }[];
//     metas: {
//       type: string;
//       canonical: string;
//       site_name: string;
//       url: string;
//       openGraph: {
//         title: string;
//         image: string;
//         description: string;
//       };
//     };
//   }>;
//   control: Control<
//     {
//       jsonLDs: {
//         markup: string;
//       }[];
//       metas: {
//         type: string;
//         canonical: string;
//         site_name: string;
//         url: string;
//         openGraph: {
//           title: string;
//           image: string;
//           description: string;
//         };
//       };
//     },
//     any
//   >;
//   setValue: UseFormSetValue<{
//     jsonLDs: {
//       markup: string;
//     }[];
//     metas: {
//       url: string;
//       type: string;
//       canonical: string;
//       site_name: string;
//       openGraph: {
//         title: string;
//         description: string;
//         image: string;
//       };
//     };
//   }>;
//   bodyData: PageBodyReqType;
// };
// const AdditionalTags = (props: TAdditionalTagsProp) => {
//   const { watch, control, setValue, bodyData } = props;
//   const uploadImageMutation = useUploadImageMutation();
//   const canonical = watch("metas.canonical");
//   const siteName = watch("metas.site_name");
//   const type = watch("metas.type");
//   const url = watch("metas.url");
//   const img = watch("metas.openGraph.image");
//   const title = watch("metas.openGraph.title");
//   const description = watch("metas.openGraph.description");
//   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const formData = new FormData();
//     formData.append("file", file);
//     const updateImageResult = await uploadImageMutation.mutateAsync(formData);
//     const uploadedUrl = updateImageResult.payload.url;
//     setValue(`metas.openGraph.image`, uploadedUrl, {
//       shouldValidate: true,
//       shouldDirty: true,
//     });
//   };
//   return (
//     <>
//       <Stack direction='column' justifyContent='space-between' pb={4}>
//         <Typography variant='h6' className='text-primary'>
//           Additional Tags
//         </Typography>
//         <Typography className='!text-xs' color='text.secondary'>
//           Những thẻ này cung cấp cho công cụ tìm kiếm thông tin quan trọng về
//           các trang trên trang web.
//         </Typography>

//         <Grid container spacing={2} mt={2}>
//           {/* Tag: Canonical */}
//           <Grid container size={12} spacing={6} mt={2}>
//             <Grid size={6}>
//               <TextFieldController
//                 control={control}
//                 name='metas.canonical'
//                 label='Canonical'
//                 placeholder='Url Canonical'
//                 size='small'
//               />
//             </Grid>
//             <Grid size={6} mt={3}>
//               <TextField
//                 fullWidth
//                 placeholder={`<link rel="canonical" href=${canonical} />`}
//                 size='small'
//                 disabled
//               />
//             </Grid>
//           </Grid>
//           <Grid container size={12} spacing={6} mt={2}>
//             {/* Tag: og:site_name */}
//             <Grid size={6}>
//               <TextFieldController
//                 control={control}
//                 name='metas.site_name'
//                 label='Site Name'
//                 placeholder='Site Name'
//                 size='small'
//               />
//             </Grid>
//             <Grid size={6} mt={3}>
//               <TextField
//                 fullWidth
//                 placeholder={`<meta property="og:site_name" content=${siteName} />`}
//                 size='small'
//                 disabled
//               />
//             </Grid>
//           </Grid>
//           <Grid container size={12} spacing={6} mt={2}>
//             {/* Tag: og:type */}
//             <Grid size={6}>
//               {/* <TextFieldController
//                 control={control}
//                 name='metas.type'
//                 label='Type'
//                 placeholder='Type'
//                 size='small'
//               /> */}
//               <TextFieldController
//                 select
//                 control={control}
//                 name='metas.type'
//                 label='Type'
//                 placeholder='Type'
//                 size='small'
//               >
//                 {listOptionsOgTypeSeo.map((option) => (
//                   <MenuItem key={option} value={option}>
//                     {option}
//                   </MenuItem>
//                 ))}
//               </TextFieldController>
//             </Grid>
//             <Grid size={6} mt={3}>
//               <TextField
//                 fullWidth
//                 placeholder={`<meta property="og:type" content=${type} />`}
//                 size='small'
//                 disabled
//               />
//             </Grid>
//           </Grid>
//           <Grid container size={12} spacing={6} mt={2}>
//             {/* Tag: og:url */}
//             <Grid size={6}>
//               <TextFieldController
//                 control={control}
//                 name='metas.url'
//                 label='URL'
//                 placeholder='Page URL'
//                 size='small'
//               />
//             </Grid>
//             <Grid size={6} mt={3}>
//               <TextField
//                 fullWidth
//                 placeholder={`<meta property="og:url" content=${url} />`}
//                 size='small'
//                 disabled
//               />
//             </Grid>
//           </Grid>
//         </Grid>
//       </Stack>
//       <Stack direction='column' justifyContent='space-between'>
//         <Typography variant='h6' className='text-primary'>
//           Chia sẻ mạng xã hội
//         </Typography>
//         <Typography className='!text-xs' color='text.secondary'>
//           Cải thiện cách trang chính của trang web của bạn hiển thị khi được
//           chia sẻ trên các mạng xã hội như Facebook và Pinterest.
//         </Typography>

//         <Stack direction='row' flexWrap='wrap' className='gap-16 pt-8'>
//           <Box className='flex flex-col gap-8 w-full md:w-[calc(50%-32px)]'>
//             {/* Tag: Social Media */}
//             <Box>
//               <TextFieldController
//                 control={control}
//                 name='metas.openGraph.title'
//                 label='Title'
//                 placeholder='Title'
//                 size='small'
//               />
//               {title !== bodyData?.seo?.title && (
//                 <Box className='flex flex-row gap-1 py-2 items-center'>
//                   <ErrorOutlineIcon htmlColor={"#eab308"} />
//                   <Typography className='text-sm text-yellow-500 mt-1'>
//                     Nội dung tiêu đề ở Seo media và tiêu đề bài viết không
//                     giống, bạn có thể thay đổi để đồng nhất?
//                   </Typography>
//                 </Box>
//               )}
//             </Box>

//             <TextFieldController
//               control={control}
//               name='metas.openGraph.description'
//               label='Description'
//               id='outlined-multiline-static'
//               multiline
//               minRows={4}
//               placeholder='Description'
//               size='small'
//             />

//             {/* Tag: Social Description */}
//           </Box>
//           <Box className='w-full h-full md:w-[calc(50%-32px)]'>
//             <Typography className='!text-xs' color='text.secondary'>
//               Xem trước trên mạng xã hội
//             </Typography>
//             <Stack
//               direction='column'
//               alignItems='center'
//               className='border-1 h-[350px] border-gray-200 rounded-sm border-2'
//             >
//               <Box className='w-full flex-1 flex items-center justify-center overflow-hidden relative'>
//                 {img ? (
//                   <>
//                     <Image
//                       src={img}
//                       alt={`Ảnh ${img}`}
//                       loading='lazy'
//                       fill
//                       sizes='100%'
//                       className='object-cover'
//                     />
//                     <Box
//                       className='absolute right-1 top-1 rounded-full opacity-80 hover:opacity-90 cursor-pointer bg-white shadow-md'
//                       onClick={() =>
//                         setValue(`metas.openGraph.image`, "", {
//                           shouldValidate: true,
//                           shouldDirty: true,
//                         })
//                       }
//                     >
//                       <CancelIcon fontSize='large' htmlColor='black' />
//                     </Box>
//                   </>
//                 ) : uploadImageMutation.isPending ? (
//                   <CircularProgress />
//                 ) : (
//                   // <PhotoIcon htmlColor='#D1D4D7' fontSize='large' />
//                   // <Stack gap={2}>
//                   //   <Typography>Ảnh</Typography>
//                   //   <Button
//                   //     className='w-fit !bg-primary !text-white'
//                   //     startIcon={<AddPhotoAlternateIcon />}
//                   //     component='label'
//                   //   >
//                   //     Chọn ảnh
//                   //     <input
//                   //       type='file'
//                   //       hidden
//                   //       accept='image/*'
//                   //       onChange={(e) => handleFileUpload(e)}
//                   //     />
//                   //   </Button>
//                   // </Stack>
//                   <Button
//                     className={`w-full h-full flex flex-col justify-center items-center border !normal-case rounded-sm hover:border-2 hover:border-primary `}
//                     variant='outlined'
//                     component='label'
//                   >
//                     <Image
//                       src='/assets/icons/icon_add.svg'
//                       width={50}
//                       height={50}
//                       alt='addImage'
//                     />
//                     <input
//                       type='file'
//                       hidden
//                       accept='image/*'
//                       onChange={(e) => {
//                         handleFileUpload(e);
//                       }}
//                     />
//                   </Button>
//                 )}
//               </Box>
//               <Box className='w-full bg-[#D1D4D7] p-3'>
//                 <Typography
//                   textTransform={"uppercase"}
//                   color='#686868'
//                   fontWeight={100}
//                 >
//                   {url || canonical}
//                 </Typography>
//                 <Typography
//                   fontWeight={700}
//                   fontSize='1.2rem'
//                   lineHeight='1.2rem'
//                 >
//                   {title}
//                 </Typography>
//                 <Typography fontSize='12px' className='text-xs'>
//                   {description}
//                 </Typography>
//               </Box>
//             </Stack>
//           </Box>
//         </Stack>
//       </Stack>
//     </>
//   );
// };

// export default AdditionalTags;
