import { z } from "zod";

export type TUserInfo = {
  id: string;
  name: string;
  phone_no: string;
  type: string;
  email: string;
  login_id: string;
  login_pw: string;
  created_at: Date;
  deleted_at: Date | null;
  updated_at: Date | null;
};

export const signinRequestSchema = z.object({
  id: z.string({ required_error: "아이디를 입력해 주세요." }),
  pw: z
    .string({ required_error: "비밀번호를 입력해 주세요." })
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
    .max(12, "비밀번호는 최대 12자 입니다.")
    .regex(
      /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d\W]{6,12}$/,
      "비밀번호는 영소문자와 숫자를 반드시 포함해야 합니다.",
    ),
});

export type SigninRequest = z.input<typeof signinRequestSchema>;

export type SigninResponse =
  | {
      code: "SUCCESS";
      message?: string;
      data: TUserInfo;
    }
  | {
      code: "VALID_ERROR" | "NOT_FOUND_USER" | "WRONG_PASSWORD";
      message: string;
    }
  | {
      code: "ERROR";
      message: string;
    };
