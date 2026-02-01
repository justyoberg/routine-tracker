import mongoose, { Schema } from 'mongoose';
import type { HydratedDocument, Types } from 'mongoose';
import type { UserBase } from '../validators/user.validator';
import { USER_CONSTRAINTS } from '../constants/user.constraints';
import { minMessage, maxMessage } from '../utils/model.utils';
import bcrypt from 'bcrypt';

export interface UserDocument extends HydratedDocument<UserBase> {
  routines: string[];
  id: string;
}

export interface UserMethods {
  comparePassword(password: string): Promise<boolean>;
}

export interface UserDocumentRaw extends Omit<UserBase, 'password'> {
  id: string;
  password?: string;
  _id?: Types.ObjectId;
  __v?: number;
}

const { USERNAME, FIRST_NAME, LAST_NAME, EMAIL, PASSWORD } = USER_CONSTRAINTS;

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: [true, `${USERNAME.FIELD} is required`],
      unique: true,
      minlength: [USERNAME.MIN, minMessage(USERNAME)],
      maxlength: [USERNAME.MAX, maxMessage(USERNAME)],
    },
    first: {
      type: String,
      required: [true, `${FIRST_NAME.FIELD} is required`],
      minlength: [FIRST_NAME.MIN, minMessage(FIRST_NAME)],
      maxlength: [FIRST_NAME.MAX, maxMessage(FIRST_NAME)],
    },
    last: {
      type: String,
      required: [true, `${LAST_NAME.FIELD} is required`],
      minlength: [LAST_NAME.MIN, minMessage(LAST_NAME)],
      maxlength: [LAST_NAME.MAX, maxMessage(LAST_NAME)],
    },
    email: {
      type: String,
      required: [true, `${EMAIL.FIELD} is required`],
      unique: true,
      minlength: [EMAIL.MIN, minMessage(EMAIL)],
      maxlength: [EMAIL.MAX, maxMessage(EMAIL)],
    },
    password: {
      type: String,
      required: [true, `${PASSWORD.FIELD} is required`],
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
  },
  {
    methods: {
      comparePassword(password: string) {
        return bcrypt.compare(password, this.password);
      },
    },
  },
);

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

type UserModel = mongoose.Model<UserDocument, {}, UserMethods>;
export const User = mongoose.model<UserDocument, UserModel>('User', userSchema);
