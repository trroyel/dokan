import { Logger } from "./index";

(function checkEnvVariable() {
    if (!(process.env.API_VERSION &&
        process.env.NODE_ENV &&
        process.env.PORT &&
        process.env.DEV_SERVER_IP &&
        process.env.PROD_SERVER_IP &&
        process.env.DEV_PROTOCOL &&
        process.env.PROD_PROTOCOL &&
        process.env.ACCESS_TOKEN_SECRET &&
        process.env.ACCESS_TOKEN_EXP_IN &&

        process.env.REFRESH_TOKEN_SECRET &&
        process.env.REFRESH_TOKEN_EXP_IN &&
        process.env.DB_URL &&
        process.env.REDIS_URL &&
        process.env.API_BASE_PATH)
    ) {
        throw new Error("FATAL_ERROR: env variables are not set in .env file.");
    } else {
        Logger.info('ENV_VARIABLE: env variable is set.');
    }
})()