import { Components, Theme } from "@mui/material";

const MuiButton: Components<Theme> = {
  MuiButton: {
    styleOverrides: {
      root: () => ({
        borderRadius: "12px",
        textTransform: "none",
        fontWeight: 500,
        fontFamily: "suit",
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
        },
        "@media (hover: hover) and (pointer:fine)": {
          "&:hover": {
            boxShadow: "none",
          },
        },
      }),
      contained: () => ({
        color: "#fff",
        fontSize: "20px",
        backgroundColor: "#3196ff",
        ":disabled": {
          color: "#9e9e9e",
          backgroundColor: "#e0e0e0",
        },
      }),
      outlined: () => ({
        color: "#3196ff",
        fontSize: "20px",
        backgroundColor: "#fff",
        border: "1px solid #3196ff",
        ":disabled": {
          color: "#9e9e9e",
          backgroundColor: "#fff",
          border: "1px solid #9e9e9e",
        },
      }),
    },
  },
};
export default MuiButton;
