import { NextFunction, Request, Response } from 'express';

import { userService } from '../services';
import { IController } from '../interfaces';
import { userQueryFilter, pagignate, get404Resp } from '../utilities';

class UserController implements IController {
  public async findAll(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { filters, options } = userQueryFilter(req.query);

    try {
      const count = await userService.countDocuments(filters);
      res.set(pagignate(options, count));

      if (!count) return res.status(200).send([])

      const projection = 'name address email role status';

      const users = await userService
        .findAll(filters, projection, options);

      res.status(200).send(users);

    } catch (error) {
      next(error);
    }
  }

  public async findById(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { id } = req.params;

    try {
      const user = await userService
        .findById(id, '-password -__v');

      if (user) return res.status(200).send(user);

      res.status(404).send(get404Resp('user'));

    } catch (error) {
      next(error)
    }
  }

  public async create(req: Request, res: Response, next: NextFunction): Promise<any> {
    const userData = req.body;
    if (req.file) userData.image = req.file.path;
    try {
      const user = await userService.create(userData);
      if (user) {
        const path = `${req.baseUrl}/${user._id}`;
        delete (user as any)._doc.password

        return res.status(201).location(path).send(user);
      }
      res.status(500).send({ messgae: 'something is broken!' });
    } catch (error) {
      next(error)
    }
  }

  public async updateById(req: Request, res: Response, next: NextFunction): Promise<any> {
    const userData = req.body;
    if (req.file) userData.image = req.file.path;
    try {
      const updatedUser = await
        userService.updateById(req.params.id, userData);

      if (updatedUser) {
        delete (updatedUser as any)._doc.password;
        return res.status(200).send(updatedUser);
      }
      
      res.status(404).send(get404Resp('user'));
    } catch (error) {
      next(error)
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { id } = req.params;
    try {
      const deletedUser = await userService.deleteById(id);

      if (deletedUser) return res.status(200).send({ id });

      res.status(404).send(get404Resp('user'));

    } catch (err) {
      next(err);
    }
  }

  public async getCurrentUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { _id } = req.user;
    try {
      const user = await userService
        .findOne({ _id }, '-password -__v -updatedAt');

      if (user) return res.status(200).send(user);

      res.status(404).send(get404Resp('user'));
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController;