// "use client";
// import Loading from "@/common/Loading";
// import ReusableStepper from "@/common/ReusableStepper";
// import { useCreatePageSeoMutation } from "@/queries/usePageSeo";
// import { usePageStore } from "@/stores/pageStores";
// import { PageBodyReqType } from "@/validations/page.schema";
// import Box from "@mui/material/Box";
// import Stack from "@mui/material/Stack";
// import dynamic from "next/dynamic";
// import { useRouter } from "next/navigation";
// import { useCallback, useMemo, useState } from "react";
// import { toast } from "react-toastify";

// const StepBasicSetting = dynamic(
//   () => import("./StepperPage/StepBasicSetting"),
//   {
//     ssr: false,
//     loading: () => <Loading />,
//   }
// );
// const StepSeoAdvanced = dynamic(() => import("./StepperPage/StepSeoAdvanced"), {
//   ssr: false,
//   loading: () => <Loading />,
// });
// const StepSeoBasic = dynamic(() => import("./StepperPage/StepSeoBasic"), {
//   ssr: false,
//   loading: () => <Loading />,
// });

// export interface IFormCreatePage {
//   type: string;
// }

// const steps = ["Cài đặt cơ bản", "SEO cơ bản", "SEO nâng cao"];

// const FormCreatePage = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [bodyData, setBodyData] = useState<PageBodyReqType>();
//   const createPageSeoMutation = useCreatePageSeoMutation();
//   const router = useRouter();
//   const { updateSelectedPage } = usePageStore();
//   const handleNext = useCallback(
//     async (bodyData: PageBodyReqType) => {
//       setBodyData(bodyData);
//       if (activeStep < steps.length - 1) {
//         setActiveStep((prev) => prev + 1);
//       } else {
//         const res = await createPageSeoMutation.mutateAsync({
//           ...bodyData,
//           type: "PAGE",
//           company: "TVAM",
//         });
//         if (res.status === 200) {
//           toast.success("Tạo trang thành công");
//           updateSelectedPage(undefined);
//           router.push("/site-page");
//         }
//       }
//     },
//     [activeStep, createPageSeoMutation, router, updateSelectedPage]
//   );

//   const handleBack = useCallback(
//     (bodyData: PageBodyReqType) => {
//       setBodyData(bodyData);
//       if (activeStep > 0) {
//         setActiveStep((prev) => prev - 1);
//       }
//     },
//     [activeStep]
//   );

//   const stepContent = useMemo(
//     () => [
//       <StepBasicSetting
//         key='step-0'
//         bodyData={bodyData!}
//         nextStep={handleNext}
//       />,
//       <StepSeoBasic
//         key='step-1'
//         bodyData={bodyData!}
//         nextStep={handleNext}
//         backStep={handleBack}
//       />,
//       <StepSeoAdvanced
//         key='step-2'
//         bodyData={bodyData!}
//         nextStep={handleNext}
//         backStep={handleBack}
//       />,
//     ],
//     [bodyData, handleNext, handleBack]
//   );

//   return (
//     <Stack className='mx-16 mt-8 py-8 gap-6 rounded-lg'>
//       <ReusableStepper steps={steps} activeStep={activeStep} stepSize='large' />
//       <Box>{stepContent[activeStep]}</Box>
//     </Stack>
//   );
// };

// export default FormCreatePage;
