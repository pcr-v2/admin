"use client";

import { styled, TextField } from "@mui/material";
import { ChangeEvent, ReactNode } from "react";

interface IProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  name: string;
}

export default function ChatInput(props: IProps) {
  const {
    label,
    placeholder,
    onChange,
    value,
    className,
    children,
    disabled = false,
    name,
  } = props;

  return (
    <ExtendTextField
      disabled={disabled}
      className={className}
      type="text"
      label={label}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      slotProps={{
        input: {
          endAdornment: <>{children}</>,
        },
      }}
    />
  );
}

const ExtendTextField = styled(TextField)<{ disabled }>(({ disabled }) => {
  return {
    "&.MuiTextField-root": {
      minHeight: "unset",
    },
    "& .MuiInputBase-root .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #eee",
      borderRadius: "32px",

      ":hover": {
        border: "1px solid #eee",
      },
    },
    "& .MuiInputLabel-root": {
      fontSize: "13px",
      color: "#bcbcbc",
      paddingLeft: "8px",
    },
    "& .MuiOutlinedInput-root": {
      input: {
        fontSize: "14px",
        padding: "16.5px 0px 16.5px 24px",
      },
    },
  };
});
