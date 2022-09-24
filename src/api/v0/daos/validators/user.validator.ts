import Joi from "joi";

import { roles } from '../../configs';
import { IUser, UpdateUser } from "../../interfaces";

const validateUser = (user: IUser) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        address: Joi.string().min(5).max(500).required(),
        age: Joi.number().min(18).max(70).required(),
        mobile: Joi.string().min(11).max(14).required(),
        email: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required(),
        role: Joi.string().valid(...Object.keys(roles)).required(),
        image: Joi.string(),
        status: Joi.boolean().default(true),
    });
    return schema.validateAsync(user, { abortEarly: false });
};

const validateUpdateUser = (user: UpdateUser) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50),
        address: Joi.string().min(5).max(500),
        age: Joi.number().min(18).max(70),
        mobile: Joi.string().min(11).max(14),
        password: Joi.string().min(5).max(255),
        role: Joi.string().valid(...Object.keys(roles)),
        image: Joi.string(),
        status: Joi.boolean().default(true),
    });
    return schema.validateAsync(user, { abortEarly: false });
};

export { validateUser, validateUpdateUser }