import { z } from "zod";

const Environments = z.enum(["development", "production"]);

const envSchema = z.object({
    NODE_ENV: Environments.default("development"),
    PORT: z.number({ coerce: true }),
});

export const env = envSchema.parse(process.env);