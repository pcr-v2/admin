import { usePathname } from "next/navigation";
import React from "react";

import Dashboard from "@/app/(main)/dashboard/Dashboard";
import { getUser } from "@/app/_actions/account/auth/getUser";
import { PUBLIC_PATHS } from "@/config/config";

export default async function DashboardPage() {
  const res = await getUser();

  return <>{res.code === "SUCCESS" && <Dashboard res={res} />}</>;
}
