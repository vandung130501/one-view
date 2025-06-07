import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pgClient = new Client({
  host: process.env.PGHOST || 'localhost',
  port: +(process.env.PGPORT || 5432),
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
  database: process.env.PGDATABASE || 'postgres',
});

await pgClient.connect();

export { pgClient };