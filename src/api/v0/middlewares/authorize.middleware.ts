import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { DecodedToken } from '../interfaces';
import { accessTokenSecret } from '../configs';
import { Forbidden, Unauthorized } from '../utilities';

const authorize = (roles: string[] = []) => {
    if (typeof roles === 'string') roles = [roles];

    return (req: Request, res: Response, next: NextFunction): any => {
        try {
            if (!req.header('Authorization'))
                throw new Unauthorized("not token is provided!");

            const token = req.header('Authorization')?.split(' ')[1];
            if (!token) throw new Unauthorized("invalid token/format!");

            const decodedToken = jwt
                .verify(token, accessTokenSecret) as DecodedToken;

            if (roles.length && !roles.includes(decodedToken.role)) {
                throw new Forbidden();
            }
            req.user = decodedToken;

            next();
        } catch (error: any) {
            if (error.name == 'Unauthorized' || error.name == 'Forbidden') {
                return res.status(error.status).send(error.getResp());
            }
            next(error);
        }
    };
}

export { authorize };