import Dashboard from "@/app/(main)/dashboard/Dashboard";
import DefaultFilter from "@/app/_components/Filter/DefaultFilter";
import PageContainer from "@/app/_components/MainLayout/PageContainer";

export default async function DashboardPage() {
  return (
    <PageContainer filter={<DefaultFilter />}>
      <Dashboard />
    </PageContainer>
  );
}
