import path from 'path';
import { Request } from 'express'
import multer, { FileFilterCallback, Multer } from 'multer'

import { BadRequest } from './index';

type FileNameCallback = (error: Error | null, filename: string) => void
type DestinationCallback = (error: Error | null, destination: string) => void

const multerConfig = (): Multer => {
    const storage = multer.diskStorage({
        destination: (
            request: Request,
            file: Express.Multer.File,
            cb: DestinationCallback): void => {
            cb(null, path.join('public', 'images'));
        },
        filename: (
            request: Request,
            file: Express.Multer.File,
            cb: FileNameCallback): void => {
            const extension = file.mimetype.split('/')[1];
            const randomString = Math.floor(1000 + Math.random() * 90000);
            const uniqueName = `${file.fieldname}-${Date.now()}-${randomString}.${extension}`;
            cb(null, uniqueName);
        }
    });

    const fileFilter = (
        request: Request,
        file: Express.Multer.File,
        cb: FileFilterCallback): void => {
        (file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/gif')
            ? cb(null, true)
            : cb(new BadRequest({ image: 'Unsupported image. Only jpp, png and gif files is allowed!' }));
    };

    return multer({
        storage: storage,
        fileFilter: fileFilter,
        limits: { fileSize: 3048576 }
    });
};

const upload = multerConfig();

export { upload };