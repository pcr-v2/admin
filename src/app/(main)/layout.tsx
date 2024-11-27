import { ReactNode } from "react";

import { getUser } from "@/app/_actions/account/auth/getUser";
import Header from "@/app/_components/MainLayout/Header";
import PageContainer from "@/app/_components/MainLayout/PageContainer";
import SideBar from "@/app/_components/MainLayout/SideBar";

export default async function layout({ children }: { children: ReactNode }) {
  const res = await getUser();

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <SideBar />
      <div
        style={{
          width: "100%",
          display: "flex",
          overflowY: "auto",
          position: "relative",
          flexDirection: "column",
        }}
      >
        <Header res={res} />

        {children}
      </div>
    </div>
  );
}
