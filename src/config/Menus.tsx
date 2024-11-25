import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { ReactNode } from "react";

export type TSIDEMENUS = {
  name: string;
  path: string;
  icon?: ReactNode;
  opened?: boolean;
  children?: TSIDEMENUS[];
};

export const SIDE_MENUS: TSIDEMENUS[] = [
  {
    name: "홈",
    path: "/",
    opened: true,
    icon: <HomeOutlinedIcon sx={{ color: "#616161" }} />,
    children: [
      {
        name: "대시보드",
        path: "/dashboard",
      },
      {
        name: "실시간 상담",
        path: "/realtime-chat",
      },
      {
        name: "휴지통",
        path: "/trashcan",
      },
    ],
  },
  {
    name: "일정 관리",
    path: "/schedule",
    opened: true,
    icon: <EditCalendarOutlinedIcon sx={{ color: "#616161" }} />,
    children: [
      {
        name: "수업 일정",
        path: "/schedule/class",
      },
      {
        name: "상담 일정",
        path: "/schedule/counsel",
      },
      {
        name: "출결 관리",
        path: "/schedule/attendance",
      },
    ],
  },
  {
    name: "정보 관리",
    path: "/info",
    opened: true,
    icon: <HeadsetMicOutlinedIcon sx={{ color: "#616161" }} />,
    children: [
      {
        name: "학생 관리",
        path: "/info/student",
      },
      {
        name: "과목 관리",
        path: "/info/subject",
      },
      {
        name: "선생님 관리",
        path: "/info/teacher",
      },
    ],
  },
];
