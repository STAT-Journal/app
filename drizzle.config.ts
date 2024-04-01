import type { Config } from "drizzle-kit";
export default {
  schema: "./database/schema.ts",
  out: "./drizzle",
  driver: "expo", // <--- very important
} satisfies Config;
