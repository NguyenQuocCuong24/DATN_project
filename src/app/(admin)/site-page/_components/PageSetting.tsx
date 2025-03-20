// "use client";
// import Loading from "@/common/Loading";
// import ReusableTabPanel from "@/common/ReusableTabPanel";
// // import TabBanner from "./TabPage/TabBanner";
// // import TabSeoAdvanced from "./TabPage/TabSeoAdvanced";
// // import TabSeoBasic from "./TabPage/TabSeoBasic";
// import dynamic from "next/dynamic";

// const TabBanner = dynamic(() => import("./TabPage/TabBanner"), {
//   ssr: false,
//   loading: () => <Loading />,
// });
// const TabSeoBasic = dynamic(() => import("./TabPage/TabSeoBasic"), {
//   ssr: false,
//   loading: () => <Loading />,
// });
// const TabSeoAdvanced = dynamic(() => import("./TabPage/TabSeoAdvanced"), {
//   ssr: false,
//   loading: () => <Loading />,
// });
// function PageSetting() {
//   const listTabs = [
//     {
//       id: 0,
//       label: "Thông tin cơ bản",
//       component: <TabBanner />,
//     },
//     {
//       id: 1,
//       label: "SEO cơ bản",
//       component: <TabSeoBasic />,
//     },
//     {
//       id: 2,
//       label: "Seo nâng cao",
//       component: <TabSeoAdvanced />,
//     },
//   ];
//   return (
//     <div className='bg-white m-5 p-8 rounded-2xl'>
//       <ReusableTabPanel
//         listTabs={listTabs}
//         onChangeTab={(newValue) => console.log("newValue", newValue)}
//       />
//     </div>
//   );
// }

// export default PageSetting;
