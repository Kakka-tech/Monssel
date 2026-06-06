import { z } from "zod";

// ─── Primitives ───────────────────────────────────────────────────────────────
const uuid = z.string().uuid("Invalid ID format");
const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD");
const positiveAmount = z
  .number({ error: "Amount must be a number" }) // fix 1: invalid_type_error → error
  .positive("Amount must be greater than 0")
  .max(100_000_000, "Amount is unrealistically large");
const txType = z.enum(["debit", "credit"] as const, {
  error: "Type must be debit or credit", // fix 2: errorMap → error, as const
});
const frequency = z.enum(["daily", "weekly", "monthly", "yearly"] as const, {
  error: "Invalid frequency", // fix 3: errorMap → error, as const
});

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .max(254, "Email is too long"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password is too long"),
});

export const registerSchema = z
  .object({
    full_name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name is too long")
      .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email address")
      .max(254, "Email is too long"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password is too long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirm_password: z.string(),
  })
  .refine((d) => d.password === d.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

// ─── Expenses ─────────────────────────────────────────────────────────────────
export const createExpenseSchema = z.object({
  name: z
    .string()
    .min(1, "Description is required")
    .max(200, "Description is too long")
    .trim(),
  amount: positiveAmount,
  type: txType,
  date: isoDate,
  category_id: uuid.nullable().optional(),
  notes: z.string().max(500, "Notes are too long").nullable().optional(),
  receipt_url: z.string().url("Invalid receipt URL").nullable().optional(),
  is_recurring: z.boolean().optional().default(false),
});

export const updateExpenseSchema = createExpenseSchema
  .partial()
  .extend({ id: uuid });

// ─── Budgets ──────────────────────────────────────────────────────────────────
export const upsertBudgetSchema = z.object({
  category_id: uuid,
  month: z.string().regex(/^\d{4}-\d{2}$/, "Month must be YYYY-MM"),
  amount: positiveAmount,
});

// ─── Recurring ────────────────────────────────────────────────────────────────
export const createRecurringSchema = z.object({
  name: z
    .string()
    .min(1, "Description is required")
    .max(200, "Description is too long")
    .trim(),
  amount: positiveAmount,
  type: txType,
  frequency,
  next_date: isoDate,
  category_id: uuid.nullable().optional(),
});

export const updateRecurringSchema = createRecurringSchema.partial().extend({
  is_active: z.boolean().optional(),
});

// ─── Categories ───────────────────────────────────────────────────────────────
export const createCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Category name is required")
    .max(50, "Category name is too long")
    .trim(),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Color must be a valid hex code like #1D9E75"),
  icon: z.string().min(1, "Icon is required").max(50, "Icon name is too long"),
});

// ─── Export ───────────────────────────────────────────────────────────────────
export const exportSchema = z
  .object({
    from: isoDate,
    to: isoDate,
    format: z.enum(["csv", "pdf"] as const),
    type: z
      .enum(["all", "debit", "credit"] as const)
      .optional()
      .default("all"),
    categories: z.array(z.string().max(50)).max(20).optional().default([]),
  })
  .refine((d) => new Date(d.from) <= new Date(d.to), {
    message: "From date must be before to date",
    path: ["from"],
  });

// ─── Profile ──────────────────────────────────────────────────────────────────
export const updateProfileSchema = z.object({
  full_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters")
    .optional(),
  currency: z
    .string()
    .length(3, "Currency must be a 3-letter code like NGN")
    .toUpperCase()
    .optional(),
});

// ─── Helper — parse and return formatted errors ───────────────────────────────
/**
 * Validate input against a schema and return { data } or { errors }.
 * Use in Server Actions so you never pass raw user input to Supabase.
 *
 * @example
 * const result = validate(createExpenseSchema, formData);
 * if (!result.success) return { errors: result.errors };
 * await createExpense(result.data);
 */
export function validate<T>(
  schema: z.ZodSchema<T>,
  input: unknown,
):
  | { success: true; data: T }
  | { success: false; errors: Record<string, string> } {
  const result = schema.safeParse(input);
  if (result.success) return { success: true, data: result.data };

  const errors: Record<string, string> = {};
  result.error.issues.forEach((e: z.ZodIssue) => {
    // fix 4: .errors → .issues, typed e
    const key = e.path.join(".") || "root";
    errors[key] = e.message;
  });
  return { success: false, errors };
}
