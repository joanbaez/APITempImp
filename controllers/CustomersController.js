'use strict';

var CustomersService = require('../services/CustomersService');

function CustomersController(router) {
    this.router = router;
    this.registerRoutes();
}

CustomersController.prototype.registerRoutes = function() {
    this.router.get('/customers', this.getCustomers.bind(this));
}

CustomersController.prototype.getCustomers = function(req, res) {
    CustomersService.getCustomers(res);
}

module.exports = CustomersController;