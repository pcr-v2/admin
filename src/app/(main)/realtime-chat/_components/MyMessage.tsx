import { Box, styled } from "@mui/material";

interface IProps {
  message: string;
}

export default function MyMessage(props: IProps) {
  const { message } = props;
  return <Message>{message}</Message>;
}

const Message = styled(Box)(() => {
  return {
    display: "flex",
    fontSize: "12px",
    padding: "8px 12px",
    borderRadius: "4px",
    alignItems: "center",
    whiteSpace: "normal",
    position: "relative",
    wordBreak: "break-word",
    backgroundColor: "#ecf5fd",
    border: "1px solid #deebf9",

    ":after": {
      right: 0,
      top: "50%",
      width: "0px",
      height: "0px",
      content: `""`,
      borderTop: "0px",
      borderRight: "0px",
      marginTop: "-18px",
      marginRight: "-18px",
      position: "absolute",
      border: "12px solid transparent",
      borderLeftColor: "#e5f2ff",
    },
  };
});
