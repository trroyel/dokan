import { JsonWebTokenError } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { Logger } from '../utilities';
import { AppError } from '../utilities'
import { ICustomError } from '../interfaces';


const errorHandlingMiddleware = (err: ICustomError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        Logger.warn(`${err.name}:${err.message}`);
        return res.status(err.status).send(err.getResp());
    }
    else {
        let status = 500;
        let message = 'Sorry, something is broken!';
        Logger.error(`${err.name}:${err.message}`);

        if (err instanceof JsonWebTokenError) {
            status = 401;
            message = (err.message == "invalid signature") ? "invalid token!" : err.message
        }
        return res.status(status).send({message});
    }
};

export { errorHandlingMiddleware }