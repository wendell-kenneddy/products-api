import { Pool } from "pg";

const pool = new Pool();

export function query<T>(text: string, params: any[]) {
  return pool.query<T[]>(text, params);
}
