import Model from "./Model";

class User extends Model {
    static tableName = 'users'

    name: string
    mail: string
    password: string

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],

            properties: {
                name: { type: 'string' },
                mail: { type: 'string' },
                password: { type: 'string' }
            }
        }
    }
}

export default User