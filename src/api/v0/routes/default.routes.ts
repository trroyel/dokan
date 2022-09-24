import { RequestHandler } from 'express';

const defaultRouteHandler: RequestHandler = (req, res, next) => {
    res.status(404).send({
        message: "This URL is not found. Make request to '/api/<version>/<path>' or follow the docs for correct url.."
    });
}

export default defaultRouteHandler;