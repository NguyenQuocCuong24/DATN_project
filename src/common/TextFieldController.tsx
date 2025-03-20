import { StyledTextField } from "@/styles/style-common";
import Box from "@mui/material/Box";
import { TextFieldProps } from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { Controller } from "react-hook-form";

interface TextFieldControllerProps extends Omit<TextFieldProps, "name"> {
  name: string;
  control: any;
  label?: string;
  placeholder?: string;
  suggestText?: React.ReactNode;
  maxHeight?: string;
}

const TextFieldController: React.FC<TextFieldControllerProps> = ({
  name,
  control,
  label,
  placeholder = "",
  suggestText,
  maxHeight = "auto",
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Box className='flex flex-col w-full'>
            <Typography className='!text-base !font-semibold'>
              {label}
            </Typography>
            <StyledTextField
              {...field}
              placeholder={placeholder}
              variant='outlined'
              fullWidth
              error={!!fieldState?.error}
              helperText={
                fieldState.error &&
                fieldState.error.message &&
                fieldState.error.message
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  maxHeight: maxHeight,
                },
                "& .MuiFormHelperText-root": {
                  marginLeft: 0,
                },
              }}
              {...props}
            />
            {suggestText && suggestText}
          </Box>
        );
      }}
    />
  );
};

export default TextFieldController;
