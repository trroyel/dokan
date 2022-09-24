import { Types } from "mongoose";
import { JwtPayload } from "jsonwebtoken";

import { roles } from "../configs";

export type AuthCredential= {
    email: string,
    password: string
};

export type AuthToken = {
    createdAt: number,
    accessToken: string,
    accessTokenExpAt?: number,
    refreshToken: string,
    refreshTokenExpAt?: number
};

export type AuthResponse = {
    _user: Types.ObjectId
} & AuthToken;

export type TokenPayload = {
    _id: string,
    role: keyof typeof roles
};

export type DecodedToken = JwtPayload & TokenPayload;