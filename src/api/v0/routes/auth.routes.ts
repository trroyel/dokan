import { Router } from 'express';
import { validateInput } from '../middlewares';
import { authController } from '../controllers';
import { validateAuthData } from '../daos/validators';

const authRoutes = Router();

authRoutes.post('/',
    validateInput(validateAuthData),
    authController.auth);

authRoutes.post('/refresh',
    authController.validateRefreshToken);


export default authRoutes;