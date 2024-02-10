import pg from "pg";
import crypto from "crypto";

export const createMessage = async (db: pg.Pool, content: string) => {
  const random_uuid = crypto.randomUUID();
  await db.query(
    "INSERT INTO Messages (uuid, content, timestamp) VALUES ($1, $2, $3)",
    [random_uuid, content, "now"],
  );
};

export const getMessagesCreatedToday = async (db: pg.Pool) => {
  return (
    await db.query(
      "SELECT * FROM Messages WHERE to_char(timestamp, 'MM-DD') = to_char(Now(), 'MM-DD')",
    )
  )["rows"];
};
