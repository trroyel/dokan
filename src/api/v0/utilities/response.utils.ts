import { SkipLimit } from "../interfaces";

export const get400Resp = (
    errors: any,
    message = 'invalid request data!'
) => ({
    message,
    errors
});

export const get404Resp = (source: string) => ({
    message: `${source} is not found!`
});

export const pagignate = (
    options: SkipLimit,
    count: number = 0
) => ({
    'Pagination-Count': count,
    'Pagination-Limit': options.limit,
    'Pagination-Offset': options.skip
});

export const excludeObjectKeys = <T>(obj: T, keys: string[]) => {
    let result: Record<string, any> = {}
    for (const key in obj) {
        if (!keys.includes(key)) {
            result[key] = obj[key]
        }
    }
    return result;
};