"use client";

import { Box, Button, styled } from "@mui/material";
import React, { useState } from "react";

import Calendar from "@/app/_components/common/Calendar";
import dayjs from "@/lib/dayjs";

export default function DefaultFilter() {
  const [dateFrom, setDateFrom] = useState(
    dayjs
      .tz(new Date(), "Asia/Seoul")
      .subtract(6, "months") // 6개월 전
      .startOf("day")
      .toDate(),
  );
  const [dateTo, setDateTo] = useState(new Date());

  return (
    <Wrapper>
      <span>기간</span>

      <CalendarBox>
        <Calendar
          selectedDate={dateFrom}
          onChangeDate={(value: Date) => setDateFrom(value)}
        />
        <Divider />
        <Calendar
          selectedDate={dateTo}
          onChangeDate={(value: Date) => setDateTo(value)}
        />
      </CalendarBox>

      <ConfirmBtn variant="contained">확인</ConfirmBtn>
    </Wrapper>
  );
}

const Wrapper = styled(Box)(() => {
  return {
    top: 72,
    zIndex: 2,
    gap: "32px",
    display: "flex",
    position: "sticky",
    color: "#616161",
    alignItems: "center",
    padding: "12px 32px 24px",
    backgroundColor: "#fff",
    borderBottom: "1px solid #bcbcbc",
  };
});

const Divider = styled(Box)(() => {
  return {
    width: "12px",
    height: "1px",
    backgroundColor: "#bcbcbc",
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
