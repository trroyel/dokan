export const apiVersion: string = process.env.API_VERSION ?? 'v0';
export const nodeEnv: string = process.env.NODE_ENV ?? 'development';
export const port: number = process.env.PORT ? parseInt(process.env.PORT) :4000;
export const devServerIp: string = process.env.DEV_SERVER_IP ?? '127.0.0.1';
export const prodServerIp: string | undefined = process.env.PROD_SERVER_IP;
export const devProtocol: string = process.env.DEV_PROTOCOL ?? '127.0.0.1';
export const prodProtocol: string | undefined = process.env.PROD_PROTOCOL;

export const accessTokenSecret: string = process.env.ACCESS_TOKEN_SECRET ?? "123455666";
export const accessTokenExpIn: string = process.env.ACCESS_TOKEN_EXP_IN ?? '1h';
export const refreshTokenSecret: string = process.env.REFRESH_TOKEN_SECRET ?? "12345566";
export const refreshTokenExpIn: string = process.env.REFRESH_TOKEN_EXP_IN ?? '1y';

export const dbURL: string = process.env.DB_URL ?? "mongodb://localhost:27017/api_inventory";
export const redisUrl: string = process.env.REDIS_URL ?? "redis://127.0.0.1:6379"
export const apiBasePath: string = process.env.API_BASE_PATH ?? `/api/${apiVersion}/`;