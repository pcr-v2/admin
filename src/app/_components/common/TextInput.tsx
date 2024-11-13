"use client";

import { Visibility } from "@mui/icons-material";
import { styled, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

interface IProps {
  label: string;
  value: string;
  helperText?: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name: string;
}

export default function TextInput(props: IProps) {
  const { label, placeholder, onChange, value, helperText, className, name } =
    props;

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
      label={label}
      name={name}
      value={value}
      onBlur={validateFn}
      placeholder={placeholder}
      helperText={err ? helperText : false}
      onChange={onChange}
    />
  );
}
