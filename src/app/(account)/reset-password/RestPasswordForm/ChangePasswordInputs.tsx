"use client";

import PasswordInput from "@/app/_components/common/PasswordInput";

interface IProps {}

export default function ChangePasswordInputs(props: IProps) {
  const {} = props;
  return (
    <>
      <PasswordInput
        label="비밀번호"
        name="pw"
        value={""}
        helperText="비밀번호를 입력해주세요."
        onChange={() => {}}
      />
      <PasswordInput
        label="비밀번호 확인"
        name="pw"
        value={""}
        helperText="비밀번호를 한번 더 입력해주세요."
        onChange={() => {}}
      />
    </>
  );
}
