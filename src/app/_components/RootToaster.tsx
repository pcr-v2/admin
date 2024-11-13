"use client";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useEffect } from "react";
import toast, { Toaster, useToasterStore } from "react-hot-toast";

// https://github.com/timolins/react-hot-toast/issues/31
export function RootToaster({
  max = 10,
  ...props
}: React.ComponentProps<typeof Toaster> & {
  max?: number;
}) {
  const { toasts } = useToasterStore();
  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= max) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts, max]);
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        icon: <InfoOutlinedIcon />,
        style: {
          color: "#fff",
          backgroundColor: "#424242",
        },
        error: {
          style: {
            color: "#fff",
            backgroundColor: "#f44335",
          },
        },
        success: {
          style: {
            color: "#fff",
            backgroundColor: "#4CAF50",
          },
        },
      }}
      {...props}
    />
  );
}
