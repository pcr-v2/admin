import Chat from "@/app/(main)/realtime-chat/Chat";
import { getUser } from "@/app/_actions/account/auth/getUser";
import PageContainer from "@/app/_components/MainLayout/PageContainer";

export default async function RealtimeChatPage() {
  const res = await getUser();

  return (
    <PageContainer>
      {res.code === "SUCCESS" && <Chat res={res} />}
    </PageContainer>
  );
}
