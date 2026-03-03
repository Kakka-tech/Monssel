import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
      <AppHeader />

      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
