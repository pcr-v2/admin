"use client";

import { Box, ThemeProvider, styled } from "@mui/material";
import { ReactNode, useMemo } from "react";

import { RootToaster } from "@/app/_components/RootToaster";
import theme from "@/theme";

export type RootClientLayoutProps = {
  children?: ReactNode;
};

export default function RootClientLayout({ children }: RootClientLayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <ChildrenWrapper>{children}</ChildrenWrapper>

      <RootToaster max={3} />
    </ThemeProvider>
  );
}

const ChildrenWrapper = styled(Box)(() => {
  return {
    width: "100%",
    display: "flex",
    padding: "0px 24px",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  };
});
