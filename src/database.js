import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: "localhost",
  user: "sqluser",
  port: 3306,
  password: "password",
  database: "api_dw",
});