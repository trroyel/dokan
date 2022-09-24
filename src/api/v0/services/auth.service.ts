import jwt from 'jsonwebtoken';

import { User } from '../daos/models';
import { refreshTokenSecret } from '../configs';
import { Unauthorized } from '../utilities/error.utils';
import { AuthCredential, AuthResponse, IAuthService, AuthToken, DecodedToken } from '../interfaces'

class AuthService implements IAuthService {

    public async auth(data: AuthCredential): Promise<AuthResponse> {
        const { email, password } = data;
        const user = await User
            .findOne({ email, status: true }).exec();

        if (!user) throw new
            Unauthorized('invalid username or password!');

        if (!await user.validatePassword(password))
            throw new Unauthorized('invalid username or password!');

        const authToken: AuthToken = await user.generateAuthToken();

        return {
            _user: user._id,
            ...authToken
        };
    }

    public async reValidateToken(refreshToken: string): Promise<AuthResponse> {
        let decodedRefresToken = jwt
            .verify(refreshToken, refreshTokenSecret) as DecodedToken;

        const user = await User.findOne(
            { _id: decodedRefresToken._id, status: true }).exec();

        if (!user) throw new Unauthorized('user is not available!');

        const authToken = await user.generateAuthToken();

        return {
            _user: user._id,
            ...authToken
        };
    }
}

export default new AuthService();