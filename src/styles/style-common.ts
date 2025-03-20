import styled from "@mui/material/styles/styled";
import Drawer from "@mui/material/Drawer";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ColorCommon } from "@/constants/color-common";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Select } from "@mui/material";

export const StyledDrawer = styled(Drawer)({
  "& .MuiDrawer-paper": {
    backgroundColor: ColorCommon.bgDashBoard,
    width: "16.666667%",
  },
});

export const StyledTabsHightLightPrimary = styled(Tabs)(() => ({
  "& .MuiTabs-indicator": {
    backgroundColor: ColorCommon.primary,
    margin: "0px",
    transition: "all 300ms ease-in-out",
    willChange: "transform",
  },
}));

export const StyledTabHightLightPrimary = styled(Tab)(() => ({
  padding: "0px 15px !important",
  height: "fit-content !important",
  textTransform: "none",
  borderRadius: "5px !important",
  borderBottomLeftRadius: "0px !important",
  borderBottomRightRadius: "0px !important",
  fontSize: "20px !important",
  "&:hover": {
    opacity: 0.8,
    transition: "all 0.3s",
  },
  "&.Mui-selected": {
    backgroundColor: "#ffffff !important",
    padding: "10px 15px !important",
    borderBottom: "2px solid #0E4E92 !important",
    color: "#0E4E92",
    transition: "all 0.3s",
  },
}));

export const StyledTabs = styled(Tabs)(() => ({
  backgroundColor: "transparent",
  "& .MuiTabs-indicator": {
    backgroundColor: ColorCommon.primary,
    margin: "0px",
    transition: "all 300ms ease-in-out",
    willChange: "transform",
  },
  border: "none !important",
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
  padding: "10px 15px !important",
  backgroundColor: "transparent",
  textTransform: "none",
  "&.Mui-selected": {
    backgroundColor: "#ffffff !important",
    color: theme.palette.text.primary,
  },
}));

export const StyledLoadingButtonPrimary = styled(LoadingButton)({
  backgroundColor: ColorCommon.backgroundButtonPrimary,
  color: "white",
  boxShadow: "none",
  textTransform: "none",
  "&:hover": {
    backgroundColor: ColorCommon.backgroundButtonPrimary,
    boxShadow: "none",
  },
  "& .MuiLoadingButton-loadingIndicator": {
    color: "white",
  },
  "&.Mui-disabled": {
    backgroundColor: ColorCommon.disablePrimary, // Define a color for disabled state
    color: ColorCommon.grayInfor, // Define text color for disabled state
    boxShadow: "none",
  },
});

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export const StyledTextField = styled(TextField)(({ placeholder }) => ({
  "& .MuiOutlinedInput-root": {
    fontSize: "16px",
    fontFamily: "Manrope, sans-serif",
  },
  "& input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 100px white inset",
    WebkitTextFillColor: "black",
    caretColor: "black",
    transition: "background-color 5000s ease-in-out 0s",
  },
  "& .MuiSelect-select span::before": {
    content: `"${placeholder || ""}"`,
    fontSize: "16px",
    color: ColorCommon.grayMiddle,
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
    margin: 0,
  },
}));
export const StyledButtonOutlined = styled(Button)({
  border: `1px solid ${ColorCommon.primary}`,
  color: ColorCommon.primary,
  textTransform: "none",
  fontWeight: "bolder",
  padding: "10px 25px",
  boxShadow: "none",
  "&:hover": {
    boxShadow: "none",
  },
});
export const StyledButtonPrimary = styled(Button)({
  backgroundColor: ColorCommon.primary,
  color: "white",
  boxShadow: "none",
  textTransform: "none",
  padding: "12px 0px",
  "&:hover": {
    backgroundColor: ColorCommon.primary,
    opacity: 0.9,
    boxShadow: "none",
  },
  "&:disabled": {
    opacity: 0.5,
    color: "white",
  },
});
export const StyledButtonRed = styled(Button)({
  backgroundColor: ColorCommon.boxRed,
  color: "white",
  boxShadow: "none",
  textTransform: "none",
  padding: "12px 0px",
  "&:hover": {
    backgroundColor: ColorCommon.boxRed,
    boxShadow: "none",
  },
});
export const StyledButtonGray = styled(Button)({
  backgroundColor: ColorCommon.backgroundButtonGray,
  color: "white",
  boxShadow: "none",
  textTransform: "none",
  padding: "12px 0px",
  "&:hover": {
    backgroundColor: ColorCommon.backgroundButtonGray,
    boxShadow: "none",
  },
});
export const StyledSelect = styled(Select)(({ theme }) => ({
  height: "50px",
  "& .MuiOutlinedInput-root": {
    fontSize: "16px",
    fontFamily: "Manrope, sans-serif",
  },
}));
