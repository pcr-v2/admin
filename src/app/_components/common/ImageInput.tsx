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
import Emoji_Add from "@/assets/icon/emoji-add.svg";
import { useContentEditable } from "@/hooks/useContentEditable";
import { mappingEmoji } from "@/lib/utils";

interface IProps {
  currentMessage: any;
  sendMessage: (e: any) => void;
  emoji: () => void;
}

const ImageInput = (props: IProps) => {
  const { currentMessage, sendMessage, emoji } = props;

  const { content, setContent, onInput, $contentEditable } =
    useContentEditable("");

  const getSafeHtml = (text: string) => {
    // 텍스트에서 이모지를 HTML로 변환 (mappingEmoji 함수 사용)
    console.log("text", text);

    return mappingEmoji(text);
  };

  console.log("content", content);
  return (
    <InputWrap>
      <div
        contentEditable
        suppressContentEditableWarning
        ref={$contentEditable}
        onInput={onInput}
        dangerouslySetInnerHTML={{ __html: getSafeHtml(currentMessage) }}
        style={{ width: "100%", border: "1px solid red" }}
      />

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
          onClick={emoji}
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
  );
};

export default React.memo(ImageInput);

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
