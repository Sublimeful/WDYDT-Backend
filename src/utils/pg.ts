import pg from "pg";
import crypto from "crypto";

export const createMessage = async (db: pg.Pool, content: string) => {
  const random_uuid = crypto.randomUUID();
  await db.query(
    "INSERT INTO Messages (uuid, content, timestamp) VALUES ($1, $2, $3)",
    [random_uuid, content, "now"],
  );
};
