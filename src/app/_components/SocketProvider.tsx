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

interface IMessage {
  userName: string;
  content: string;
}

interface IServerToClientEvents {
  message: (data: IMessage) => void;
  connect: () => void;
  disconnect: () => void;
}

interface IClientToServerEvents {
  sendMessage: (data: IMessage) => void;
}

type TSocket = Socket<IServerToClientEvents, IClientToServerEvents>;

type TSocketContext = {
  socket: TSocket | null;
  isConnected: boolean;
};

const SocketContext = createContext<TSocketContext>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export default function SocketProvider(props: IProps) {
  const { children } = props;

  const [socket, setSocket] = useState<TSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

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
    const socketInstance: TSocket = ClientIO("http://192.168.3.20:3000", {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });

    socketInstance.on("connect", () => setIsConnected(true));
    socketInstance.on("disconnect", () => setIsConnected(false));

    setSocket(socketInstance);

    return () => {
      socketInstance.off("connect");
      socketInstance.off("disconnect");
      socketInstance.disconnect();
    };
  }, []);
  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}
