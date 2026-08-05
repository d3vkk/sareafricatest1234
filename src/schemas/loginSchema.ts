import { z } from "zod";

export const loginSchema = z.object({
  id: z.string(),
  email: z.email(),
  password: z.string(),
  avatar: z.url(),
});

export const loginListSchema = z.array(loginSchema);

export type User = z.infer<typeof loginSchema>;
