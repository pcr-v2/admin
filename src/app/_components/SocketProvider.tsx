"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket, io as ClientIO } from "socket.io-client";

interface IProps {
  children: ReactNode;
}

export interface IMessage {
  userName: string;
  content: string;
  profileImg?: string;
}

interface IServerToClientEvents {
  message: (data: IMessage) => void;
  connect: () => void;
  disconnect: () => void;
  onUserJoin: (userInfo: { userName: string; profileImg: string }) => void;
}

interface IClientToServerEvents {
  sendMessage: (data: IMessage) => void;
  onUserJoin: (userInfo: { userName: string; profileImg: string }) => void;
}

type TSocket = Socket<IServerToClientEvents, IClientToServerEvents>;

type TSocketContext = {
  socket: TSocket | null;
  connectedUsers: { userName: string; profileImg: string };
  isConnected: boolean;
  onUserJoin: (userInfo: { userName: string; profileImg: string }) => void; // 접속한 유저 처리 함수
};

const SocketContext = createContext<TSocketContext>({
  socket: null,
  isConnected: false,
  connectedUsers: { userName: "", profileImg: "" },
  onUserJoin: () => {},
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export default function SocketProvider(props: IProps) {
  const { children } = props;

  const [socket, setSocket] = useState<TSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  // const [userName, setUserName] = useState<string | null>(null);
  const [connectedUsers, setConnectedUsers] = useState<{
    userName: string;
    profileImg: string;
  }>({ userName: "", profileImg: "" });

  const onUserJoin = (userInfo: { userName: string; profileImg: string }) => {
    // console.log("Previous connectedUsers:", connectedUsers);
    setConnectedUsers(userInfo);
  };

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("disconnect");
    };
  }, [socket]);

  useEffect(() => {
    const socketInstance: TSocket = ClientIO("http://192.168.3.20:2024", {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });
    socketInstance.on("connect", () => setIsConnected(true));
    socketInstance.on("disconnect", () => setIsConnected(false));
    socketInstance.on("onUserJoin", onUserJoin);

    setSocket(socketInstance);

    return () => {
      socketInstance.off("connect");
      socketInstance.off("disconnect");
      socketInstance.off("onUserJoin", onUserJoin);

      socketInstance.disconnect();
    };
  }, []);
  return (
    <SocketContext.Provider
      value={{ socket, isConnected, onUserJoin, connectedUsers }}
    >
      {children}
    </SocketContext.Provider>
  );
}
