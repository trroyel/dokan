import { Types } from 'mongoose';
import { Request, Response, NextFunction } from "express";

import { get400Resp } from '../utilities';

const validateObjectId = (req: Request, res: Response, next: NextFunction): any => {
    if (!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send(
            get400Resp({ id: `invalid object id in 'req.params'` }
        ));
    }
    next();
};

export { validateObjectId };
export default validateObjectId;