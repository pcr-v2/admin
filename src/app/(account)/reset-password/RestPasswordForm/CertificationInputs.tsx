"use client";

import { Button, styled } from "@mui/material";
import { ChangeEvent } from "react";

import EndAdormentInput from "@/app/_components/common/EndAdormentInput";
import TextInput from "@/app/_components/common/TextInput";

interface IProps {
  userId: string;
  userEmail: string;
  certificationNum: string;
  openCertification: boolean;
  handleValidateCertificationNum: () => void;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  checkUserInfoAndSendEmail: () => void;
}

export default function CertificationInputs(props: IProps) {
  const {
    userId,
    userEmail,
    certificationNum,
    openCertification,
    onChangeInput,
    checkUserInfoAndSendEmail,
    handleValidateCertificationNum,
  } = props;

  return (
    <>
      <TextInput
        label="아이디"
        name="id"
        value={userId}
        helperText="아이디를 입력해주세요"
        onChange={onChangeInput}
      />

      <EndAdormentInput
        label="이메일"
        value={userEmail}
        name="email"
        helperText="이메일을 입력해주세요"
        onChange={onChangeInput}
        children={
          <EndAdormentButton
            variant="contained"
            onClick={checkUserInfoAndSendEmail}
          >
            인증요청
          </EndAdormentButton>
        }
        disabled={false}
      />
      <EndAdormentInput
        label="인증번호"
        value={certificationNum}
        name="certificationNum"
        helperText="인증번호를 입력해 주세요."
        onChange={onChangeInput}
        children={
          <EndAdormentButton
            variant="contained"
            disabled={!openCertification}
            onClick={handleValidateCertificationNum}
          >
            확인
          </EndAdormentButton>
        }
        disabled={false}
      />
    </>
  );
}

const EndAdormentButton = styled(Button)(() => {
  return {
    fontWeight: 500,
    fontSize: "12px",
    paddin: "8px 10px",
    borderRadius: "8px",
    whiteSpace: "nowrap",
  };
});
