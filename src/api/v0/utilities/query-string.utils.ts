import { AnyObj, FilteredQuery, QueryProps, QueryString, ProductQuery, UserQuery } from '../interfaces';
/**
 * Filter QueryString(req.query) and create an object from filtered props        
 * @param {QueryString} object-req.query
 * @param {QueryProps} filter data
 * @returns {Promise<IFilteredQuery>}
 */
const queryStringFilter = async (query: QueryString, props: QueryProps): Promise<FilteredQuery> => {
    return new Promise((resolve) => {
        const limit = query.limit || 20;
        const skip = query.offset ? +query.offset : 0;

        const filteredData: AnyObj = { filter: {} };
        filteredData['options'] = { skip, limit };
        filteredData['projection'] = '-updatedAt -__v';

        if (query.field && typeof query.field == 'string' && props.properties) {
            const matchedProps = findMatchedProperty(query.field.split(','), props.properties);
            filteredData.projection = matchedProps.join(' ');
        }
        if (query.sort && typeof query.sort == 'string' && props.sortProps) {
            const matchedProps = findMatchedProperty(props.sortProps, query.sort.split(','));
            filteredData.options.sort = matchedProps.join(' ');
        }
        if (query.filter && typeof query.filter == 'string' && props.filterProps) {
            const filter = generateFilterQuery(query.filter, props.filterProps);
            filteredData.filter = filter;
        }
        resolve(filteredData);
    });
};

const findMatchedProperty = (queryStringKeys: string[], filterData: string[]): string[] => {
    const mached: string[] = [];
    for (let i = 0, m = filterData.length; i < m; i++) {
        for (let j = 0, n = queryStringKeys.length; j < n; j++) {
            if (filterData[i] == queryStringKeys[j] || filterData[i] == `-${queryStringKeys[j]}`) {
                mached.push(filterData[i]);
                break;
            }
        }
    }
    return mached;
};

const generateFilterQuery = (queryData: string, filterData: string[]): AnyObj => {
    const filter: AnyObj = {};
    const queryArray: string[] = queryData.split(',');
    for (let query of queryArray) {
        let props = query.split('-');
        let key = props[0];
        if (filterData.includes(key)) {
            if (props.length == 2) filter[key] = props[1];
            else if (props.length == 3) {
                filter[key] = {
                    [`$${props[props.length - 2]}`]: +props[props.length - 1]
                }
            }
        }
    }
    return filter;
};

const productQueryFilter = (queries: ProductQuery) => {
    const filters: AnyObj = {};

    const limit = queries.limit ? +queries.limit : 20;
    const skip = queries.offset ? +queries.offset : 0;

    if (queries.category) filters['category'] = queries.category;
    if (queries.brand) filters['brand'] = queries.brand;
    if (queries.status) filters['status'] = Boolean(queries.status);

    return {
        filters,
        options: { limit, skip }
    };
};

const userQueryFilter = (queries: UserQuery) => {
    const filters: AnyObj = {};

    const limit = queries.limit ? +queries.limit : 20;
    const skip = queries.offset ? +queries.offset : 0;

    if (queries.role) filters['role'] = queries.role.toLocaleUpperCase();
    if (queries.status) filters['status'] = Boolean(queries.status);

    return {
        filters,
        options: { limit, skip }
    };
};

export { queryStringFilter, productQueryFilter, userQueryFilter };