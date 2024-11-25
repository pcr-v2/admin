"use client";

import { Box, ThemeProvider, styled } from "@mui/material";
import { ReactNode } from "react";

import { RootToaster } from "@/app/_components/RootToaster";
import SocketProvider from "@/app/_components/SocketProvider";
import theme from "@/theme";

export type RootClientLayoutProps = {
  children?: ReactNode;
};

export default function RootClientLayout({ children }: RootClientLayoutProps) {
  return (
    <SocketProvider>
      <ThemeProvider theme={theme}>
        <ChildrenWrapper>{children}</ChildrenWrapper>
        <RootToaster max={3} />
      </ThemeProvider>
    </SocketProvider>
  );
}

const ChildrenWrapper = styled(Box)(() => {
  return {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  };
});
