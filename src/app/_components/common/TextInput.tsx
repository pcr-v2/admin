"use client";

import { Visibility } from "@mui/icons-material";
import { styled, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

interface IProps {
  lable: string;
  value: string;
  helperText?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function TextInput(props: IProps) {
  const { lable, placeholder, onChange, value, helperText, className } = props;

  const [err, setErr] = useState(false);

  const validateFn = () => {
    if (value === "") {
      setErr(true);
    } else {
      setErr(false);
    }
  };

  return (
    <TextField
      className={className}
      error={err}
      type="text"
      label={lable}
      value={value}
      onBlur={validateFn}
      placeholder={placeholder}
      helperText={err ? helperText : false}
      onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
        onChange(e.target.value)
      }
    />
  );
}
