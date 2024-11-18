"use client";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, styled, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

import { isPasswordFormat } from "@/lib/utils";

interface IProps {
  label: string;
  value: string;
  helperText?: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name: string;
}

export default function PasswordInput(props: IProps) {
  const { label, placeholder, onChange, value, helperText, className, name } =
    props;

  const [err, setErr] = useState(false);
  const [valid, setValid] = useState({
    validErr: false,
    validText: "6~12자의 영문 대/소문자, 숫자, 특수문자 조합을 사용해 주세요.",
  });
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
    } else if (!isPasswordFormat(value)) {
      setErr(true);
      setValid({ ...valid, validErr: true });
    } else {
      setValid({ ...valid, validErr: false });
      setErr(false);
    }
  };

  const handleHelperText = () => {
    if (err && !valid.validErr) {
      return helperText;
    }
    if (err && valid.validErr) {
      return valid.validText;
    }
    return false;
  };

  return (
    <TextField
      className={className}
      error={err}
      type={showPassword ? "text" : "password"}
      label={label}
      value={value}
      onBlur={validateFn}
      name={name}
      placeholder={placeholder}
      helperText={handleHelperText()}
      onChange={onChange}
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
