import pg from "pg";
import Koa from "koa";
import dotenv from "dotenv";

dotenv.config({});

const DB_NAME: string = process.env.DB_NAME || "db-name";
const DB_USER: string = process.env.DB_USER || "postgres";
const DB_HOST: string = process.env.DB_HOST || "localhost";
const DB_PASSWORD: string = process.env.DB_PASSWORD || "root";

const db = new pg.Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: 5432,
});

console.log(db);
console.log(`Connected to Postgresql database ${DB_NAME}`);

const app = new Koa();

app.use((ctx) => {
  ctx.body = "Hello Koa";
});

app.listen(3000);
