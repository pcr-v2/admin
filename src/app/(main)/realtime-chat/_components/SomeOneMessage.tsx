"use client";

import { Box, styled } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";

interface IProps {
  content: string;
  userName: string;
  profileImg?: string;
  msgId: number;
}

export default function SomeOneMessage(props: IProps) {
  const { content, userName, profileImg, msgId } = props;

  const [hoveredMessageId, setHoveredMessageId] = useState<number | null>(null);

  return (
    <Wrapper
      onHoverStart={() => setHoveredMessageId(msgId)}
      onHoverEnd={() => setHoveredMessageId(null)}
    >
      <ProfileImg src={profileImg} alt="profile" />

      <Contents>
        <UserName>{userName}</UserName>
        <Message>{content}</Message>
      </Contents>

      {hoveredMessageId === msgId && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: -20,
            width: "20px",
            height: "40px",
            border: "1px solid red",
          }}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)(() => {
  return {
    zIndex: 1,
    gap: "12px",
    display: "flex",
    alignItems: "start",
    position: "relative",
  };
});

const Message = styled(Box)(() => {
  return {
    display: "flex",
    fontSize: "12px",
    width: "100%",
    maxWidth: "400px",
    padding: "8px 12px",
    borderRadius: "4px",
    alignItems: "center",
    whiteSpace: "normal",
    position: "relative",
    wordBreak: "break-word",
    backgroundColor: "#f7f5f5",
    border: "1px solid #ebebeb",

    ":after": {
      left: 0,
      top: "50%",
      width: "0px",
      height: "0px",
      content: '""',
      borderTop: "0px",
      borderLeft: "0px",
      marginTop: "-18px",
      marginLeft: "-18px",
      position: "absolute",
      border: "12px solid transparent",
      borderRightColor: "#f3f0f0",
    },
  };
});

const ProfileImg = styled("img")(() => {
  return {
    width: "48px",
    height: "48px",
    padding: "1px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "1px solid #bcbcbc",
  };
});

const UserName = styled("span")(() => {
  return {
    fontSize: "10px",
    lineHeight: "120%",
    letterSpacing: "0.5px",
  };
});

const Contents = styled(Box)(() => {
  return {
    gap: "4px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };
});
