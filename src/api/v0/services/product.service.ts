import { Product } from '../daos/models';
import { client, deleteFile, Conflict } from '../utilities';
import {
    IService, IProduct, ProductDoc, LeanProduct, UpdateProduct,
    SearchProduct, Projection, QueryFilter, QueryOptions, PurchaseSuggestion
} from '../interfaces';

class ProductService implements IService<IProduct>{

    public async findAll(
        filter: QueryFilter = {},
        props?: Projection,
        options?: QueryOptions): Promise<LeanProduct[]> {
        return await Product.find(filter, props, options).lean().exec();
    }

    public async countDocuments(filters: QueryFilter = {}): Promise<number> {
        return await Product.countDocuments(filters).exec();
    }

    public async findById(id: string): Promise<LeanProduct | null> {
        return await Product.findById(id).lean().exec();
    }

    public async create(data: IProduct): Promise<ProductDoc> {
        if (await Product.isCodeTaken(data.code)) {
            if (data.image) await deleteFile(data.image);
            throw new Conflict(`product code:${data.code}`);
        }
        const newProduct = await new Product(data).save();

        await client.hSet(`search:products:${newProduct._id}`,
            { name: newProduct.name, code: newProduct.code }
        );
        return newProduct;
    }

    public async updateById(id: string, data: UpdateProduct): Promise<ProductDoc | null> {
        const product = await Product.findById(id);
        if (!product) {
            if (data.image) await deleteFile(data.image);
            return null;
        }
        const oldImage = product.image;

        if (data.prices)
            data.prices = { ...product.prices, ...data.prices };
        if (data.stocks)
            data.stocks = { ...product.stocks, ...data.stocks };

        Object.assign(product, data);
        await product.save();

        if (data.name) await client.hSet(
            `search:products:${id}`, { name: data.name, code: product.code }
        );
        if (oldImage && data.image) await deleteFile(oldImage);

        return product
    }

    public async deleteById(id: string): Promise<LeanProduct | null> {
        const deletedProduct = await Product
            .findByIdAndDelete(id).lean().exec();

        if (deletedProduct) {
            await client.hDel(`search:products:${id}`, ['name', 'code']);
            if (deletedProduct.image)
                await deleteFile(deletedProduct.image);
        }
        return deletedProduct;
    }

    public async findOne(filter: QueryFilter, props: Projection): Promise<LeanProduct | null> {
        return await Product.findOne(filter, props).lean().exec();
    }

    public async search(field: string, query: string): Promise<SearchProduct[]> {
        const serachResult: SearchProduct[] = [];
        try {
            const results = await client.ft
                .SEARCH('idx:products', `@${field}:${query}*`);

            if (results.total) {
                for (let doc of results.documents) {
                    serachResult.push({
                        name: doc.value.name,
                        code: doc.value.code,
                        _id: doc.id.split(':')[2]
                    });
                }
            }
            return serachResult;
        } catch (error) {
            console.log('=====> Search Error: ', error);
            return serachResult;
        }
    };

    public async getPurchaseSuggestion(): Promise<PurchaseSuggestion[]> {
        return await Product.findPurchaseSuggestion().exec();
    }
}

export default new ProductService();