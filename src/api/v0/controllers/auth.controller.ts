import { Request, Response, NextFunction } from 'express';

import { authService } from '../services';
import { Unauthorized } from '../utilities';
import { AuthCredential, IAuthController } from '../interfaces';

class AuthController implements IAuthController {

    public async auth(req: Request, res: Response, next: NextFunction): Promise<void> {
        const authData: AuthCredential = req.body;
        try {
            const resObject = await authService.auth(authData);

            res.set('Auth-AccessToken', resObject.accessToken);
            res.set('Auth-RefreshToken', resObject.refreshToken);

            res.status(200).send(resObject);

        } catch (err) {
            next(err)
        }
    }

    public async validateRefreshToken(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { refreshToken } = req.body;
        try {
            const token = refreshToken.split(' ')[1];

            if (!token) throw new Unauthorized("invalid token/format!");

            const resObject = await authService.reValidateToken(token);

            res.set('Auth-AccessToken', resObject.accessToken);
            res.set('Auth-RefreshToken', resObject.refreshToken);

            res.status(200).send(resObject);

        } catch (err: any) {
            if (err.name == 'Unauthorized')
                return res.status(err.status).send(err.getResp());

            next(err);
        }
    }
}

export default new AuthController();