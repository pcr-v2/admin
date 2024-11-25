"use client";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, styled } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// 로케일 설정
import { GetUserResponse } from "@/app/_actions/account/auth/getUserSchema";
import { SIDE_MENUS } from "@/config/Menus";

// 한글 로케일 가져오기

dayjs.locale("ko"); // 로케일 설정

interface IProps {
  res: GetUserResponse;
}

export default function Header(props: IProps) {
  const { res } = props;

  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().format("YYYY-MM-DD-(dd)-HH:mm:ss"));
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  const pathName = usePathname();

  const currentPathName = SIDE_MENUS.flatMap(
    (menu) => menu.children || [],
  ).find((child) => child.path === pathName)?.name;

  return (
    <Wrapper>
      <TopContent>
        <BreadCrumbs>{currentPathName}</BreadCrumbs>
        <UserInfo>
          <span>{res.data.name}님 반가워요</span>
          <Avatar />
        </UserInfo>
      </TopContent>
      <Box sx={{ display: "flex", gap: "8px" }}>
        <span>현재 시각은 {time}</span>
        <span> 입니다.</span>
      </Box>
    </Wrapper>
  );
}

const Wrapper = styled(Box)(() => {
  return {
    top: 0,
    zIndex: 1,
    gap: "12px",
    width: "100%",
    display: "flex",
    position: "sticky",
    padding: "24px 32px",
    flexDirection: "column",
    backgroundColor: "#fff",
    borderBottom: "1px solid #bcbcbc",
  };
});

const TopContent = styled(Box)(() => {
  return {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  };
});

const BreadCrumbs = styled(Box)(() => {
  return {
    fontSize: "32px",
    fontWeight: 800,
  };
});

const UserInfo = styled(Box)(() => {
  return {
    gap: "20px",
    display: "flex",
    fontSize: "24px",
    lineHeight: "120%",
    letterSpacing: "1px",
    alignItems: "center",
  };
});

const Avatar = styled(AccountCircleIcon)(() => {
  return {
    width: "48px",
    height: "48px",
    color: "#d2d2d2",
  };
});
