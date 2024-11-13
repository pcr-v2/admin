"use server";

import { Prisma } from "@prisma/client";
import nodemailer from "nodemailer";

import {
  SendEmailRequest,
  SendEmailResponse,
  sendEmailSchema,
  TUser,
} from "@/app/_actions/account/email/sendEmailSchema";
import { mysqlPrisma } from "@/lib/prisma";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  // 아래 secure 옵션을 사용하려면 465 포트를 사용해야함
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    // 초기에 설정해둔 env 데이터
    user: process.env.NEXT_PUBLIC_AUTH_USER,
    pass: process.env.NEXT_PUBLIC_AUTH_PASSWORD,
  },
});

export async function sendEmail(
  req: SendEmailRequest,
): Promise<SendEmailResponse> {
  const validated = await sendEmailSchema.safeParse(req);

  if (validated.success === false) {
    return {
      code: "VALID_ERROR" as const,
      message: validated.error.errors[0].message,
    };
  }

  let findIdWhere = {};
  let resetPwWhere = {};

  if (validated.data.type === "findId") {
    findIdWhere = {
      name: validated.data.userName,
      email: validated.data.userEmail,
    };
  }
  if (validated.data.type === "resetPassword") {
    resetPwWhere = {
      login_id: validated.data.userId,
      email: validated.data.userEmail,
    };
  }

  const checkedUser = await mysqlPrisma.user.findFirst({
    where: validated.data.type === "findId" ? findIdWhere : resetPwWhere,
  });

  if (checkedUser == null)
    return {
      code: "NOT_FOUND_USER_NAME",
      message: "존재하지 않는 유저 입니다.",
    };

  const randomCode = Math.floor(100000 + Math.random() * 900000).toString();

  const mailData = {
    to: "qkrcjffus@naver.com",
    subject: `[btb-admin 인증 번호]`,
    from: checkedUser.email,
    html: `
        <h3>btb-admin에서<br/> 인증 번호를 전송해 드렸습니다.</h3>
        
        <div>아래의 인증번호를 입력해 주세요.</div>
        <div>${randomCode}</div>
        <br/>
        <p>보낸사람: frontendtt@gmail.com</p>
      `,
  };

  try {
    const res = await transporter.sendMail(mailData);
    if (res.accepted.length > 0) {
      return {
        code: "SUCCESS",
        message: "인증 번호가 전송되었습니다.",
        randomCode: randomCode,
        userId: checkedUser.login_id,
      };
    } else {
      return {
        code: "SEND_EMAIL_ERROR",
        message: "이메일 전송에 실패했습니다. 관리자에게 문의해 주세요",
      };
    }
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      code: "SEND_EMAIL_ERROR",
      message: "이메일 전송에 실패했습니다. 관리자에게 문의해 주세요 ",
    };
  }
}
