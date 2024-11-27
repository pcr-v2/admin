"use client";

import { Box, Button, styled } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import MyMessage from "@/app/(main)/realtime-chat/_components/MyMessage";
import SomeOneMessage from "@/app/(main)/realtime-chat/_components/SomeOneMessage";
import { GetUserResponse } from "@/app/_actions/account/auth/getUserSchema";
import { IMessage, useSocket } from "@/app/_components/SocketProvider";
import ChatInput from "@/app/_components/common/ChatInput";
import EndAdormentInput from "@/app/_components/common/EndAdormentInput";

interface IProps {
  res: GetUserResponse;
}

export default function Chat(props: IProps) {
  const { res } = props;
  const { socket, isConnected, onUserJoin, connectedUsers } = useSocket();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [userProfileImg, setUserProfileImg] = useState("");

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 0);
  };

  const sendUserInfo = async (userName: string, profileImg: string) => {
    try {
      await axios.post("/api/connect", {
        userName,
        profileImg,
      });
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    }
  };

  useEffect(() => {
    if (res) {
      setUserName(res?.data?.name);
      setUserProfileImg(res.data.profile_img);
      sendUserInfo(res.data.name, res.data.profile_img);
    }
  }, [res]);

  useEffect(() => {
    const handleMessage = async (data: IMessage) => {
      console.log("data ", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    if (messages.length !== 0) {
      scrollToBottom();
    }

    socket?.on("message", handleMessage);

    return () => {
      socket?.off("message", handleMessage);
    };
  }, [socket, messages, res]);

  // useEffect(() => {
  //   if (socket && isConnected) {
  //     console.log("????");

  //     socket.on("onUserJoin", (userName) => {
  //       console.log("tq", userName);
  //       onUserJoin(userName); // 접속한 유저 이름 추가
  //     });
  //   }

  //   return () => {
  //     socket?.off("onUserJoin"); // Cleanup
  //   };
  // }, [socket, isConnected]);

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!currentMessage.trim()) return;

    try {
      await axios.post("/api/chat", {
        userName,
        content: currentMessage,
        profileImg: userProfileImg,
      });
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    }

    setCurrentMessage("");
  };

  const [isConnectedVisible, setIsConnectedVisible] = useState(false);

  useEffect(() => {
    if (connectedUsers.userName) {
      setIsConnectedVisible(true);
      setTimeout(() => {
        setIsConnectedVisible(false);
      }, 5000); // Fade out after 3 seconds
    }
  }, [connectedUsers]);

  console.log("connectedUsers", connectedUsers);

  return (
    <Wrapper>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isConnectedVisible ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        style={{
          position: "sticky",
          zIndex: 1,
          top: 0,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IsConnectedBox>
          <ProfileImg src={connectedUsers.profileImg} alt="profile" />
          {connectedUsers.userName === userName
            ? "내가 돌아왔다"
            : `${connectedUsers.userName}님이 접속했습니다!`}
        </IsConnectedBox>
      </motion.div>

      <MessagePart>
        {messages.map((message, index) => {
          const isMyMessage = userName === message.userName;
          return (
            <Message key={index} ismymessage={isMyMessage.toString()}>
              {isMyMessage ? (
                <MyMessage message={message.content} />
              ) : (
                <SomeOneMessage {...message} />
              )}
            </Message>
          );
        })}
        <ScrollBox ref={messagesEndRef} />
      </MessagePart>
      <InputPart>
        <FormST>
          <ChatInput
            label="메세지를 입력해주세요"
            value={currentMessage}
            name="message"
            onChange={(e) => setCurrentMessage(e.target.value)}
            children={
              <EndAdormentButton
                variant="contained"
                onClick={sendMessage}
                type="submit"
              >
                전송
              </EndAdormentButton>
            }
            disabled={false}
          />
        </FormST>
      </InputPart>
    </Wrapper>
  );
}

const Wrapper = styled(Box)(() => {
  return {
    gap: "12px",
    width: "100%",
    zIndex: 1,
    display: "flex",
    maxWidth: "600px",
    alignItems: "center",
    borderRadius: "24px",
    position: "relative",
    flexDirection: "column",
    justifyContent: "center",
    padding: "32px 24px 24px",
    border: "1px solid #eee",
  };
});

const IsConnectedBox = styled(motion.div)(() => {
  return {
    gap: "12px",
    display: "flex",
    fontSize: "14px",
    marginLeft: "8px",
    alignItems: "center",
    justifyContent: "start",
  };
});

const MessagePart = styled(Box)(() => {
  return {
    zIndex: 2,
    gap: "20px",
    width: "100%",
    display: "flex",
    height: "300px",
    overflowY: "auto",
    maxHeight: "300px",
    padding: "12px",
    flexDirection: "column",
    backgroundColor: "#fff",
    // border: "1px solid #e9e9e9",
    "::-webkit-scrollbar": {
      display: "none",
    },
  };
});

const Message = styled(Box)<{ ismymessage: string }>(({ ismymessage }) => {
  return {
    width: "100%",
    display: "flex",
    justifyContent: ismymessage === "true" ? "end" : "start",
  };
});

const ProfileImg = styled("img")(() => {
  return {
    width: "48px",
    height: "48px",
    padding: "1px",
    objectFit: "cover",
    borderRadius: "100%",
    border: "1px solid #bcbcbc",
  };
});

const ScrollBox = styled(Box)(() => {
  return {
    marginTop: "-20px",
  };
});

const InputPart = styled(Box)(() => {
  return {
    width: "100%",
    display: "flex",
    marginTop: "12px",
    justifyContent: "center",
  };
});

const FormST = styled("form")(() => {
  return {
    width: "100%",
    display: "flex",
    minHeight: "44px",
  };
});

const EndAdormentButton = styled(Button)(() => {
  return {
    fontWeight: 700,
    fontSize: "14px",
    paddin: "8px 10px",
    borderRadius: "24px",
    whiteSpace: "nowrap",
    letterSpacing: "1px",
  };
});
