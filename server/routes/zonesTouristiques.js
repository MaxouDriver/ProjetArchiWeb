const RequestManager = require('../utils/RequestManager.js')
const CacheManager = require('../utils/CacheManager.js');

function getAllData(successCallback, failureCallback){
	CacheManager.retreiveData("zonesTouristiques", 
		function onDataRetrieved(storedData){
			successCallback(storedData);
		}, 
		function onNoDataRetrieved(){
			RequestManager.performGet(
				function(receivedData){
					CacheManager.storeData("zonesTouristiques", receivedData, 
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

exports.getZones = function(req, res){
    console.log("/getZones called");
	getAllData(
		function(data){
			var result = [];
			data.records.forEach(function(item){
				result.push({name: item.fields.name, coordinates: item.geometry.coordinates});
			})
			res.json({success: true, data: result})
		},	
		function(err){
			res.json({success: false, message: err});
		}
	);
};
