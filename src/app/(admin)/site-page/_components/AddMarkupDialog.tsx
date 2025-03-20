// import ReusablePopper from "@/common/ReusablePopper";
// import { ColorCommon } from "@/constants/color-common";
// import { extractJsonFromScript } from "@/utils/common";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import Stack from "@mui/material/Stack";
// import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";

// import InfoIcon from "@mui/icons-material/Info";
// import { Controller, useForm } from "react-hook-form";

// type AddMarkupDialogProps = {
//   open: boolean;
//   onClose: () => void;
//   onApply: (markup: string) => void;
// };

// const AddMarkupDialog = ({ open, onClose, onApply }: AddMarkupDialogProps) => {
//   const {
//     control,
//     reset,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<{ markup: string }>({
//     defaultValues: {
//       markup: "",
//     },
//   });

//   const onSubmit = (data: { markup: string }) => {
//     if (!data.markup) return;
//     onApply(extractJsonFromScript(data.markup));
//     reset();
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
//       <DialogTitle>
//         <Stack
//           direction='row'
//           justifyContent='space-between'
//           alignItems='center'
//         >
//           <Typography variant='h6'>Tạo markup mới</Typography>
//           <ReusablePopper
//             renderContent={() => (
//               <>
//                 <Typography variant='body2' gutterBottom>
//                   Cần tạo markup? Sử dụng tool bên ngoài sau đó paste code vào
//                   đây:{" "}
//                   <a
//                     href='https://technicalseo.com/tools/schema-markup-generator/'
//                     target='_blank'
//                     className='text-primary underline text-sm'
//                     rel='noopener noreferrer'
//                   >
//                     Tiến hành tạo markup
//                   </a>
//                 </Typography>
//               </>
//             )}
//             icon={<InfoIcon htmlColor={ColorCommon.primary} />}
//           />
//         </Stack>
//       </DialogTitle>
//       <DialogContent>
//         <Controller
//           name='markup'
//           control={control}
//           rules={{ required: "Markup is required" }}
//           render={({ field }) => (
//             <TextField
//               {...field}
//               id='outlined-multiline-static'
//               placeholder='{"@type": "Organization", "name": "Example"}'
//               multiline
//               minRows={4}
//               fullWidth
//               error={!!errors.markup}
//               helperText={errors.markup?.message}
//             />
//           )}
//         />
//       </DialogContent>
//       <DialogActions
//         sx={{
//           padding: "0 24px 16px 24px",
//         }}
//       >
//         <Button variant='outlined' onClick={onClose} color='primary'>
//           Hủy bỏ
//         </Button>
//         <Button
//           onClick={handleSubmit(onSubmit)}
//           variant='contained'
//           color='primary'
//         >
//           Xác nhận
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AddMarkupDialog;
