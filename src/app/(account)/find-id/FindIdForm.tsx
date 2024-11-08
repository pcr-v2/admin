"use client";

import { Box, styled } from "@mui/material";
import bcrypt from "bcryptjs";
import toast from "react-hot-toast";
import { v4 } from "uuid";

import { sendEmail } from "@/app/(account)/_actions/sendEmail";
import CommonButton from "@/app/_components/common/Button";
import TextInput from "@/app/_components/common/TextInput";

export default function FindIdForm() {
  const id = v4();

  console.log(" ", id);

  const test = async () => {
    const password = await bcrypt.hash("test1234", 10);
    console.log(password);
  };

  const send = async () => {
    const res = await sendEmail({
      userName: "test",
      userEmail: "qkrcjffus@naver.com",
    });

    if (res.code !== "SUCCESS") {
      toast.error(res.message);
    }
  };

  return (
    <>
      <TopContents>
        <Text>
          <Title onClick={() => test()}>아이디 찾기</Title>
          <Description>
            가입하신 이메일을 통해 인증 절차를 진행해 주세요!
          </Description>
        </Text>

        <Inputs>
          <TextInput
            lable="이름"
            value={""}
            helperText="이름을 입력해주세요"
            onChange={(value: string) => {}}
          />
          <TextInput
            lable="이메일"
            value={""}
            helperText="이메일을 입력해주세요."
            onChange={(value: string) => {}}
          />
          <TextInput
            lable="인증 번호"
            value={""}
            helperText="인증 번호를 입력해주세요."
            onChange={(value: string) => {}}
          />
        </Inputs>
      </TopContents>

      <CommonButton variant="contained" text="다음" onClick={() => send()} />
    </>
  );
}

const TopContents = styled(Box)(() => {
  return {
    gap: "48px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };
});

const Text = styled(Box)(() => {
  return {
    gap: "8px",
    width: "100%",
    display: "flex",
    textAlign: "center",
    wordBreak: "keep-all",
    flexDirection: "column",
    justifyContent: "center",
  };
});

const Title = styled(Box)(() => {
  return {
    fontWeight: 900,
    fontSize: "32px",
  };
});

const Description = styled(Box)(() => {
  return {
    fontWeight: 400,
    fontSize: "16px",
  };
});

const Inputs = styled(Box)(() => {
  return {
    gap: "12px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  };
});
