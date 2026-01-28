import 'dotenv/config';
import { requireEnv } from './env';

export const PORT = requireEnv('PORT');
