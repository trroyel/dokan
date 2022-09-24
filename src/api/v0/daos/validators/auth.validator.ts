import Joi from "joi";
import { AuthCredential } from "../../interfaces";

const validateAuthData = (data: AuthCredential) => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validateAsync(data, { abortEarly: false });
}

export {validateAuthData};
export default validateAuthData;