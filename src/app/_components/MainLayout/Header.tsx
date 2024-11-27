"use client";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Button, styled } from "@mui/material";
import "dayjs/locale/ko";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

// 로케일 설정
import { GetUserResponse } from "@/app/_actions/account/auth/getUserSchema";
import Calendar from "@/app/_components/common/Calendar";
import { SIDE_MENUS } from "@/config/Menus";
import dayjs from "@/lib/dayjs";

// 한글 로케일 가져오기

dayjs.locale("ko"); // 로케일 설정

interface IProps {
  res: GetUserResponse;
}

export default function Header(props: IProps) {
  const { res } = props;
  const pathName = usePathname();
  const currentPathName = SIDE_MENUS.flatMap(
    (menu) => menu.children || [],
  ).find((child) => child.path === pathName)?.name;

  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().format("YYYY/MM/DD(dd) HH:mm:ss"));
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  // TODO: 헤더를 컨테이너 화 시키기 filter가 페이지마다 다를수있음으로 filter 또한 커스컴하게 바꿀수있도록 변경
  return (
    <Wrapper>
      <TopContent>
        <BreadCrumbs>{currentPathName}</BreadCrumbs>
        <UserInfo>
          <span style={{ width: "240px" }}>{time}</span>
          <span>{res.data.name}님 반가워요</span>
          <Avatar />
        </UserInfo>
      </TopContent>
    </Wrapper>
  );
}

const Wrapper = styled(Box)(() => {
  return {
    top: 0,
    zIndex: 2,
    width: "100%",
    display: "flex",
    position: "sticky",
    padding: "24px 32px 0px",
    flexDirection: "column",
    backgroundColor: "#fff",
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
    fontSize: "16px",
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

const Divider = styled(Box)(() => {
  return {
    width: "12px",
    height: "1px",
    backgroundColor: "#bcbcbc",
  };
});

const BottomContent = styled(Box)(() => {
  return {
    gap: "32px",
    display: "flex",
    color: "#616161",
    alignItems: "center",
  };
});

const ConfirmBtn = styled(Button)(() => {
  return {
    fontSize: "12px",
    padding: "4px 12px",
    borderRadius: "8px",
  };
});

const CalendarBox = styled(Box)(() => {
  return {
    gap: "12px",
    display: "flex",
    alignItems: "center",
  };
});
