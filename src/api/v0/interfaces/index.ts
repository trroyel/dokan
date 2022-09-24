export * from './auth.interface';
export * from './user.interface';
export * from './query.interface';
export * from './product.interface';
export * from './service.interface';
export * from './controller.interface'

export type AnyObj = Record<string, any>

export type TimeStamp = { createdAt: Date, updatedAt: Date };

export interface ICustomError extends Error {
    status?: number,
    details?: Record<string, any>
}