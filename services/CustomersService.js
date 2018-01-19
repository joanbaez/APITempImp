'use strict';
//require('console-stamp')(console, '[HH:MM:ss.l]');
require('console-stamp')(console, { pattern: 'dd/mm/yyyy HH:MM:ss.l' });
var soap = require('strong-soap').soap;
//var request = require('request');
//require('request').debug = true;



var response;
var messageResponse={};


var wsdlMetaSoapCustomerMail = {
    //endpointWsdl: 'http://spring-night-6859.getsandbox.com/CustomersMail/v1.wsdl',
    endpointWsdl: '/projects/APITempImp/wsdls/CustomersMailService.wsdl',
    options: {
            endpoint: 'http://spring-night-6859.getsandbox.com/CustomersMail/v1',
            disableCache: true
        }
};

var wsdlMetaSoapCustomer = {
    //endpointWsdl: 'http://quiet-morning-3864.getsandbox.com/Customers/v1.wsdl',
    endpointWsdl: '/projects/APITempImp/wsdls/CustomersService.wsdl',
    options: {
            endpoint: 'http://quiet-morning-3864.getsandbox.com/Customers/v1',
            disableCache: true
        }
};

var operationMetaSoapGetCustomerMail = {
    serviceSoap: 'CustomersMailService',
    portSoap: 'CustomersMailPort',
    operationSoap: 'getCustomerEmail'
};

var operationMetaSoapGetCustomer = {
    serviceSoap: 'CustomersService',
    portSoap: 'CustomersPort',
    operationSoap: 'getCustomer'
};


var soapCallout = function (wsdlMetaSoap, operationMetaSoap, requestData, requestHeader, callbackFunction) { //urlWsdl, optionsWsdl, requestData
    soap.createClient(wsdlMetaSoap.endpointWsdl, wsdlMetaSoap.options, function(err, client) {
        var soapOperationCallout = client[operationMetaSoap.serviceSoap][operationMetaSoap.portSoap][operationMetaSoap.operationSoap];
        soapOperationCallout(requestData, callbackFunction/*(err, result, envelope, soap, responseObject)*/, null, requestHeader);
    });
};

class CustomersService {
    constructor() {
    }

    getCustomers(res) {
        //All business logic here
        response=res;
        
        var requestArgs = {
            getCustomerRequest:{
                idCustomer: 432
            }
        
        };

        var customRequestHeader = {//'SOAPAction': 'http://mx.altan/CustomersMail/v1/getCustomerEmail',
                        //Connection: 'Keep-Alive',
                        //Host: "spring-night-6859.getsandbox.com",
                        'Content-Type': 'text/xml; charset=utf-8'
                    };

        console.log('inicia llamada a customers');
        soapCallout(wsdlMetaSoapCustomer, operationMetaSoapGetCustomer, requestArgs, customRequestHeader, customerHandler);
    }
}


/*
 * Response message handlers
 */
var responseHandler = function (message) {
    
    /*
     * Ultimate message handler
     * 
     */
    response.send(JSON.stringify(message));
};


/*
var templateHandler = function (err, result, envelope, soapHeader, response) {
    
}
*/

var customerHandler = function (err, result, envelope, soapHeader) {
    messageResponse.user=result.userName;
    messageResponse.customerName=result.firstName;
    messageResponse.customerLastName=result.lastName;
    //console.log(result.userName);
    //console.log(JSON.stringify(messageResponse));
    
    var requestArgs = {
            getCustomerEmailRequest:{
                idCustomer: 432
            }
        
        };

    var customRequestHeader = {//'SOAPAction': 'http://mx.altan/CustomersMail/v1/getCustomerEmail',
                    //Connection: 'Keep-Alive',
                    //Host: "spring-night-6859.getsandbox.com",
                    'Content-Type': 'text/xml; charset=utf-8'
                };
    console.log('inicia llamada a customers mail');
    soapCallout(wsdlMetaSoapCustomerMail, operationMetaSoapGetCustomerMail, requestArgs, customRequestHeader, emailCustomerHandler);
};

var emailCustomerHandler = function (err, result, envelope, soapHeader) {
    messageResponse.email=result.email;
     console.log('envia respuesta');
    responseHandler(messageResponse);
};

module.exports = new CustomersService();