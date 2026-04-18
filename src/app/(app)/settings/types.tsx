export type Theme = "light" | "dark";
export type DashboardLayout = "Compact" | "Comfortable" | "Spacious";

export interface BusinessInfo {
  businessName: string;
  businessEmail: string;
  phoneNumber: string;
  taxId: string;
  businessAddress: string;
}

export interface RegionalSettings {
  defaultCurrency: string;
  timezone: string;
  dateFormat: string;
  numberFormat: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  lowStockAlerts: boolean;
  expenseNotifications: boolean;
  weeklyReports: boolean;
  marketingEmails: boolean;
}

export interface PaymentProvider {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  accountName?: string;
}