import { Box, styled } from "@mui/material";

import { EmojiData } from "@/config/emojiData";

interface IProps {
  onClickEmoji: (emojiKey: string) => void;
}

export default function EmojiList(props: IProps) {
  const { onClickEmoji } = props;
  return (
    <Wrapper>
      {EmojiData.map((el, index) => {
        const [key, value] = Object.entries(el)[0];
        return (
          <img
            key={index}
            src={value}
            alt={key}
            style={{ width: "28px", height: "28px", cursor: "pointer" }}
            onClick={() => onClickEmoji(key)}
          />
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled(Box)(() => {
  return {
    top: 10,
    right: 10,
    zIndex: 2,
    width: "100%",
    rowGap: "12px",
    height: "300px",
    padding: "24px",
    display: "flex",
    flexWrap: "wrap",
    columnGap: "12px",
    maxWidth: "250px",
    alignItems: "start",
    position: "absolute",
    borderRadius: "12px",
    justifyContent: "center",
    backgroundColor: "#fff",
    border: "1px solid #bdbdbd",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  };
});
