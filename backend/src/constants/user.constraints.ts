export type Constraint = {
  MIN: number;
  MAX: number;
  FIELD: string;
};

const USERNAME: Constraint = {
  MIN: 4,
  MAX: 20,
  FIELD: 'Username',
};

const FIRST_NAME: Constraint = {
  MIN: 1,
  MAX: 20,
  FIELD: 'First name',
};

const LAST_NAME: Constraint = {
  MIN: 1,
  MAX: 20,
  FIELD: 'Last name',
};

const EMAIL: Constraint = {
  MIN: 5,
  MAX: 100,
  FIELD: 'Email',
};

const PASSWORD: Constraint = {
  MIN: 8,
  MAX: 20,
  FIELD: 'Password',
};

export const USER_CONSTRAINTS = {
  USERNAME,
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  PASSWORD,
};
