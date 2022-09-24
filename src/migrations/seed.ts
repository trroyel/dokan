import { SchemaFieldTypes } from 'redis';
import { demoUser } from '../api/v0/configs';
import { Logger, client } from '../api/v0/utilities';
import { Product, User } from "../api/v0/daos/models";

const seedData = async () => {
    //Inserting demo user for accessing database
    try {
        const users = await User.find({});
        if (!users.length) {
            demoUser.email = process.env.DEMO_USER_EMAIL ?? 'user@gmail.com';
            demoUser.password = process.env.DEMO_USER_PASSWORD ?? 'demopass';
            const user = await new User(demoUser).save();
            Logger.info(`SEED:USER: new demo user:${user.email}:${demoUser.password} is inserted.`)
        } else {
            Logger.info(`SEED:USER: user is already exists.`);
        }
    } catch (error: any) {
        Logger.warn(`SEED:USER:ERROR: ${error.name}:${error.message}`);
    }

    //Caching product data.
    try {
        //Creating product search index for redis serach;
        await client.ft.create('idx:products', {
            name: {
                type: SchemaFieldTypes.TEXT,
                SORTABLE: true
            },
            code: SchemaFieldTypes.TEXT
        }, {
            ON: 'HASH',
            PREFIX: 'search:products'
        });
        Logger.info(`SEED:PRODUCT: index is created.`);

        //caching product dat for redis serach;
        const products = await Product.find({}, 'name code');
        if (products.length) {
            const cacheProducts: Promise<any>[] = []
            for (const product of products) {
                cacheProducts.push(client.hSet(
                    `search:products:${product._id}`,
                    { name: product.name, code: product.code }
                ));
            }
            const cachedResult: any[] = await Promise.all(cacheProducts);

            if (products.length == cachedResult.length) {
                Logger.info(`SEED:CACHSING: ${products.length} products are cached.`);
            }
        } else {
            Logger.info(`SEED:CACHSING: no existing product found to cache!`);
        }

    } catch (error: any) {
        if (error.message == 'Index already exists') {
            Logger.warn('SEED:CACHING: index already exists, skipped creation.');
        } else {
            const name = error.name || error.constructor.name || 'Unknown';
            const message = error.message || `something is wrong in redis 'idx:products'`
            Logger.error(`SEED:CACHING:ERROR ${name}: ${message}`);
        }
    }
};

export default seedData;