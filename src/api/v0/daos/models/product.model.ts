import { model, Schema, Aggregate } from 'mongoose';

import { colors, categories, brands } from '../../configs';
import { IProduct, PurchaseSuggestion, IProductModel } from '../../interfaces';

const productSchema = new Schema<IProduct, IProductModel>({
    name: {
        type: String,
        minlength: 3,
        maxlength: 100,
        required: [true, 'name is required!']
    },
    code: {
        type: String,
        minlength: 5,
        maxlength: 10,
        unique: true,
        required: [true, 'code is required!']
    },
    model: {
        type: String,
        minlength: 3,
        maxlength: 50
    },
    brand: {
        type: String,
        enum: brands,
        required: [true, 'brand is required!']
    },
    category: {
        type: String,
        enum: categories,
        required: [true, 'category is required!']
    },
    color: {
        type: String,
        enum: colors,
        required: [true, 'color is required!']
    },
    prices: {
        dp: {
            type: Number,
            min: 0,
            required: [true, 'dp is required!']
        },
        mrp: {
            type: Number,
            min: 0,
            required: [true, 'mrp is required!']
        },
        purchasingPrice: {
            type: Number,
            min: 0,
            required: [true, 'purchasing price is required!']
        },
        sellingPrice: {
            type: Number,
            min: 0,
            required: [true, 'selling price is required!']
        }
    },
    stocks: {
        available: Number,
        upcoming: Number,
        minimum: {
            type: Number,
            required: [true, 'minimum stock is required!']
        }
    },
    status: {
        type: Boolean,
        default: true
    },
    image: String
}, { timestamps: true });

productSchema.static('isCodeTaken',
    async function (code: string): Promise<boolean> {
        const product = await this.findOne({ code });
        return product !== null;
    }
);

productSchema.static('findPurchaseSuggestion',
    function (): Aggregate<PurchaseSuggestion[]> {
        return this.aggregate<PurchaseSuggestion>([{
            $project: {
                _id: 1, code: 1, name: 1, brand: 1, category: 1, color: 1,
                stockShortage: {
                    $subtract: ['$stocks.minimum', {
                        $add: ['$stocks.available', '$stocks.upcoming']
                    }]
                }
            }
        }, { $match: { stockShortage: { $gt: 0 } } }
        ]);
    }
);

export const Product = model<IProduct, IProductModel>('Product', productSchema);