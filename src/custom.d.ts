import 'express';
import { DecodedToken } from '../../interfaces';

declare module 'express' {
    interface Request {
        user: DecodedToken
    }
}

declare module 'express-serve-static-core' {
    interface Request {
        user: DecodedToken
    }
}