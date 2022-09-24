import { Request, Response, NextFunction } from "express";

interface IController {
    findAll(req: Request, res: Response, next: NextFunction): Promise<any>;
    findById(req: Request, res: Response, next: NextFunction): Promise<any>;
    create(req: Request, res: Response, next: NextFunction): Promise<any>;
    updateById(req: Request, res: Response, next: NextFunction): Promise<any>;
    deleteById(req: Request, res: Response, next: NextFunction): Promise<any>;
    findOne?(req: Request, res: Response, next: NextFunction): Promise<any>;
    updateAll?(req: Request, res: Response, next: NextFunction): Promise<void>;
    search?(req: Request, res: Response, next: NextFunction): Promise<void>;
    findByQueryProps?(req: Request, res: Response, next: NextFunction): Promise<any>;
};

interface IAuthController {
    auth(req: Request, res: Response, next: NextFunction): Promise<void>;
    validateRefreshToken(req: Request, res: Response, next: NextFunction): Promise<any>
}

export { IController, IAuthController }
export default IController;