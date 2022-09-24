import path from 'path';
import express from 'express';
import authRoute from './auth.routes';
import userRoute from './users.routes';
import productRoutes from './product.routes';
import defaultRouteHandler from './default.routes';

const apiRoutes = express.Router();

apiRoutes.use('/auth', authRoute);
apiRoutes.use('/users', userRoute);
apiRoutes.use('/products', productRoutes);
apiRoutes.use('/public/images', express.static(path.join('public', 'images')));

export { apiRoutes, defaultRouteHandler };