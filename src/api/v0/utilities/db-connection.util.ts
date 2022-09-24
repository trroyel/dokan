import { connect, Mongoose, ConnectOptions } from 'mongoose';

import { Logger } from './index';
import { dbURL } from '../configs';

export const connectToDatabase = async (): Promise<void> => {
    const database: Mongoose = await connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false
    } as ConnectOptions);
    if (database.connection.readyState) {
        Logger.info('MONGODB: mongodb is connected.');
    }
};