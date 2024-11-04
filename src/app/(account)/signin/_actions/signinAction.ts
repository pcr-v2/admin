"use server";

import bcrypt from "bcryptjs";

import { mysqlPrisma } from "@/lib/prisma";

export async function signinAction(req: string) {
  const test = await mysqlPrisma.user.findFirst({
    where: {
      name: "test",
    },
  });

  const res = await bcrypt.compare(req, test.login_pw);

  if (res) {
    {
      return true;
    }
  } else {
    return false;
  }
}
