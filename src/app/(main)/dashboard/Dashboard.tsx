"use client";

import { Box } from "@mui/material";
import React from "react";

import LineChart from "@/app/_components/common/LineChart";

export default function Dashboard() {
  return (
    <div style={{ minHeight: "400vh" }}>
      <Box sx={{}}>
        <LineChart />
      </Box>
    </div>
  );
}
