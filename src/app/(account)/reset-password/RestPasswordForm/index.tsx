"use client";

import { Box, Button, styled } from "@mui/material";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useTransition } from "react";
import toast from "react-hot-toast";

import CertificationInputs from "@/app/(account)/reset-password/RestPasswordForm/CertificationInputs";
import ChangePasswordInputs from "@/app/(account)/reset-password/RestPasswordForm/ChangePasswordInputs";
import { sendEmail } from "@/app/_actions/account/email/sendEmail";
import { resetPassword } from "@/app/_actions/account/resetPassword/resetPasswordAction";
import Loading from "@/app/_components/Loading";
import CommonButton from "@/app/_components/common/Button";
import EndAdormentInput from "@/app/_components/common/EndAdormentInput";
import TextInput from "@/app/_components/common/TextInput";
import { isEmailFormat, isPasswordFormat } from "@/lib/utils";

export default function ResetPasswordForm() {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [certificationNum, setCertificationNum] = useState("");
  const [randomCode, setRandomCode] = useState("");

  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");

  const [openCertification, setOpenCertification] = useState(false);
  const [goNext, setGoNext] = useState(false);

  const [load, setLoad] = useState<boolean | null>(null);

  const checkUserInfoAndSendEmail = async () => {
    if (userId !== "" && userEmail !== "") {
      setLoad(true);
    }

    if (userId === "") {
      toast.error("아이디를 입력해 주세요.");
      setLoad(false);
      return;
    }
    if (userEmail === "") {
      toast.error("이메일을 입력해 주세요.");
      setLoad(false);
      return;
    }
    const validEmailRes = isEmailFormat(userEmail);
    if (userEmail !== "" && validEmailRes === false) {
      setLoad(false);
      toast.error("이메일 양식을 확인해 주세요.");
      return;
    }

    const res = await sendEmail({
      userId: userId,
      userEmail: userEmail,
      type: "resetPassword",
    });

    if (
      res.code === "NOT_FOUND_USER_EMAIL" ||
      res.code === "NOT_FOUND_USER_NAME"
    ) {
      setLoad(false);
      toast.error("이름이나 아이디를 다시 한 번 확인해주세요.");
      return;
    }

    if (res.code !== "SUCCESS") {
      setLoad(false);
      toast.error(res.message);
      return;
    }
    setLoad(false);
    toast.success("인증번호가 전송 되었습니다.");
    setRandomCode(res.randomCode as string);
    setOpenCertification(true);
  };

  const handleValidateCertificationNum = () => {
    if (randomCode !== certificationNum) {
      toast.error("인증 번호를 확인해 주세요.");
      return;
    }
    toast.success("인증 되었습니다.");
    setGoNext(true);
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "id") {
      setUserId(value);
      return;
    }
    if (name === "email") {
      setUserEmail(value);
      return;
    }
    if (name === "certificationNum") {
      setCertificationNum(value);
      return;
    }

    if (name === "pw") {
      setPw(value);
      return;
    }
    if (name === "pwCheck") {
      setPwCheck(value);
      return;
    }
  };

  const handleBtn = async () => {
    if (pw !== pwCheck) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }

    const res = await resetPassword({
      userId,
      userEmail,
      pw,
      pwCheck,
    });

    if (res.code !== "SUCCESS") {
      toast.error(res.message);
    }

    toast.success(res.message as string);
    router.push("/signin");
  };

  return (
    <>
      <Loading loading={load ?? false} />

      <TopContents>
        <Text>
          <Title>비밀번호 변경하기</Title>
          {goNext === false ? (
            <Description>
              가입하신 아이디를 통해 인증 절차를 진행해 주세요!
            </Description>
          ) : (
            <Description>변경하실 비밀번호를 입력해 주세요.</Description>
          )}
        </Text>

        <Inputs>
          {goNext === false ? (
            <CertificationInputs
              userId={userId}
              userEmail={userEmail}
              certificationNum={certificationNum}
              openCertification={openCertification}
              onChangeInput={onChangeInput}
              checkUserInfoAndSendEmail={checkUserInfoAndSendEmail}
              handleValidateCertificationNum={handleValidateCertificationNum}
            />
          ) : (
            <ChangePasswordInputs
              pw={pw}
              pwCheck={pwCheck}
              onChangeInput={onChangeInput}
            />
          )}
        </Inputs>
      </TopContents>

      <BottomContent>
        <FindBox>
          <SpanST onClick={() => alert("010-2024-7490으로 문의주세요.")}>
            관리자 문의
          </SpanST>
          <Divider />
          <SpanST onClick={() => router.push("/find-id")}>아이디 찾기</SpanST>
        </FindBox>
        <CommonButton
          disable={!goNext}
          variant="contained"
          text={goNext ? "비밀번호 변경하기" : "다음"}
          onClick={handleBtn}
        />
      </BottomContent>
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

const FindedUserId = styled(Box)(() => {
  return {
    fontWeight: 400,
    fontSize: "32px",
    whiteSpace: "nowrap",
    letterSpacing: "8px",
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

const EndAdormentButton = styled(Button)(() => {
  return {
    fontWeight: 500,
    fontSize: "12px",
    paddin: "8px 10px",
    borderRadius: "8px",
    whiteSpace: "nowrap",
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

const BottomContent = styled(Box)(() => {
  return {
    gap: "24px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  };
});
