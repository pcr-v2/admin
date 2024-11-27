import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import "server-only";

import {
  GetUserResponse,
  TAuth,
} from "@/app/_actions/account/auth/getUserSchema";
import { ACCESS_TOKEN_KEY } from "@/config/config";
import { TOKEN_SECRET } from "@/config/server";
import { mysqlPrisma } from "@/lib/prisma";

// react/cache 생명주기: 렌더링 과정에서 여러 서버 컴포넌트에서 부를 때, 한 요청 끝나면 캐시 사라짐
export const getUser = cache(async (): Promise<GetUserResponse> => {
  const accessToken = cookies().get(ACCESS_TOKEN_KEY!!);

  if (accessToken == null) {
    throw redirect("/signin");
  }

  try {
    const verified = await jwtVerify<TAuth>(accessToken?.value, TOKEN_SECRET);

    //TODO1113: 추가적으로 조인해서 가져와야할 유저의 기본정보 필요 가능성
    const userResult = await mysqlPrisma.user.findUnique({
      where: {
        id: verified.payload.uid,
        deleted_at: null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone_no: true,
        type: true,
        login_id: true,
        created_at: true,
        profile_img: true,
      },
    });

    if (userResult == null) {
      throw redirect("/signin");
    }

    return {
      code: "SUCCESS",
      data: userResult,
    };
  } catch (error) {
    throw redirect("/signin");
  }
});
