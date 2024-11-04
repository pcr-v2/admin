import { Button, styled } from "@mui/material";

interface IProps {
  text: string;
  className?: string;
  disable?: boolean;
  variant: "contained" | "outlined" | "text";
  onClick: () => void;
}

export default function CommonButton(props: IProps) {
  const {
    text,
    onClick,
    className,
    disable = false,
    variant = "contained",
  } = props;

  return (
    <ExtendButton
      variant={variant}
      className={className}
      disabled={disable}
      onClick={onClick}
    >
      {text}
    </ExtendButton>
  );
}

const ExtendButton = styled(Button)(() => {
  return {
    width: "100%",
    textAlign: "center",
  };
});
