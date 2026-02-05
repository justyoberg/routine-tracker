import mongoose from 'mongoose';

export const wipeDB = async () => {
  const db = mongoose.connection.db;
  if (!db) return;
  await db.dropDatabase();
};
