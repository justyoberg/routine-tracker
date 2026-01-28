import 'dotenv/config';
import { requireEnv } from './env.utils';

export const PORT = requireEnv('PORT');
