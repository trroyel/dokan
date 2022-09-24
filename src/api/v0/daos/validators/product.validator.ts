import Joi from 'joi';

import { IProduct, UpdateProduct } from '../../interfaces';
import { colors, categories, brands } from '../../configs';

const validateProduct = (product: IProduct) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        code: Joi.string().min(5).max(10).required(),
        model: Joi.string().min(3).max(50),
        brand: Joi.string().valid(...brands).required(),
        category: Joi.string().valid(...categories).required(),
        color: Joi.string().valid(...colors).required(),
        prices: {
            dp: Joi.number().min(0).required(),
            mrp: Joi.number().min(0).required(),
            purchasingPrice: Joi.number().min(0).required(),
            sellingPrice: Joi.number().min(0).required(),
        },
        stocks: {
            available: Joi.number(),
            upcoming: Joi.number(),
            minimum: Joi.number().required()
        },
        status: Joi.boolean().default(true),
        image: Joi.string()
    });

    return schema.validateAsync(product, { abortEarly: false });
};

const validateUpdateProduct = (product: UpdateProduct) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100),
        model: Joi.string().min(3).max(50),
        brand: Joi.string().valid(...brands),
        category: Joi.string().valid(...categories),
        color: Joi.string().valid(...colors),
        prices: {
            dp: Joi.number().min(0),
            mrp: Joi.number().min(0),
            purchasingPrice: Joi.number().min(0),
            sellingPrice: Joi.number().min(0),
        },
        stocks: {
            available: Joi.number(),
            upcoming: Joi.number(),
            minimum: Joi.number()
        },
        status: Joi.boolean(),
        image: Joi.string()
    });

    return schema.validateAsync(product, { abortEarly: false });
};

export { validateProduct, validateUpdateProduct }