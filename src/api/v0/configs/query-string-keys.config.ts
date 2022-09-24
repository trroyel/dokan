import { QueryProps } from "../interfaces";

export const productProps: QueryProps = {
    filterProps: ['category', 'brand', 'prices.dp'],
    sortProps: ['category', 'name', 'brand', 'color', 'prices.mrp'],
    properties: [
        'name', 'code', 'model', 'brand', 'category', 'color',
        'prices', 'prices.dp', 'prices.mrp', 'prices.purchasingPrice', 'prices.sellingPrice',
        'stocks.available', 'stocks.upcoming', 'stocks.minimum', 'status', '_id', 'createdAt'
    ]
};

export const userProps: QueryProps = {
    filterProps: ['name','age','role'],
    sortProps: ['role','age'],
    properties: ['name','address','age', 'mobile', 'email','role','image','status','createdAt','_id']
};