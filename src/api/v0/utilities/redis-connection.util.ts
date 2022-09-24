import { createClient, RedisClientType } from 'redis';

import { redisUrl } from '../configs';
import { Logger } from '../utilities';

let client: RedisClientType;

const connectToRedisServer = async () => {
    client = createClient({ url: redisUrl });

    client.on('connect', () => {
        Logger.info(`REDIS: redis server is started.`);
    });

    await client.connect();
};

export { client, connectToRedisServer };