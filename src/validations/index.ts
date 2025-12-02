import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be atleast 2 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be atleast 6 characters"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const editRoleMobileSchema = z.object({
  role: z.string().optional(),
  mobile: z.string().optional(),
});

export type EditRoleMobileInput = z.infer<typeof editRoleMobileSchema>;
