import { LeanDocument, Document } from 'mongoose';
import { Projection, QueryFilter, QueryOptions, AuthResponse, AuthCredential } from './index';

interface IService<T, D = T & Document, L = LeanDocument<D>> {

    findAll(filter: QueryFilter, props?: Projection, options?: QueryOptions): Promise<L[]>

    countDocuments(filter: QueryFilter): Promise<number>;

    findById(id: string, projection?: Projection): Promise<L | null>;

    create(data: T): Promise<D>;

    updateById(id: string, data: Partial<T>): Promise<D | null>;

    deleteById(id: string): Promise<L | null>;

    findOne?(filter: QueryFilter, props?: Projection): Promise<L | null>;

    updateAll?(filter: QueryFilter, data: Partial<T>): Promise<Partial<T>[]>;

    search?(field: string, query: string): Promise<Partial<T & Pick<Document, '_id'>>[]>;

}

interface IAuthService {
    auth(data: AuthCredential): Promise<AuthResponse>,

    reValidateToken(refreshToken: string): Promise<AuthResponse>
}

export { IService, IAuthService }