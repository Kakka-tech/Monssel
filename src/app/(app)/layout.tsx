import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { CurrencyProvider } from "@/lib/currency-context";
import AppSidebar from "@/components/layout/AppSidebar";
import AppHeader from "@/components/layout/AppHeader";
import { TourProvider } from "@/components/tour/TourProvider";
import TourOverlay from "@/components/tour/TourOverlay";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <TourProvider>
          <div className="flex flex-col h-screen bg-white dark:bg-[#121212]">
            <AppHeader />
            <div className="flex flex-1 overflow-hidden">
              <AppSidebar />
              <main className="flex-1 overflow-y-auto p-6 bg-[#F5F5F5] dark:bg-[#121212]">
                {children}
              </main>
            </div>
          </div>
          <TourOverlay />
        </TourProvider>
      </CurrencyProvider>
    </ThemeProvider>
  );
}
