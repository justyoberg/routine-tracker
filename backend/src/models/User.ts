import mongoose, { Schema } from 'mongoose';
import type { HydratedDocument, Types } from 'mongoose';
import type { UserBase } from '../validators/user.validator.js';
import { USER_CONSTRAINTS } from '../constants/user.constraints.js';
import { minMessage, maxMessage } from '../utils/model.utils.js';
import bcrypt from 'bcrypt';

export interface UserDocument extends HydratedDocument<UserBase> {
  routines: string[];
  id: string;
}

export interface UserDocumentRaw extends Omit<
  UserDocument,
  '_id' | '__v' | 'password'
> {
  _id?: Types.ObjectId;
  __v?: number;
  password?: string;
}

const { USERNAME, FIRST_NAME, LAST_NAME, EMAIL, PASSWORD } = USER_CONSTRAINTS;

const userSchema = new Schema<UserDocument>({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [USERNAME.MIN, minMessage(USERNAME)],
    maxlength: [USERNAME.MAX, maxMessage(USERNAME)],
  },
  first: {
    type: String,
    required: true,
    minlength: [FIRST_NAME.MIN, minMessage(FIRST_NAME)],
    maxlength: [FIRST_NAME.MAX, maxMessage(FIRST_NAME)],
  },
  last: {
    type: String,
    required: true,
    minlength: [LAST_NAME.MIN, minMessage(LAST_NAME)],
    maxlength: [LAST_NAME.MAX, maxMessage(LAST_NAME)],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [EMAIL.MIN, minMessage(EMAIL)],
    maxlength: [EMAIL.MAX, maxMessage(EMAIL)],
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: [PASSWORD.MIN, minMessage(PASSWORD)],
    maxlength: [PASSWORD.MAX, maxMessage(PASSWORD)],
  },
  routines: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Routine',
    },
  ],
});

userSchema.pre<UserDocument>('save', async function () {
  if (!this.isModified('password')) return;
  const SALT_ROUNDS = 12;
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.set('toJSON', {
  transform: (_document, returnedObject: UserDocumentRaw) => {
    returnedObject.id = returnedObject._id?.toString() || '';
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

export const User = mongoose.model('User', userSchema);
