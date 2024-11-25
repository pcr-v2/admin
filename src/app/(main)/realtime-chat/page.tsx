import Chat from "@/app/(main)/realtime-chat/Chat";
import { getUser } from "@/app/_actions/account/auth/getUser";

export default async function RealtimeChatPage() {
  const res = await getUser();

  return <>{res.code === "SUCCESS" && <Chat res={res} />}</>;
}
