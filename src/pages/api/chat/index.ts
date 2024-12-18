"use server";

import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: any) {
  if (req.method === "POST") {
    const message = req.body;
    console.log("message22", req.body);
    res?.socket?.server?.io?.emit("message", message);
    res?.socket?.server?.io?.emit("onUserJoin", message.userName);
    res.status(201).json(message);
  }
}
