"use server";

import { Server as NetServer } from "http";
import { Socket } from "net";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";

type ServerWithIO = NetServer & {
  io?: ServerIO;
};

type SocketWithServerIO = Socket & {
  server: ServerWithIO;
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: SocketWithServerIO;
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server;
    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
      cors: {
        origin: "http://192.168.3.20:2024", // 클라이언트의 URL
        credentials: true, // 쿠키 공유 위함
      },
    });
    res.socket.server.io = io;
  }
};
export default ioHandler;
