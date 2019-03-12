
var request = require('request');
var apiEndpoint = "https://opendata.paris.fr/api/records/1.0/search/?dataset=zones-touristiques-internationales";

exports.performGet = function(successCallback, failureCallback){
    request(apiEndpoint, function (error, response, body) {
        if (error) {
            failureCallback(error);
        }
        successCallback(JSON.parse(body));
    });
};
