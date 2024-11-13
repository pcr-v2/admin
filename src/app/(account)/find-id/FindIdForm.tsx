"use client";

import { Box, Button, styled } from "@mui/material";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

import { sendEmail } from "@/app/_actions/account/email/sendEmail";
import Loading from "@/app/_components/Loading";
import CommonButton from "@/app/_components/common/Button";
import EndAdormentInput from "@/app/_components/common/EndAdormentInput";
import TextInput from "@/app/_components/common/TextInput";
import { isEmailFormat } from "@/lib/utils";

export default function FindIdForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [certificationNum, setCertificationNum] = useState("");
  const [randomCode, setRandomCode] = useState("");

  const [openCertification, setOpenCertification] = useState(false);
  const [goNext, setGoNext] = useState(false);

  const [userIdResult, setUserIdResult] = useState({ show: false, userId: "" });

  const [load, setLoad] = useState(null);

  const checkUserInfoAndSendEmail = async () => {
    setLoad(true);

    if (name === "") {
      toast.error("이름을 확인해 주세요.");
      setLoad(false);
      return;
    }
    if (email === "") {
      toast.error("이메일을 확인해 주세요.");
      setLoad(false);
      return;
    }
    const validEmailRes = isEmailFormat(email);
    if (email !== "" && validEmailRes === false) {
      setLoad(false);
      toast.error("이메일 양식을 확인해 주세요.");
      return;
    }

    const res = await sendEmail({
      userName: name,
      userEmail: email,
    });

    if (
      res.code === "NOT_FOUND_USER_EMAIL" ||
      res.code === "NOT_FOUND_USER_NAME"
    ) {
      setLoad(false);
      toast.error("이름이나 이메일을 다시 한 번 확인해주세요.");
      return;
    }

    if (res.code !== "SUCCESS") {
      setLoad(false);
      toast.error(res.message);
      return;
    }
    setLoad(false);
    toast.success("인증번호가 전송 되었습니다.");
    setRandomCode(res.randomCode);
    setOpenCertification(true);
    setUserIdResult({ ...userIdResult, userId: res.userId });
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

    if (name === "name") {
      setName(value);
      return;
    }
    if (name === "email") {
      setEmail(value);
      return;
    }
    if (name === "certificationNum") {
      setCertificationNum(value);
      return;
    }
  };

  const handleBtn = () => {
    if (userIdResult.show === false) {
      setUserIdResult({ ...userIdResult, show: true });
      return;
    }
    router.push("/signin");
  };

  return (
    <>
      <Loading loading={load} />
      <TopContents>
        <Text>
          <Title>아이디 찾기</Title>
          {userIdResult.show === false ? (
            <Description>
              가입하신 이메일을 통해 인증 절차를 진행해 주세요!
            </Description>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              <Description>가입하신 아이디는 다음과 같습니다!</Description>
              <FindedUserId>{userIdResult.userId}</FindedUserId>
            </Box>
          )}
        </Text>

        {userIdResult.show === false && (
          <Inputs>
            <TextInput
              label="이름"
              name="name"
              value={name}
              helperText="이름을 입력해주세요"
              onChange={onChangeInput}
            />

            <EndAdormentInput
              label="이메일"
              value={email}
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
          </Inputs>
        )}
      </TopContents>

      <BottomContent>
        {userIdResult.show && (
          <FindBox>
            <SpanST onClick={() => alert("010-2024-7490으로 문의주세요.")}>
              관리자 문의
            </SpanST>
            <Divider />
            <SpanST onClick={() => router.push("/find-password")}>
              비밀번호 찾기
            </SpanST>
          </FindBox>
        )}
        <CommonButton
          disable={!goNext}
          variant="contained"
          text={userIdResult.show ? "로그인 하기" : "다음"}
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
    fontWeight: 700,
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
