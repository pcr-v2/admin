import { z } from "zod";

export type TUserInfo = {
  id: string;
  name: string;
  phone_no: string;
  type: string;
  email: string;
  login_id: string;
  login_pw: string;
  create_at: Date;
  deleted_at: Date | null;
  updated_at: Date | null;
};

export const signinRequestSchema = z.object({
  id: z.string({ required_error: "아이디를 입력해 주세요." }),
  pw: z.string({ required_error: "비밀번호를 입력해 주세요." }),
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
