import { redirect } from "next/navigation";

import { getUser } from "@/app/_actions/account/auth/getUser";

export default async function page() {
  const res = await getUser();

  if (res.data != null) {
    return redirect("/dashboard");
  }
}
