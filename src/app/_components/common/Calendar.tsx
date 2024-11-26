"use client";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Box, styled } from "@mui/material";
import { getMonth, getYear } from "date-fns";
import { ko } from "date-fns/locale";
import { MouseEventHandler } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Left from "@/assets/icon/left.svg";
import Right from "@/assets/icon/right.svg";

const MONTHS = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

interface IProps {
  selectedDate: Date;
  onChangeDate: (value: Date) => void;
}

interface ICustomInputProps {
  value: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Calendar = (props: IProps) => {
  const { selectedDate, onChangeDate } = props;

  const CustomInput = ({ value, onClick }: ICustomInputProps) => (
    <CustomInputBtn onClick={onClick}>
      {value}
      <CalendarMonthIcon sx={{ width: "16px", height: "16px" }} />
    </CustomInputBtn>
  );

  return (
    <Wrapper>
      <DatePicker
        locale={ko}
        customInput={<CustomInput value="" onClick={() => {}} />}
        dateFormat="yyyy/MM/dd"
        formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
        shouldCloseOnSelect
        minDate={new Date("2000-01-01")}
        maxDate={new Date()}
        selected={selectedDate as any}
        onChange={(date: Date) => onChangeDate(date)}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <CustomHeaderWrapper>
            <LeftBox
              isnotprev={prevMonthButtonDisabled.toString()}
              onClick={() => {
                if (prevMonthButtonDisabled) return;
                decreaseMonth();
              }}
            >
              <ImgST src={Left.src} alt="left" />
            </LeftBox>

            <div style={{ display: "flex", gap: "8px" }}>
              <span style={{ fontSize: "14px", fontWeight: 400 }}>
                {MONTHS[getMonth(date)]}
              </span>
              <span style={{ fontSize: "14px", fontWeight: 400 }}>
                {getYear(date)}
              </span>
            </div>

            <RightBox
              isnotnext={nextMonthButtonDisabled.toString()}
              onClick={() => {
                if (nextMonthButtonDisabled) return;
                increaseMonth();
              }}
            >
              <ImgST src={Right.src} alt="right" />
            </RightBox>
          </CustomHeaderWrapper>
        )}
      />
    </Wrapper>
  );
};

export default Calendar;

const Wrapper = styled(Box)(() => {
  return {
    "& .react-datepicker__triangle": {
      display: "none",
    },

    "& .react-datepicker": {
      fontWeight: 400,
      borderRadius: "8px",
      border: "1px solid #eee",
      "& .react-datepicker__month-container": {
        padding: "12px",
      },
      "& .react-datepicker__header": {
        borderBottom: "none",
        backgroundColor: "#fff",
        padding: "8px 8px 4px 8px",
      },

      "& .react-datepicker__day--selected": {
        backgroundColor: "#3196ff",
      },
      "& .react-datepicker__day--today": {
        fontWeight: 400,
        borderRadius: "100%",
        border: "1px solid #3196ff",
      },
      "& .react-datepicker__day": {
        borderRadius: "4px",
        "&:hover": {
          color: "#212121",
          backgroundColor: "#e5f2ff",
        },
      },
    },
  };
});

const CustomInputBtn = styled("button")(() => {
  return {
    display: "flex",
    fontSize: "12px",
    cursor: "pointer",
    minWidth: "120px",
    color: "#616161",
    borderRadius: "8px",
    padding: "6px 12px",
    alignItems: "center",
    backgroundColor: "#fff",
    border: "1px solid #bcbcbc",
    justifyContent: "space-between",
  };
});

const CustomHeaderWrapper = styled(Box)(() => {
  return {
    width: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "0px 8px 8px 8px",
    justifyContent: "space-between",
  };
});

const LeftBox = styled(Box)<{ isnotprev: string }>(({ isnotprev }) => {
  return {
    width: "24px",
    height: "24px",
    padding: "4px",
    display: "flex",
    borderRadius: "4px",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #eee",
    cursor: isnotprev === "true" ? "" : "pointer",
    backgroundColor: isnotprev === "true" ? "#fafafa" : "",
  };
});

const RightBox = styled(Box)<{ isnotnext: string }>(({ isnotnext }) => {
  return {
    width: "24px",
    height: "24px",
    padding: "4px",
    display: "flex",
    borderRadius: "4px",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #eee",
    cursor: isnotnext === "true" ? "" : "pointer",
    backgroundColor: isnotnext === "true" ? "#fafafa" : "",
  };
});

const ImgST = styled("img")(() => {
  return {
    width: "16px",
    height: "16px",
    color: "#616161",
  };
});
