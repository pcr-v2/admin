"use server";

import bcrypt from "bcryptjs";

import {
  ResetPasswordRequest,
  ResetPasswordResponse,
  resetPasswordSchema,
} from "@/app/_actions/account/resetPassword/resetPasswordSchema";
import { mysqlPrisma } from "@/lib/prisma";

export async function resetPassword(
  req: ResetPasswordRequest,
): Promise<ResetPasswordResponse> {
  const validated = await resetPasswordSchema.safeParse(req);
  if (validated.success === false) {
    return {
      code: "VALID_ERROR",
      message: validated.error.errors[0].message,
    };
  }

  if (validated.data.pw !== validated.data.pwCheck) {
    return {
      code: "PWCHECK_ERROR",
      message: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
    };
  }

  try {
    const hashedPw = await bcrypt.hash(validated.data.pw.trim(), 10);

    const resetPassword = await mysqlPrisma.user.update({
      where: {
        login_id: validated.data.userId,
        email: validated.data.userEmail,
        deleted_at: null,
      },
      data: {
        login_pw: hashedPw,
      },
    });

    console.log("resetPassword", resetPassword);

    if (resetPassword == null) {
      return {
        code: "ERROR",
        message: "비밀번호 변경중 에러가 발생했습니다.",
      };
    }

    return {
      code: "SUCCESS",
      message: "비밀번호 변경에 성공했습니다.",
    };
  } catch (error) {
    console.log("error", error);

    return {
      code: "ERROR",
      message: error,
    };
  }
}
