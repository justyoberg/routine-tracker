import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  username: string;
  first: string;
  last: string;
  email: string;
  password: string;
  routines: IRoutine;
  id: string;
}

export interface IUserRaw extends Omit<IUser, '_id' | '__v' | 'password'> {
  _id?: Types.ObjectId;
  __v?: number;
  password?: string;
}

export interface IRoutine extends Document {
  name: string;
  days: string[];
}
