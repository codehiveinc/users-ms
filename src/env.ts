import {z} from 'zod';

export const envSchema = z.object({
  PORT: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRATION_MS: z.string(),
  REFRESH_TOKEN_EXPIRATION_MS: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}