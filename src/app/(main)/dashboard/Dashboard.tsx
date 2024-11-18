"use client";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import axios from "axios";
import React, { useState, useEffect } from "react";

import { useSocket } from "@/app/_components/SocketProvider";

interface IProps {
  res: any;
}

interface IMessage {
  userName: string;
  content: string;
}

export default function Dashboard(props: IProps) {
  const { res } = props;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const { socket, isConnected } = useSocket();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("알림 권한이 허용되었습니다.");
        } else {
          console.log("알림 권한이 거부되었습니다.");
        }
      });
    }
    if (res) {
      setUserName(res?.data?.name);
    }
  }, [res]);

  useEffect(() => {
    if (!socket) return;

    socket.on("message", (data: IMessage) => {
      setMessages((prevMessages) => [...prevMessages, data]); // 새로운 메시지 추가

      // 알림 표시
      if (Notification.permission === "granted") {
        new Notification(`${data.userName}`, {
          body: data.content,
          icon: "/path-to-icon.png", // 알림 아이콘 (선택 사항)
        });
      }
    });

    return () => {
      socket.off("message"); // 이벤트 해제
    };
  }, [socket]);

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!currentMessage.trim()) return; // 빈 메시지 방지

    await axios.post("/api/chat", {
      userName: userName,
      content: currentMessage,
    });

    setCurrentMessage(""); // 입력창 초기화
  };

  return (
    <div>
      <div>
        <p>{isConnected ? `연결 완료 ${userName}!!` : "연결중"}</p>
        {/* <p>{userName ? userName : "연결중"}</p> */}
      </div>
      <div>
        <div>
          {messages.map((message, index) => (
            <div key={index}>
              {message?.userName} :: {message.content}
            </div>
          ))}
        </div>
      </div>
      <div>
        <form>
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          ></input>
          <button type="submit" onClick={(e) => sendMessage(e)}>
            전송
          </button>
        </form>
      </div>
    </div>
  );
}
