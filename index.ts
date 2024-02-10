import pg from "pg";
import Koa from "koa";
import Router from "@koa/router";
import { koaBody } from "koa-body";
import dotenv from "dotenv";
import { createMessage, getMessagesCreatedToday } from "./src/utils/pg.js";

dotenv.config({});

const DB_NAME: string = process.env.DB_NAME || "db-name";
const DB_USER: string = process.env.DB_USER || "postgres";
const DB_HOST: string = process.env.DB_HOST || "localhost";
const DB_PASSWORD: string = process.env.DB_PASSWORD || "root";
const SERVER_PORT: number = parseInt(process.env.SERVER_PORT || "3000");

const db = new pg.Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: 5432,
});

console.log(`Connected to Postgresql database ${DB_NAME}`);

const app = new Koa();
const router = new Router();

router
  .get("/messages_today", async (ctx) => {
    const messages = await getMessagesCreatedToday(db);
    ctx.body = JSON.stringify(messages);
  })
  .post("/create_message", async (ctx) => {
    if (!("message" in ctx.request.body)) {
      ctx.throw("Incorrect request body", 400);
      return;
    }

    await createMessage(db, ctx.request.body["message"]);
    ctx.status = 201;
  });

app.use(koaBody()).use(router.routes()).use(router.allowedMethods());

app.listen(SERVER_PORT);

console.log(`Server started on port ${SERVER_PORT}`);
