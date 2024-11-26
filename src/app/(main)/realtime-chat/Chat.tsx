"use client";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

import { GetUserResponse } from "@/app/_actions/account/auth/getUserSchema";
import { useSocket } from "@/app/_components/SocketProvider";

interface IProps {
  res: GetUserResponse;
}

interface IMessage {
  userName: string;
  content: string;
}

export default function Chat(props: IProps) {
  const { res } = props;
  const { socket, isConnected } = useSocket();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [userName, setUserName] = useState("");

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 0);
  };

  useEffect(() => {
    if (res) {
      setUserName(res?.data?.name);
    }
  }, [res]);

  useEffect(() => {
    const handleMessage = async (data: IMessage) => {
      console.log("data ", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };
    scrollToBottom();

    socket?.on("message", handleMessage);
    return () => {
      socket?.off("message", handleMessage);
    };
  }, [socket, messages]);

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!currentMessage.trim()) return;

    try {
      await axios.post("/api/chat", {
        userName,
        content: currentMessage,
      });
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    }

    setCurrentMessage("");
  };

  console.log("isConnected", isConnected);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // minHeight: "200vh",
      }}
    >
      <h5>{isConnected ? `연결 완료 ${userName}!!` : "연결중"}</h5>
      <Box
        sx={{
          maxWidth: "600px",
          width: "100%",
          height: "300px",
          maxHeight: "300px",
          overflowY: "auto",
          border: "1px solid #9e9e9e",
          borderRadius: "32px",
          padding: "32px",
          gap: "20px",
          display: "flex",
          flexDirection: "column",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {messages.map((message, index) => (
          <div
            style={{
              width: "100%",
              display: "flex",

              justifyContent: userName === message.userName ? "end" : "start",
            }}
            key={index}
          >
            <div
              style={{
                padding: "8px",
                borderRadius: "12px",
                backgroundColor:
                  userName === message?.userName ? "#cbe2fb" : "#fff58799",
              }}
            >
              {userName === message?.userName ? "" : `${message.userName} : `}
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          marginTop: "24px",
        }}
      >
        <form
          style={{
            width: "100%",
            display: "flex",
            maxWidth: "600px",
            height: "40px",
          }}
        >
          <input
            style={{ width: "100%" }}
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          ></input>
          <button
            type="submit"
            onClick={(e) => sendMessage(e)}
            style={{ width: "100%", maxWidth: "120px" }}
          >
            전송
          </button>
        </form>
      </div>
    </div>
  );
}
