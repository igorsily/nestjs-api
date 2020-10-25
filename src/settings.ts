import dotenv from 'dotenv';

const ENV_FILE = dotenv.config().parsed || {};

export const NODE_ENV = (process.env.NODE_ENV || 'production').trim();
export const VERSION = (process.env.VERSION || ENV_FILE.VERSION || 'dev').trim();

export const SENTRY_DSN = (process.env.SENTRY_DSN || '').trim();
export const SENTRY_RATE = Number(process.env.SENTRY_RATE) || 1;
export const IS_DEV = NODE_ENV !== 'production' && NODE_ENV !== 'test';
export const IS_PROD = NODE_ENV === 'production';
export const IS_TEST = NODE_ENV === 'test';

export const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost';
export const DATABASE_DB = process.env.DATABASE_DB || 'waproject';
export const DATABASE_USER = process.env.DATABASE_USER || 'docker';
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || '123mudar';
export const DATABASE_PORT = Number(process.env.DATABASE_PORT) || 3002;
