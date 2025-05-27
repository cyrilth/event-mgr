import z from "zod";

export const registerSchema = z.object({
  displayName: z.string().min(1, { message: "Display name is required" }),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
