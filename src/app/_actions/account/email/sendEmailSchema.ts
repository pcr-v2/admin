import { z } from "zod";

export type TUser = {
  type: string;
  id: string;
  name: string;
  phone_no: string;
  email: string;
  login_id: string;
  login_pw: string;
  created_at: Date;
  deleted_at: Date | null;
  updated_at: Date | null;
};

export const sendEmailSchema = z.object({
  userName: z.string({ required_error: "이름을 입력해 주세요." }).optional(),
  userId: z.string({ required_error: "아이디를 입력해 주세요." }).optional(),
  userEmail: z.string({ required_error: "이메일을 입력해 주세요." }),
  type: z.enum(["findId", "resetPassword"]),
});

export type SendEmailRequest = z.input<typeof sendEmailSchema>;

export type SendEmailResponse =
  | {
      code: "SUCCESS";
      message: string;
      randomCode?: string;
      userId: string;
    }
  | {
      code:
        | "SEND_EMAIL_ERROR"
        | "VALID_ERROR"
        | "NOT_FOUND_USER_NAME"
        | "NOT_FOUND_USER_EMAIL"
        | "NOT_FOUND_USER_ID";
      message: string;
    }
  | {
      code: "ERROR";
      message: string;
    };
