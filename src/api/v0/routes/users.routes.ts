import { Router } from 'express';
import { roles } from '../configs';
import { upload } from '../utilities';
import { userController } from '../controllers';
import { validateUser, validateUpdateUser } from '../daos/validators';
import {  authorize, validateObjectId, validateInput } from '../middlewares';

const userRoutes = Router();
userRoutes.get('/',
    authorize([roles.ADMIN, roles.SUPER_ADMIN]),
    userController.findAll);

userRoutes.get('/me',
    authorize(),
    userController.getCurrentUser);

userRoutes.get('/:id',
    validateObjectId,
    authorize([roles.ADMIN, roles.SUPER_ADMIN]),
    userController.findById);

userRoutes.post('/',
    authorize([roles.SUPER_ADMIN]),
    upload.single('image'),
    validateInput(validateUser),
    userController.create);

// userRoutes.put('/:id',
//     
//     authorize([roles.SUPER_ADMIN]),
//     upload.single('image'),
//     validateInput(validateUpdateUser),
//     userController.updateById);

userRoutes.patch('/:id',
    validateObjectId,
    authorize([roles.SUPER_ADMIN]),
    upload.single('image'),
    validateInput(validateUpdateUser),
    userController.updateById);

userRoutes.delete('/:id',
    validateObjectId,
    authorize([roles.SUPER_ADMIN]),
    userController.deleteById);

export default userRoutes;