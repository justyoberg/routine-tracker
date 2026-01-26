import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  username: string;
  first: string;
  last: string;
  email: string;
  passwordHash: string;
  routines: IRoutine;
  id: string;
}

export interface IUserRaw extends Omit<IUser, '_id' | '__v' | 'passwordHash'> {
  _id?: Types.ObjectId;
  __v?: number;
  passwordHash?: string;
}

export interface IRoutine extends Document {
  name: string;
  days: string[];
}
