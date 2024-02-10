import pg from "pg";
import Koa from "koa";
import dotenv from "dotenv";

dotenv.config({});

const DB_NAME: string = process.env.DB_NAME || "db-name";
const DB_USER: string = process.env.DB_USER || "postgres";
const DB_HOST: string = process.env.DB_HOST || "localhost";
const DB_PASSWORD: string = process.env.DB_PASSWORD || "root";

const dbconn = new pg.Client({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: 5432,
});

console.log(dbconn);
console.log(`Connected to Postgresql database ${DB_NAME}`);

const app = new Koa();

app.use((ctx) => {
  ctx.body = "Hello Koa";
});

app.listen(3000);
