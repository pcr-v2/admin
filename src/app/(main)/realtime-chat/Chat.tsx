"use client";

import { Box, Button, styled } from "@mui/material";
import axios from "axios";
import { animate, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import EmojiList from "@/app/(main)/realtime-chat/_components/EmojiList";
import MyMessage from "@/app/(main)/realtime-chat/_components/MyMessage";
import SomeOneMessage from "@/app/(main)/realtime-chat/_components/SomeOneMessage";
import { GetUserResponse } from "@/app/_actions/account/auth/getUserSchema";
import { IMessage, useSocket } from "@/app/_components/SocketProvider";
import ChatInput from "@/app/_components/common/ChatInput";
import EndAdormentInput from "@/app/_components/common/EndAdormentInput";
import ImageInput from "@/app/_components/common/ImageInput";
import Emoji_Add from "@/assets/icon/emoji-add.svg";
import { useContentEditable } from "@/hooks/useContentEditable";
import { useMappedEmoji } from "@/hooks/useMappedEmoji";
import { mappingEmoji } from "@/lib/utils";

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

  const [onClickEmoji, setOnClickEmoji] = useState(false);

  const { content, setContent, onInput, $contentEditable } =
    useContentEditable("");

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

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!currentMessage.trim()) return;

    try {
      const res = await axios.post("/api/chat", {
        userName,
        content: currentMessage,
        profileImg: userProfileImg,
      });

      console.log("res", res);
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    }

    setCurrentMessage("");
    setContent("");
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

  console.log("current", currentMessage);
  const focusContentEditableTextToEnd = (element: HTMLElement) => {
    // 잠시 기다렸다가 커서를 끝으로 이동
    setTimeout(() => {
      const selection = window.getSelection();
      const range = document.createRange();

      // 기존 내용의 끝으로 커서를 이동
      range.selectNodeContents(element);
      range.collapse(false); // false로 설정하면 끝으로 이동

      // 커서 위치 갱신
      selection?.removeAllRanges();
      selection?.addRange(range);
    }, 0); // DOM 업데이트 후 지연을 주어야 정상 동작
  };

  useEffect(() => {
    if (content && $contentEditable.current) {
      focusContentEditableTextToEnd($contentEditable.current);
      setCurrentMessage(content);
    }
  }, [content]);
  const getSafeHtml = (text: string) => {
    // 텍스트에서 이모지를 HTML로 변환 (mappingEmoji 함수 사용)
    console.log("text", text);
    return mappingEmoji(text);
  };

  return (
    <Wrapper>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isConnectedVisible ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        style={{
          top: 20,
          zIndex: 1,
          display: "flex",
          position: "absolute",
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
                <SomeOneMessage {...message} msgId={index} />
              )}
            </Message>
          );
        })}
        <ScrollBox ref={messagesEndRef} />
      </MessagePart>
      <InputPart>
        <FormST>
          {/* <ChatInput
            label="메세지를 입력해주세요"
            value={currentMessage}
            name="message"
            onChange={(e) => setCurrentMessage(e.target.value)}
            children={
              <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <motion.img
                  initial="beforeHover"
                  whileHover="onHover"
                  variants={{
                    beforeHover: { scale: 1 },
                    onHover: { scale: 1.2 },
                  }}
                  src={Emoji_Add.src}
                  alt="add"
                  style={{ width: "32px", height: "32px", cursor: "pointer" }}
                  onClick={() => setOnClickEmoji(!onClickEmoji)}
                />
                <EndAdormentButton
                  variant="contained"
                  onClick={sendMessage}
                  type="submit"
                >
                  전송
                </EndAdormentButton>
              </Box>
            }
            disabled={false}
          /> */}
          <InputWrap>
            <div
              contentEditable
              suppressContentEditableWarning
              ref={$contentEditable}
              onInput={onInput}
              // dangerouslySetInnerHTML={{ __html: getSafeHtml(currentMessage) }}
              style={{ width: "100%", border: "1px solid red" }}
            />
            {/* {useMappedEmoji(getSafeHtml(currentMessage))}
            </div> */}

            <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <motion.img
                initial="beforeHover"
                whileHover="onHover"
                variants={{
                  beforeHover: { scale: 1 },
                  onHover: { scale: 1.2 },
                }}
                src={Emoji_Add.src}
                alt="add"
                style={{ width: "32px", height: "32px", cursor: "pointer" }}
                onClick={() => setOnClickEmoji((prev) => !prev)}
              />
              <EndAdormentButton
                variant="contained"
                onClick={sendMessage}
                type="submit"
              >
                전송
              </EndAdormentButton>
            </Box>
          </InputWrap>
        </FormST>

        {getSafeHtml(currentMessage)}
      </InputPart>

      {onClickEmoji && (
        <EmojiList
          onClickEmoji={(emojiKey: string) => {
            const messageWithEmoji = currentMessage + emojiKey;
            setCurrentMessage(messageWithEmoji);
            setContent(messageWithEmoji);
            setOnClickEmoji(!onClickEmoji);
          }}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled(Box)(() => {
  return {
    gap: "12px",
    width: "100%",
    display: "flex",
    maxWidth: "600px",
    alignItems: "center",
    borderRadius: "24px",
    flexDirection: "column",
    justifyContent: "center",
    padding: "32px 24px 24px",
    position: "relative",
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
    gap: "20px",
    width: "100%",
    display: "flex",
    height: "362px",
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
    flexDirection: "column",
    gap: "10px",
    minHeight: "44px",
  };
});

const EndAdormentButton = styled(Button)(() => {
  return {
    fontWeight: 500,
    fontSize: "14px",
    paddin: "8px 10px",
    borderRadius: "24px",
    whiteSpace: "nowrap",
    letterSpacing: "1px",
  };
});

const InputWrap = styled("div")(() => ({
  position: "relative",
  display: "flex",
  width: "100%",
  maxWidth: "400px",
  minHeight: "50px",
  padding: "16.5px 24px 16.5px 0px",
  justifyContent: "space-between",
  border: "1px solid gray",
}));
