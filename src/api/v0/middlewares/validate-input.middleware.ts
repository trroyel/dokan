import { ValidationErrorItem } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { deleteFile, get400Resp } from '../utilities';

const getErrorDetaiils = (items: ValidationErrorItem[]) => {
    let data: Record<string, any> = {};
    for (let i = 0, n = items.length; i < n; i++) {
        let item = items[i].path[0];
        data[item] = items[i].message
    }
    return data;
};

const validateInput = (validator: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await validator(req.body);
            next();
        } catch (err: any) {
            if(req.file) await deleteFile(req.file.path);
            
            if (err.isJoi && err.name == 'ValidationError') {
                const errData = getErrorDetaiils(err.details);
                return res.status(400)
                    .send(get400Resp(errData, err.message)
                );
            }
            return next(err);
        }
    };
};

export { validateInput };