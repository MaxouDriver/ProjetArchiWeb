
var request = require('request');

exports.performGet = function(apiEndpoint, successCallback, failureCallback){
    request(apiEndpoint, function (error, response, body) {
        if (error) {
            failureCallback(error);
        }
        successCallback(JSON.parse(body));
    });
};
