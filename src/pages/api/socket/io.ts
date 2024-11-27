"use server";

import { Server as NetServer } from "http";
import { Socket } from "net";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO, Socket as SocketIO } from "socket.io";

type ServerWithIO = NetServer & {
  io?: ServerIO;
};

type SocketWithServerIO = Socket & {
  server: ServerWithIO;
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: SocketWithServerIO;
};

// const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
//   if (!res.socket.server.io) {
//     const path = "/api/socket/io";
//     const httpServer: NetServer = res.socket.server;
//     const io = new ServerIO(httpServer, {
//       path: path,
//       addTrailingSlash: false,
//       cors: {
//         origin: "http://192.168.3.20:2024", // 클라이언트의 URL
//         credentials: true, // 쿠키 공유 위함
//       },
//     });
//     res.socket.server.io = io;
//   }
// };

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

    // 브로드캐스트 로직 추가
    io.on("connection", (socket: SocketIO) => {
      console.log("사용자 연결됨:", socket.id);

      // 메시지를 모든 클라이언트에게 브로드캐스트
      socket.on("sendMessage", (data) => {
        console.log("메시지 수신:", data);
        socket.broadcast.emit("message", data); // 다른 클라이언트에 브로드캐스트
      });

      // 연결 해제 이벤트 처리
      socket.on("disconnect", () => {
        console.log("사용자 연결 해제:", socket.id);
        socket.broadcast.emit("user-disconnected", { userId: socket.id });
      });
    });

    res.socket.server.io = io;
    console.log("Socket.IO 서버가 초기화되었습니다.");
  } else {
    console.log("Socket.IO 서버가 이미 실행 중입니다.");
  }
  res.end();
};

export default ioHandler;
