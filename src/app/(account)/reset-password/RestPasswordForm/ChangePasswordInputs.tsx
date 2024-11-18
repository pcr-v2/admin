"use client";

import { Box, styled } from "@mui/material";
import { ChangeEvent } from "react";

import PasswordInput from "@/app/_components/common/PasswordInput";

interface IProps {
  pw: string;
  pwCheck: string;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function ChangePasswordInputs(props: IProps) {
  const { pw, pwCheck, onChangeInput } = props;

  return (
    <Wrapper>
      <PasswordInput
        label="비밀번호"
        name="pw"
        value={pw}
        helperText="비밀번호를 입력해주세요."
        onChange={onChangeInput}
      />
      <PasswordInput
        label="비밀번호 확인"
        name="pwCheck"
        value={pwCheck}
        helperText="비밀번호 확인을 입력해주세요."
        onChange={onChangeInput}
      />
    </Wrapper>
  );
}

const Wrapper = styled(Box)(() => {
  return {
    gap: "24px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  };
});
