"use server";

import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

import {
  SigninRequest,
  signinRequestSchema,
  SigninResponse,
} from "@/app/_actions/account/signin/signinSchema";
import {
  ACCESS_TOKEN_EXPIRATION_TIME,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN_KEY,
} from "@/config/config";
import { TOKEN_SECRET } from "@/config/server";
import { mysqlPrisma } from "@/lib/prisma";

export type Authentication = {
  sub: string;
  uid: string;
};

export async function signinAction(
  req: SigninRequest,
): Promise<SigninResponse> {
  const validated = await signinRequestSchema.safeParse(req);
  if (validated.success === false) {
    return {
      code: "VALID_ERROR" as const,
      message: validated.error.errors[0].message,
    };
  }

  try {
    const userData = await mysqlPrisma.user.findFirst({
      where: {
        login_id: validated.data.id,
        deleted_at: null,
      },
    });

    console.log("userData", userData);
    if (userData == null) {
      return {
        code: "NOT_FOUND_USER" as const,
        message: "아이디 혹은 비밀번호를 확인해 주세요.",
      };
    }

    const comparePw = await bcrypt.compare(
      validated.data.pw,
      userData.login_pw,
    );

    if (comparePw === false) {
      return {
        code: "WRONG_PASSWORD" as const,
        message: "아이디 혹은 비밀번호를 확인해 주세요.",
      };
    }

    const payload: Authentication = {
      sub: `btb-admin-${userData.email}`,
      uid: userData.id,
    };

    console.log("payload", payload);
    const accessToken = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime(ACCESS_TOKEN_EXPIRATION_TIME!!)
      .sign(TOKEN_SECRET);

    const refreshToken = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime(REFRESH_TOKEN_EXPIRATION_TIME!!)
      .sign(TOKEN_SECRET);

    cookies().set(ACCESS_TOKEN_KEY!!, accessToken);
    cookies().set(REFRESH_TOKEN_KEY!!, refreshToken);

    return {
      code: "SUCCESS",
      message: "로그인 되었습니다." as const,
      data: userData,
    };
  } catch (error) {
    console.log(error);

    return {
      code: "ERROR" as const,
      message: "에러가 발생했습니다.",
    };
  }
}
