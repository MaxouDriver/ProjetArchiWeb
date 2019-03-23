const RequestManager = require('../utils/RequestManager.js')
const CacheManager = require('../utils/CacheManager.js');
const APIKEY = require('../apiKey.js').apiNewsKey;

function getAllData(successCallback, failureCallback){
	CacheManager.retreiveData("news",
		function onDataRetrieved(storedData){
			successCallback(storedData);
		},
		function onNoDataRetrieved(){
			RequestManager.performGet("https://newsapi.org/v2/everything?q='paris tourism'&apiKey=" + APIKEY,
				function(receivedData){
					CacheManager.storeData("news", receivedData,
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

exports.getTopHeadlinesNews = function(req, res){
    console.log("/getTopHeadlinesNews called");
	getAllData(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};
