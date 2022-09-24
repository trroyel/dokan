import { Router } from 'express';

import { roles } from '../configs';
import { upload } from '../utilities';
import { productController } from '../controllers';
import { validateProduct, validateUpdateProduct } from '../daos/validators';
import { authorize, validateObjectId, validateInput } from '../middlewares';

const productRoutes = Router();

productRoutes.get('/',
    authorize(),
    productController.findAll);

productRoutes.get('/search',
    authorize(),
    productController.search);

productRoutes.get('/query',
    authorize([roles.MANAGER, roles.ADMIN, roles.SUPER_ADMIN]),
    productController.findByQueryProps);

productRoutes.get('/suggestion',
    authorize([roles.MANAGER, roles.ADMIN, roles.SUPER_ADMIN]),
    productController.getPurchaseSuggestion);

productRoutes.get('/:id',
    validateObjectId,
    authorize(),
    productController.findById);

productRoutes.post('/',
    authorize([roles.MANAGER, roles.MANAGER, roles.SUPER_ADMIN]),
    upload.single('image'),
    validateInput(validateProduct),
    productController.create);

// productRoutes.put('/',
//     authenticate,
//     authorize([roles.SUPER_ADMIN]),
//     validateInput(validateUpdateProduct),
//     productController.updateById);

productRoutes.patch('/:id',
    validateObjectId,
    authorize([roles.ADMIN, roles.SUPER_ADMIN]),
    upload.single('image'),
    validateInput(validateUpdateProduct),
    productController.updateById);

productRoutes.delete('/:id',
    validateObjectId,
    authorize([roles.SUPER_ADMIN]),
    productController.deleteById);

export default productRoutes;