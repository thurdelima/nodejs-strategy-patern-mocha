const ICrud = require('./interfaces/InterfaceCrud');
const Sequelize = require('sequelize');



class Postgres extends ICrud {

    constructor() {
        super()
        this.driver = null;
        this._herois = null;
        //this.connect();
    }

    async isConnected() {
        try {
            // await this._connect();
            await this.driver.authenticate();
            return true;
        } catch (error) {
            console.error('fail!', error);
            return false;
        }

    }



    async defileModel() {
        this._herois = this.driver.define(
            'herois',
            {
                id: {
                    type: Sequelize.INTEGER,
                    required: true,
                    primaryKey: true,
                    autoIncrement: true,
                },
                nome: {
                    type: Sequelize.STRING,
                    required: true,
                },
                poder: {
                    type: Sequelize.STRING,
                    required: true,
                },
            },
            {
                //opcoes para base existente
                tableName: 'tb_herois',
                freezeTableName: false,
                timestamps: false,


            },
        );
        await this._herois.sync()

    }

    async connect() {

        this.driver = new Sequelize(
            'db_herois', //database
            'thur', // user
            '123123', //senha
            {
                host: 'localhost',
                dialect: 'postgres',
                // case sensitive
                quoteIdentifiers: false,
                // deprecation warning
                operatorsAliases: false

                // dialectOptions: {
                //   ssl: true,
                // },
            },
        );
        await this.defileModel();

    }

    read(item = {}) {
        return this._herois.findAll({ where: item, raw: true });
    }

    async create(item) {
        const { dataValues } = await this._herois.create(item, { raw: true });
        return dataValues;
    }

    update(id, item) {
        return this._herois.update(item, { where: { id } });
    }

    delete(id) {
        const query = id ? { id } : {};
        return this._herois.destroy({ where: query });
    }


}

module.exports = Postgres