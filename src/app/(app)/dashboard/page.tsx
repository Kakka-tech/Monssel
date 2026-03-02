import PageContainer from "@/components/layout/PageContainer";

export default function DashboardPage() {
  return (
    <PageContainer>
      <div>
        <h1 className="text-2xl font-semibold text-[#1E1F20]">Dashboard</h1>
        <p className="text-sm text-[#707375]">
          Overview of your sales and business performance
        </p>
      </div>
    </PageContainer>
  );
}
