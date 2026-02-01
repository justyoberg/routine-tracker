import { User } from '../models/User';
import { type UserBase } from '../validators/user.validator';
import { type JwtPayload, createToken } from '../utils/jwt';
import { AuthError } from '../utils/AuthError';

type Credentials = {
  username: string;
  password: string;
};

const createUser = async (data: UserBase) => {
  const user = new User({ ...data });
  const savedUser = await user.save();
  return savedUser;
};

const login = async (data: Credentials) => {
  const user = await User.findOne({ username: data.username }).select(
    '+password',
  );
  if (!user) {
    throw new AuthError('Invalid username or password', 401);
  }

  const passwordMatched = await user.comparePassword(data.password);
  if (!passwordMatched) {
    throw new AuthError('Invalid username or password', 401);
  }

  const payload: JwtPayload = {
    id: user.id,
    username: user.username,
  };

  const token = createToken(payload);

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      first: user.first,
    },
  };
};

export default { createUser, login };
