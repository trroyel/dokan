import { Logger } from '../utilities';

export const uncaughtUnhandledErrorHandler = (ex: any) => {
    Logger.error(`UNCAUGHT UNHANDLE EXCEPTION:  ${ex?.message || ex}`);
    process.exit(1);
};