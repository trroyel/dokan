import { Request, Response, NextFunction } from 'express';

import { productProps } from '../configs';
import { productService } from '../services';
import { IController, QueryString } from '../interfaces';
import { pagignate, get404Resp, productQueryFilter, queryStringFilter } from '../utilities';

class ProductController implements IController {

  public async findAll(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { filters, options } = productQueryFilter(req.query);
    try {
      const counts = await productService.countDocuments(filters);
      res.set(pagignate(options, counts));

      if (!counts) return res.status(200).send([]);

      const projection = "name code brand category prices";

      const products = await productService
        .findAll(filters, projection, options);

      res.status(200).send(products);

    } catch (error) {
      next(error)
    }
  }

  public async findById(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { id } = req.params;
    try {
      const product = await productService.findById(id);

      if (product) return res.status(200).send(product);

      res.status(404).send(get404Resp('product'));

    } catch (err) {
      next(err)
    }
  }

  public async create(req: Request, res: Response, next: NextFunction): Promise<any> {
    if (req.file) req.body.image = req.file.path;

    try {
      const createdProduct = await productService.create(req.body);
      const location = `${req.baseUrl}/${createdProduct._id}`

      res.status(201)
        .location(location).send(createdProduct);

    } catch (error: any) {
      next(error)
    }
  }

  public async updateById(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { id } = req.params;
    if (req.file) req.body.image = req.file.path;

    try {
      const updatedProduct = await
        productService.updateById(id, req.body);

      if (updatedProduct)
        return res.status(200).send(updatedProduct);

      res.status(404).send(get404Resp('product'));

    } catch (err) {
      next(err)
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { id } = req.params;
    try {
      const deletedProduct = await productService.deleteById(id);

      if (deletedProduct)
        return res.status(200).send({ id });

      res.status(404).send(get404Resp('product'));

    } catch (error) {
      next(error);
    }
  };

  public async search(req: Request, res: Response, next: NextFunction): Promise<void> {
    const query = req.query.query as string;
    const key = isNaN(Number(query)) ? 'name' : 'code';

    try {
      const searchedProducts = await productService.search(key, query);

      res.status(200).send(searchedProducts);

    } catch (error) {
      next(error)
    }
  }

  public async findByQueryProps(req: Request, res: Response, next: NextFunction): Promise<any> {
    const queries = req.query as QueryString
    try {
      const { filter, projection,
        options } = await queryStringFilter(queries, productProps);

      const skip = options?.skip || 0;
      const limit = options?.limit || 20;
      const counts = await productService.countDocuments(filter);
      res.set(pagignate({ skip, limit }, counts));

      if (!counts) return res.status(200).send([]);

      const products = await
        productService.findAll(filter, projection, options);

      res.status(200).send(products);

    } catch (err) {
      next(err)
    }
  }

  public async getPurchaseSuggestion(req: Request, res: Response, next: NextFunction): Promise<void | any> {
    try {
      const suggestedProducts = await
        productService.getPurchaseSuggestion();

      res.status(200).send(suggestedProducts);

    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController;