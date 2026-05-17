export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      expenses: {
        Row: {
          amount: number;
          category: string;
          created_at: string;
          id: string;
          note: string | null;
          user_id: string;
        };
        Insert: {
          amount: number;
          category: string;
          created_at?: string;
          id?: string;
          note?: string | null;
          user_id: string;
        };
        Update: {
          amount?: number;
          category?: string;
          created_at?: string;
          id?: string;
          note?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "expenses_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      notes: {
        Row: {
          category: string;
          content: string;
          created_at: string;
          id: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          category: string;
          content: string;
          created_at?: string;
          id?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          category?: string;
          content?: string;
          created_at?: string;
          id?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "notes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      notifications: {
        Row: {
          created_at: string;
          id: string;
          message: string;
          read: boolean;
          title: string;
          type: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          message: string;
          read?: boolean;
          title: string;
          type: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          message?: string;
          read?: boolean;
          title?: string;
          type?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      payment_links: {
        Row: {
          buyer_email: string | null;
          created_at: string;
          id: string;
          paid_at: string | null;
          price: number;
          product_id: string;
          product_name: string;
          provider: string;
          quantity: number;
          reference: string | null;
          status: string;
          user_id: string;
        };
        Insert: {
          buyer_email?: string | null;
          created_at?: string;
          id?: string;
          paid_at?: string | null;
          price: number;
          product_id: string;
          product_name: string;
          provider: string;
          quantity?: number;
          reference?: string | null;
          status?: string;
          user_id: string;
        };
        Update: {
          buyer_email?: string | null;
          created_at?: string;
          id?: string;
          paid_at?: string | null;
          price?: number;
          product_id?: string;
          product_name?: string;
          provider?: string;
          quantity?: number;
          reference?: string | null;
          status?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "payment_links_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "payment_links_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      products: {
        Row: {
          created_at: string;
          id: string;
          low_stock_threshold: number;
          name: string;
          price: number;
          stock: number;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          low_stock_threshold?: number;
          name: string;
          price: number;
          stock?: number;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          low_stock_threshold?: number;
          name?: string;
          price?: number;
          stock?: number;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          business_address: string | null;
          business_description: string | null;
          business_email: string | null;
          business_name: string | null;
          business_type: string | null;
          created_at: string;
          currency: string;
          dashboard_layout: string;
          date_format: string;
          email: string;
          flutterwave_account: string | null;
          flutterwave_connected: boolean;
          full_name: string | null;
          id: string;
          notif_email: boolean;
          notif_expenses: boolean;
          notif_low_stock: boolean;
          notif_marketing: boolean;
          notif_weekly_reports: boolean;
          number_format: string;
          paystack_account: string | null;
          paystack_connected: boolean;
          phone_number: string | null;
          tax_id: string | null;
          theme: string;
          timezone: string;
          updated_at: string;
          paystack_subaccount_code: string | null;
          paystack_bank_code: string | null;
          paystack_account_number: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          business_address?: string | null;
          business_description?: string | null;
          business_email?: string | null;
          business_name?: string | null;
          business_type?: string | null;
          created_at?: string;
          currency?: string;
          dashboard_layout?: string;
          date_format?: string;
          email: string;
          flutterwave_account?: string | null;
          flutterwave_connected?: boolean;
          full_name?: string | null;
          id: string;
          notif_email?: boolean;
          notif_expenses?: boolean;
          notif_low_stock?: boolean;
          notif_marketing?: boolean;
          notif_weekly_reports?: boolean;
          number_format?: string;
          paystack_account?: string | null;
          paystack_connected?: boolean;
          phone_number?: string | null;
          tax_id?: string | null;
          theme?: string;
          timezone?: string;
          updated_at?: string;
          paystack_subaccount_code: string | null;
          paystack_bank_code: string | null;
          paystack_account_number: string | null;
        };
        Update: {
          avatar_url?: string | null;
          business_address?: string | null;
          business_description?: string | null;
          business_email?: string | null;
          business_name?: string | null;
          business_type?: string | null;
          created_at?: string;
          currency?: string;
          dashboard_layout?: string;
          date_format?: string;
          email?: string;
          flutterwave_account?: string | null;
          flutterwave_connected?: boolean;
          full_name?: string | null;
          id?: string;
          notif_email?: boolean;
          notif_expenses?: boolean;
          notif_low_stock?: boolean;
          notif_marketing?: boolean;
          notif_weekly_reports?: boolean;
          number_format?: string;
          paystack_account?: string | null;
          paystack_connected?: boolean;
          phone_number?: string | null;
          tax_id?: string | null;
          theme?: string;
          timezone?: string;
          updated_at?: string;
          paystack_subaccount_code: string | null;
          paystack_bank_code: string | null;
          paystack_account_number: string | null;
        };
        Relationships: [];
      };
      sales: {
        Row: {
          created_at: string;
          id: string;
          note: string | null;
          price: number;
          product_id: string | null;
          product_name: string;
          quantity: number;
          total: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          note?: string | null;
          price: number;
          product_id?: string | null;
          product_name: string;
          quantity: number;
          total: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          note?: string | null;
          price?: number;
          product_id?: string | null;
          product_name?: string;
          quantity?: number;
          total?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sales_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sales_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      stock_movements: {
        Row: {
          created_at: string;
          id: string;
          note: string | null;
          product_id: string;
          quantity: number;
          type: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          note?: string | null;
          product_id: string;
          quantity: number;
          type: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          note?: string | null;
          product_id?: string;
          quantity?: number;
          type?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "stock_movements_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "stock_movements_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      decrement_stock: {
        Args: { p_product_id: string; p_quantity: number };
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
  : never = never,
> =
  DefaultSchemaTableNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends (
      {
        Row: infer R;
      }
    ) ?
      R
    : never
  : DefaultSchemaTableNameOrOptions extends (
    keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  ) ?
    (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends (
      {
        Row: infer R;
      }
    ) ?
      R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> =
  DefaultSchemaTableNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends (
      {
        Insert: infer I;
      }
    ) ?
      I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] ?
    DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends (
      {
        Insert: infer I;
      }
    ) ?
      I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> =
  DefaultSchemaTableNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends (
      {
        Update: infer U;
      }
    ) ?
      U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] ?
    DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends (
      {
        Update: infer U;
      }
    ) ?
      U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> =
  DefaultSchemaEnumNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"] ?
    DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
  : never = never,
> =
  PublicCompositeTypeNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends (
    keyof DefaultSchema["CompositeTypes"]
  ) ?
    DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
