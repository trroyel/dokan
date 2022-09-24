import { AnyObj } from "./index";

export type QueryString = {
    offset?: number,
    limit?: number;
    sort?: string;
    field?: string;
    filter?: string;
}

export type QueryProps = {
    properties?: string[],
    filterProps?: string[],
    sortProps?: string[]
}

export type SkipLimit = {
    limit: number,
    skip: number 
}

export type FilteredQuery = {
    filter?: AnyObj,
    projection?: string,
    options?:  SkipLimit & AnyObj
}

export type Pagination = {
    limit?: string,
    offset?: string
};

export type ProductQuery = {
    category?: string,
    brand?: string,
    status?: string
} & Pagination;

export type UserQuery = {
    role?: string,
    status?: string
} & Pagination;

export type QueryFilter = Record<string, any>;
export type Projection = string | null | undefined;
export type QueryOptions = Record<string, any> | null | undefined;