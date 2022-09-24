import jwt from 'jsonwebtoken';
import { model, Schema } from 'mongoose';
import { compare, genSalt, hash } from 'bcryptjs';

import { IUser, AuthToken, TokenPayload, IUserMethods, IUserModel } from '../../interfaces';
import { accessTokenSecret, refreshTokenSecret,
  accessTokenExpIn, refreshTokenExpIn, roles} from '../../configs';

const userSchema = new Schema<IUser, IUserModel, IUserMethods>({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: [true, 'name is required!'],
  },
  address: {
    type: String,
    minlength: 5,
    maxlength: 500,
    required: [true, 'address is required!']
  },
  age: {
    type: Number,
    min: 18,
    max: 70,
    required: [true, 'age is required!']
  },
  mobile: {
    type: String,
    minlength: 11,
    maxlength: 14,
    required: [true, 'mobile is required!']
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    unique: true,
    required: [true, 'email is required!'],
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: [true, 'password is required!']
  },
  role: {
    type: String,
    enum: Object.keys(roles),
    required: [true, 'role is required!'],
  },
  image: { type: String },
  status: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });


userSchema.pre("save", async function () {
  const user = this;
  if (user.isModified('password')) {
    user.password = await hash(user.password, await genSalt(6));
  }
});

userSchema.method('generateAuthToken',
  async function (): Promise<AuthToken> {
    const payloads: TokenPayload = {
      _id: this._id,
      role: this.role
    };
    const date = new Date();

    const accessToken = jwt.sign(
      payloads,
      accessTokenSecret,
      { expiresIn: accessTokenExpIn }
    );

    const refreshToken = jwt.sign(
      payloads,
      refreshTokenSecret,
      { expiresIn: refreshTokenExpIn }
    );

    const authToken: AuthToken = {
      accessToken,
      refreshToken,
      createdAt: date.getTime(),
      accessTokenExpAt: new Date().setHours(date.getHours() + 1),
      refreshTokenExpAt: new Date().setFullYear(date.getFullYear() + 1)
    }
    return authToken;
  }
);

userSchema.method('validatePassword',
  async function (password: string): Promise<boolean> {
    return await compare(password, this.password);
  }
);

userSchema.static('isEmailTaken',
  async function (email: string): Promise<boolean> {
    const user = await this.findOne({ email });
    return user !== null;
  }
);

export const User = model<IUser, IUserModel>('User', userSchema);

export default User;