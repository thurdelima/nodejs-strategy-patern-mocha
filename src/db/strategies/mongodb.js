const ICrud = require('./interfaces/InterfaceCrud'); 

class MongoDB extends ICrud {

    constructor() {
        super()
    }

    create(item) {
        console.log('salvo no mongo db')
    }

}

module.exports = MongoDB