var express = require('express'),
     app = express();
var bodyParser = require('body-parser')
 
app.use(bodyParser.json());


var apiRouter = express.Router();
app.use('/customer-api/v1', apiRouter);
 
var CustomersController = require('./controllers/CustomersController');
var rc = new CustomersController(apiRouter);


var server = app.listen(3000, function () {
  var host = server.address().address;
  host = (host === '::' ? 'localhost' : host);
  var port = server.address().port;
 
  console.log('listening at http://%s:%s', host, port);
});