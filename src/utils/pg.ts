import pg from "pg";
import crypto from "crypto";

export const createEncouragement = async (db: pg.Pool, content: string) => {
  const random_uuid = crypto.randomUUID();
  await db.query(
    "INSERT INTO Encouragements (uuid, content, timestamp) VALUES ($1, $2, $3)",
    [random_uuid, content, "now"],
  );
};

export const createReply = async (
  db: pg.Pool,
  reply_message_uuid: string,
  content: string,
) => {
  const random_uuid = crypto.randomUUID();
  await db.query(
    "INSERT INTO replies (uuid, reply_message, content, timestamp) VALUES ($1, $2, $3, $4)",
    [random_uuid, reply_message_uuid, content, "now"],
  );
};

export const fetchReplies = async (db: pg.Pool, reply_message_uuid: string) => {
  return (
    await db.query("SELECT * FROM replies WHERE reply_message = $1", [
      reply_message_uuid,
    ])
  )["rows"];
};

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

export const getEncouragementsCreatedToday = async (db: pg.Pool) => {
  return (
    await db.query(
      "SELECT * FROM Encouragements WHERE to_char(timestamp, 'MM-DD') = to_char(Now(), 'MM-DD')",
    )
  )["rows"];
};
