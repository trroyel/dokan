import fs from 'fs/promises';
import { Logger } from './index';

export const createDirectory = async (dirName: string) => {
    try {
        await fs.access(dirName);
        Logger.warn(`CREATE:DIR: ${dirName} is exists!`);
    } catch (err) {
        const dir = await fs.mkdir(dirName, { recursive: true });
        if (dir) {
            Logger.info(`CREATE:DIR: ${dirName} is created!`);
        } else {
            Logger.info(`CREATE:DIR: ${dirName} is not created!`);
        }
    }
};

export const deleteFile = async (filePath: string): Promise<boolean> => {
    try {
        await fs.access(filePath);
        await fs.unlink(filePath);
        console.log(`DeleteFile: ${filePath} is deleted.`)
        return true;
    } catch (err: any) {
        Logger.warn(`DeleteFile:${err.message}`);
        return false;
    }
};