import { z } from "zod";

export const resetPasswordSchema = z.object({
  userId: z.string({ required_error: "아이디를 입력해 주세요." }),
  userEmail: z.string({ required_error: "이메일을 입력해 주세요." }),
  pw: z
    .string({ required_error: "비밀번호를 입력해 주세요." })
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
    .max(12, "비밀번호는 최대 12자 입니다.")
    .regex(
      /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d\W]{6,12}$/,
      "비밀번호는 영소문자와 숫자를 반드시 포함해야 합니다.",
    ),
  pwCheck: z
    .string({ required_error: "비밀번호 확인을 입력해 주세요." })
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
    .max(12, "비밀번호는 최대 12자 입니다.")
    .regex(
      /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d\W]{6,12}$/,
      "비밀번호는 영소문자와 숫자를 반드시 포함해야 합니다.",
    ),
});

export type ResetPasswordRequest = z.input<typeof resetPasswordSchema>;

export type ResetPasswordResponse =
  | {
      code: "SUCCESS";
      message?: string;
    }
  | {
      code: "VALID_ERROR" | "WRONG_PASSWORD" | "PWCHECK_ERROR";
      message: string;
    }
  | {
      code: "ERROR";
      message: string;
    };
