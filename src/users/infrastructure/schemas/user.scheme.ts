import { z } from "zod";

export const CreateUserSchema = z.object({
  body: z.object({
    firstName: z
      .string({ required_error: "First name is required" })
      .min(2)
      .max(255),
    lastName: z
      .string({ required_error: "Last name is required" })
      .min(2)
      .max(255),
    email: z
      .string({ required_error: "Email name is required" })
      .email("Invalid email format"),
    password: z
      .string({ required_error: "Password is required" })
      .min(8)
      .max(255),
    cellphone: z
      .string({ required_error: "Cellphone is required" })
      .min(10)
      .max(10),
  }),
});

export type CreateUserBodyType = z.infer<typeof CreateUserSchema>["body"];
