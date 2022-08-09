const ICrud = require('./interfaces/InterfaceCrud');

class Postgres extends ICrud {

    constructor() {
        super()
    }

    create(item) {
        console.log('salvo no posgress')
    }
}

module.exports = Postgres