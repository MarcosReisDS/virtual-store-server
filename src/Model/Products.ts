import Model from "./Model";

class Product extends Model {
    static tableName = 'products'

    name: string
    amounts: string
    value: string
    activated: boolean

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],

            properties: {
                name: { type: 'string' },
                amounts: { type: 'string' },
                value: { type: 'string' },
                activated: {type: 'boolean'}
            }
        }
    }
}

export default Product