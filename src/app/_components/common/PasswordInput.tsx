"use client";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, styled, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

interface IProps {
  lable: string;
  value: string;
  helperText?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function PasswordInput(props: IProps) {
  const { lable, placeholder, onChange, value, helperText, className } = props;

  const [err, setErr] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

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
      type={showPassword ? "text" : "password"}
      label={lable}
      value={value}
      onBlur={validateFn}
      placeholder={placeholder}
      helperText={err ? helperText : false}
      onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
        onChange(e.target.value)
      }
      slotProps={{
        input: {
          endAdornment: (
            <IconButton
              aria-label={
                showPassword ? "hide the password" : "display the password"
              }
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        },
      }}
    />
  );
}
