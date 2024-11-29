"use client";

import { InputAdornment, styled, TextField } from "@mui/material";
import { ChangeEvent, ReactNode } from "react";

import { mappingEmoji } from "@/lib/utils";

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

  const getSafeHtml = (text: string) => {
    // 텍스트에서 이모지를 HTML로 변환 (mappingEmoji 함수 사용)
    console.log("text", text);

    return mappingEmoji(text);
  };

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
      // dangerouslySetInnerHTML={{__html:getSafeHtml(valu)}}
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

      "& :hover": {
        border: "1px solid #eee",
      },
      "&:hover": {
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
