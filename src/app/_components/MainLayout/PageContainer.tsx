"use client";

import { Box, styled } from "@mui/material";
import React, { ReactNode } from "react";

interface IProps {
  filter?: ReactNode;
  children: ReactNode;
}

export default function PageContainer(props: IProps) {
  const { filter, children } = props;

  return (
    <Wrapper>
      {filter ? filter : <BorderBox />}

      <ChildrenBox>{children}</ChildrenBox>
    </Wrapper>
  );
}

const Wrapper = styled(Box)(() => {
  return {
    zIndex: 1,
    display: "flex",
    position: "relative",
    flexDirection: "column",
  };
});

const BorderBox = styled(Box)(() => {
  return {
    top: 72,
    zIndex: 1,
    gap: "32px",
    width: "100%",
    display: "flex",
    position: "sticky",
    padding: "0px 32px 24px",
    backgroundColor: "#fff",
    borderBottom: "1px solid #bcbcbc",
  };
});

const ChildrenBox = styled(Box)(() => {
  return {
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "32px 24px",
    justifyContent: "center",
  };
});
