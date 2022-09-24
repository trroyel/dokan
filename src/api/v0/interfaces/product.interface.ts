import { Document, LeanDocument, Types, Model, Aggregate } from 'mongoose';

export interface IProduct {
    name: string,
    code: string,
    model?: string,
    brand: string,
    category: string,
    color: string,
    prices: {
        dp: number,
        mrp: number,
        purchasingPrice: number,
        sellingPrice: number
    },
    stocks: {
        available: number,
        upcoming: number,
        minimum: number
    },
    status?: boolean,
    image?: string
}

export type SearchProduct = {
    _id?: any,
    name?: any,
    code?: any
}

export type PurchaseSuggestion = {
    _id: Types.ObjectId,
    name: string,
    code: string,
    category: string,
    brand: string,
    color: string,
    shortage: number
}

export interface IProductModel extends Model<IProduct> {
    findPurchaseSuggestion(): Aggregate<PurchaseSuggestion[]>;
    isCodeTaken(code: string): Promise<boolean>;
}

export type ProductDoc = IProduct & Document;
export type LeanProduct = LeanDocument<ProductDoc>;
export type UpdateProduct =Partial<Omit<IProduct, "code">>;