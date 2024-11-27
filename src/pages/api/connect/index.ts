"use server";

import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: any) {
  if (req.method === "POST") {
    const userInfo = req.body;
    console.log("message22", req.body);
    res?.socket?.server?.io?.emit("onUserJoin", userInfo);
    res.status(201).json(userInfo);
  }
}
