"use client";

import { Box, styled } from "@mui/material";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

import { signinAction } from "@/app/_actions/account/signin/signinAction";
import { SigninRequest } from "@/app/_actions/account/signin/signinSchema";
import CommonButton from "@/app/_components/common/Button";
import PasswordInput from "@/app/_components/common/PasswordInput";
import TextInput from "@/app/_components/common/TextInput";
import logo from "@/assets/logo/main-logo.png";

export default function SigninForm() {
  const router = useRouter();

  const [signinValues, setSigninValues] = useState({
    id: "",
    pw: "",
  });

  const handleLogin = async (request: SigninRequest) => {
    if (request.id === "") {
      return toast.error("아이디를 입력해 주세요");
    }
    if (request.pw === "") {
      return toast.error("비밀번호를 입력해 주세요");
    }

    const res = await signinAction(request);

    if (res.code === "SUCCESS") {
      toast.success(res.message as string);
      router.push("/dashboard");
      return;
    } else {
      toast.error(res.message);
      return;
    }
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "id") {
      setSigninValues({ ...signinValues, id: value });
      return;
    }
    if (name === "pw") {
      setSigninValues({ ...signinValues, pw: value });
      return;
    }
  };

  return (
    <>
      <TopContent>
        <LogoImg src={logo.src} alt="logo" />

        <Inputs>
          <TextInput
            label="아이디"
            name="id"
            value={signinValues.id}
            helperText="아이디를 입력해주세요."
            onChange={onChangeInput}
          />
          <PasswordInput
            label="비밀번호"
            name="pw"
            value={signinValues.pw}
            helperText="비밀번호를 입력해주세요."
            onChange={onChangeInput}
          />
        </Inputs>
      </TopContent>

      <BottomContents>
        <FindBox>
          <SpanST onClick={() => router.push("/find-id")}>아이디 찾기</SpanST>
          <Divider />
          <SpanST onClick={() => router.push("/reset-password")}>
            비밀번호 변경하기
          </SpanST>
        </FindBox>
        <CommonButton
          variant="contained"
          text="로그인"
          onClick={() =>
            handleLogin({ id: signinValues.id, pw: signinValues.pw })
          }
        />
        <CommonButton
          variant="outlined"
          text="회원가입"
          onClick={() => router.push("/signup")}
        />
      </BottomContents>
    </>
  );
}

const TopContent = styled(Box)(() => {
  return {
    gap: "48px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    "@media (max-width:448px)": {
      gap: "12vw",
    },
  };
});

const LogoImg = styled("img")(() => {
  return {
    width: "100%",
  };
});

const Inputs = styled(Box)(() => {
  return {
    gap: "12px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",

    "@media (max-width:448px)": {
      gap: "3vw",
    },
  };
});

const BottomContents = styled(Box)(() => {
  return {
    gap: "24px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    "@media (max-width:448px)": {
      // gap: "8vw",
    },
  };
});

const FindBox = styled(Box)(() => {
  return {
    gap: "12px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
});

const SpanST = styled("span")(() => {
  return {
    fontSize: "14px",
    cursor: "pointer",
    color: "#424242",
  };
});

const Divider = styled(Box)(() => {
  return {
    width: "1px",
    height: "12px",
    backgroundColor: "#424242",
  };
});
