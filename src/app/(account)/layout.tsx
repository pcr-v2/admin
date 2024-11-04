"use client";

import { Box, styled } from "@mui/material";
import { ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

export default function AccountLayout(props: IProps) {
  const { children } = props;
  return (
    <Wrapper>
      <Inner>{children}</Inner>
    </Wrapper>
  );
}

const Wrapper = styled(Box)(() => {
  return {
    width: "100%",
    display: "flex",
    minHeight: "100vh",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  };
});

const Inner = styled(Box)(() => {
  return {
    width: "100%",
    display: "flex",
    maxWidth: "400px",
    minHeight: "580px",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
  };
});
