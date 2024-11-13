"use client";

import { styled, TextField } from "@mui/material";
import { ChangeEvent, ReactNode, useState } from "react";

interface IProps {
  label: string;
  value: string;
  helperText?: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  name: string;
}

export default function EndAdormentInput(props: IProps) {
  const {
    label,
    placeholder,
    onChange,
    value,
    helperText,
    className,
    children,
    disabled = false,
    name,
  } = props;

  const [err, setErr] = useState(false);

  const validateFn = () => {
    if (value === "") {
      setErr(true);
    } else {
      setErr(false);
    }
  };

  return (
    <ExtendTextField
      disabled={disabled}
      className={className}
      error={err}
      type="text"
      label={label}
      name={name}
      value={value}
      onBlur={validateFn}
      placeholder={placeholder}
      helperText={err ? helperText : false}
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
    // "&.MuiTextField-root": {
    //   "& .MuiOutlinedInput-root": {
    //     // backgroundColor: disabled ? "#e0e0e0" : "",
    //   },
    // },
    // "& .MuiInputBase-root .MuiOutlinedInput-notchedOutline": {
    //   //   border: disabled ? "1px solid #9e9e9e" : "",
    // },
  };
});
