import { drizzle } from 'drizzle-orm/neon-http';
import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';

import * as schema from './schema';
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });


config({path: './.env'});

// export const db = drizzle(process.env.DATABASE_URL!);