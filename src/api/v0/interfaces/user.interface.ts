import { Document, LeanDocument, Model } from "mongoose";

import { AuthToken } from './index';

export interface IUser {
    name: string;
    address: string;
    age: number;
    mobile: string,
    email: string,
    password: string,
    role: string,
    image?: string;
    status: boolean,
}

export interface IUserMethods {
    generateAuthToken(): Promise<AuthToken>;
    validatePassword(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUser, {}, IUserMethods> {
    isEmailTaken(email: string): Promise<boolean>;
}

export type UserDoc = IUser & Document;
export type LeanUser = LeanDocument<UserDoc>;
export type UpdateUser = Partial<Omit<IUser, "email">>;