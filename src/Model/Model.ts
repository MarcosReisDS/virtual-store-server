import { Model as ModelObjetion } from 'objection'

const Knex = require('knex');

const knexClient = Knex({
    client: 'mysql2',
    connection: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    },
});

ModelObjetion.knex(knexClient);

abstract class Model extends ModelObjetion {
    id: number;

    static idColumn = 'id';

    get exists(): boolean {
        return !!this.id;
    }

    static async find(id) {
        //@ts-ignore
        return await this.query().findById(id)
    }

    async save() {

        if (!this.exists) {
            return await this.$query().insert();
        } else {
            return await this.$query().update();
        }
    }

    async delete() {
        if (this.id) {
            return await this.$query().delete();
        }

        return false;
    }

    async edit() {
        if (this.id) {
            return await this.$query().update();
        }

    }
}

export default Model;
