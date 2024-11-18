"use client";

import { Box, CircularProgress, styled } from "@mui/material";

interface IProps {
  loading: boolean;
}

export default function Loading(props: IProps) {
  const { loading = false } = props;

  if (loading == null) return;

  return (
    <Wrapper
      openloading={String(loading)}
      sx={(theme) => ({ color: "#3196ff", zIndex: theme.zIndex.drawer + 1 })}
    >
      {loading && <CircularProgress color="inherit" sx={{}} />}
    </Wrapper>
  );
}

const Wrapper = styled(Box)<{ openloading: string }>(({ openloading }) => {
  return {
    inset: 0,
    zIndex: 1,
    width: "100%",
    height: "100%",
    position: "fixed",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(1px)",
    backgroundColor: "rgba(0, 0, 0, 0.10)",
    display: openloading === "true" ? "flex" : "none",
  };
});
