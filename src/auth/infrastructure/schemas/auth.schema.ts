import { z } from "zod";

export const CreateTokenSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Email is not valid"),
    password: z.string({ required_error: "Password is required" }),
  }),
});

export const RefreshTokenSchema = z.object({
  body: z.object({
    refresh: z.string({ required_error: "Refresh token is required" }),
  }),
});

export type CreateTokenType = z.infer<typeof CreateTokenSchema>["body"];
export type RefreshTokenType = z.infer<typeof RefreshTokenSchema>["body"];
