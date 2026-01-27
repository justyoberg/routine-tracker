export type NodeEnv = 'production' | 'dev' | 'test';

export const isNodeEnv = (env: string | undefined): env is NodeEnv => {
  return env === 'production' || env === 'dev' || env === 'test';
};

export const requireEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
};
