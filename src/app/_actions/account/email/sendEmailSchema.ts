import { z } from "zod";

export const sendEmailSchema = z.object({
  userName: z.string({ required_error: "이름을 입력해 주세요." }),
  userEmail: z.string({ required_error: "이메일을 입력해 주세요." }),
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
        | "NOT_FOUND_USER_EMAIL";
      message: string;
    }
  | {
      code: "ERROR";
      message: string;
    };
