import 'dotenv/config'; //  required to load env vars

import type { Config } from 'drizzle-kit';

export default {
  schema: './db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!, // loaded via dotenv
  },
} satisfies Config;
