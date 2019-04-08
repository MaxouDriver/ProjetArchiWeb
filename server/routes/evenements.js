const RequestManager = require('../utils/RequestManager.js')
const CacheManager = require('../utils/CacheManager.js');
const APIKEY = require('../apiKey.js').apiNewsKey;

function getAllData(successCallback, failureCallback){
	CacheManager.retreiveData("events",
		function onDataRetrieved(storedData){
			successCallback(storedData);
		},
		function onNoDataRetrieved(){
			RequestManager.performGet("https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&rows=10&facet=category&facet=tags&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type",
				function(receivedData){
					CacheManager.storeData("events", receivedData,
						function(data){
							successCallback(data);
						},
						function(err){
							failureCallback(err);
						}
					);
				},function(err){
					failureCallback(err);
				}
			);
		},
		function failureCallback(err){
			failureCallback(err);
		}
	);
};

exports.getEvents = function(req, res){
    console.log("/getEvents called");
	getAllData(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};
