import mongoose, { Schema } from 'mongoose';
import type { IUser, IUserRaw } from './types.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

const userSchema = new Schema<IUser>({
  username: { type: String, require: true },
  first: { type: String, required: true },
  last: { type: String, required: true },
  email: { type: String, require: true, unique: true },
  passwordHash: { type: String, required: true, select: false },
  routines: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Routine',
    },
  ],
});

userSchema.pre<IUser>('save', async function () {
  if (!this.isModified('passwordHash')) return;

  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  } catch (error) {
    throw error;
  }
});

userSchema.set('toJSON', {
  transform: (_document, returnedObject: IUserRaw) => {
    returnedObject.id = returnedObject._id?.toString() || '';
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

export const User = mongoose.model('User', userSchema);
