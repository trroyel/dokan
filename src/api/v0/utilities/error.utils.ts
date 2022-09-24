import { AnyObj } from "../interfaces";

export class AppError extends Error {
    status: number;
    details?: AnyObj;
    constructor(message = 'sorry!! some error occurred!', status = 500, details?: AnyObj) {
        super(message);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AppError);
        }
        this.name = 'AppError'
        this.status = status;
        this.message = message;
        this.details = details
    }

    public getResp(): AnyObj {
        const resp: AnyObj = {
            message: this.message
        }
        if (this.details) {
            resp['errors'] = this.details
        }
        return resp;
    }
}

export class BadRequest extends AppError {
    constructor(details: AnyObj, message = 'invalid request data!') {
        super(message, 400, details);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BadRequest);
        }
        this.name = 'BadRequest'
    }
}

export class Unauthorized extends AppError {
    constructor(message = 'unauthorized!') {
        super(message, 401);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, Unauthorized);
        }
        this.name = 'Unauthorized';
    }
}

export class Forbidden extends AppError {
    constructor(message = 'request forbidden!') {
        super(message, 403);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, Forbidden);
        }
        this.name = 'Forbidden'
    }
}

export class Conflict extends AppError {
    constructor(message = 'item') {
        super(message, 409);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, Conflict);
        }
        this.name = 'Conflict'
        this.message = `${message} is already exists!!`;
    }
}