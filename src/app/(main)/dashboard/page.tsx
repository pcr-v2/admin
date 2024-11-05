"use client";

import { usePathname } from "next/navigation";
import React from "react";

import { PUBLIC_PATHS } from "@/config/config";

export default function DashboardPage() {
  const pathName = usePathname();
  PUBLIC_PATHS.some((path) => {
    console.log(pathName.startsWith(path));
  });

  return <div>성공 citest</div>;
}
