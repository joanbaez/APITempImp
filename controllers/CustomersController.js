'use strict';

var CustomersService = require('../services/CustomersService');

class CustomersController {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {
        console.log('Calling Service');
        this.router.get('/customers', this.getCustomers.bind(this));
    }

    getCustomers(req, res) {
        CustomersService.getCustomers(res);
    }

}

module.exports = CustomersController;