"use client";

import { Box, styled } from "@mui/material";
import React from "react";

export default function FindPasswordForm() {
  return (
    <Wrapper>
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          wordBreak: "keep-all",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <span style={{ fontSize: "32px", fontWeight: 900 }}>비번 찾기</span>
        <span style={{ fontSize: "24px", fontWeight: 800 }}>비번찾으셈</span>
      </Box>
    </Wrapper>
  );
}

const Wrapper = styled(Box)(() => {
  return {
    gap: "80px",
    width: "100%",
    display: "flex",
    maxWidth: "400px",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  };
});
