export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          business_name: string | null;
          business_email: string | null;
          phone_number: string | null;
          tax_id: string | null;
          business_address: string | null;
          currency: string;
          timezone: string;
          date_format: string;
          number_format: string;
          theme: "light" | "dark";
          dashboard_layout: "Compact" | "Comfortable" | "Spacious";
          notif_email: boolean;
          notif_low_stock: boolean;
          notif_expenses: boolean;
          notif_weekly_reports: boolean;
          notif_marketing: boolean;
          paystack_connected: boolean;
          paystack_account: string | null;
          flutterwave_connected: boolean;
          flutterwave_account: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["profiles"]["Row"]> & {
          id: string;
          email: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
      };
      products: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          price: number;
          stock: number;
          low_stock_threshold: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["products"]["Row"],
          "id" | "created_at" | "updated_at"
        > & { id?: string };
        Update: Partial<Database["public"]["Tables"]["products"]["Row"]>;
      };
      sales: {
        Row: {
          id: string;
          user_id: string;
          product_id: string | null;
          product_name: string;
          quantity: number;
          price: number;
          total: number;
          note: string | null;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["sales"]["Row"],
          "id" | "created_at"
        > & { id?: string };
        Update: Partial<Database["public"]["Tables"]["sales"]["Row"]>;
      };
      expenses: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          category:
            | "Supplies"
            | "Rent"
            | "Utilities"
            | "Marketing"
            | "Shipping"
            | "Equipment"
            | "Salary"
            | "Other";
          note: string | null;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["expenses"]["Row"],
          "id" | "created_at"
        > & { id?: string };
        Update: Partial<Database["public"]["Tables"]["expenses"]["Row"]>;
      };
      notes: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          category: "Customer" | "Supplier" | "Observation";
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["notes"]["Row"],
          "id" | "created_at" | "updated_at"
        > & { id?: string };
        Update: Partial<Database["public"]["Tables"]["notes"]["Row"]>;
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: "sale" | "stock" | "expense" | "note" | "alert";
          title: string;
          message: string;
          read: boolean;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["notifications"]["Row"],
          "id" | "created_at"
        > & { id?: string };
        Update: Partial<Database["public"]["Tables"]["notifications"]["Row"]>;
      };
      stock_movements: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          type: "add" | "sale" | "adjustment";
          quantity: number;
          note: string | null;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["stock_movements"]["Row"],
          "id" | "created_at"
        > & { id?: string };
        Update: Partial<Database["public"]["Tables"]["stock_movements"]["Row"]>;
      };
    };
  };
};