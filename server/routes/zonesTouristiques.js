const RequestManager = require('../utils/RequestManager.js')
const CacheManager = require('../utils/CacheManager.js');

function getAllData(successCallback, failureCallback){
	CacheManager.retreiveData("zonesTouristiques",
		function onDataRetrieved(storedData){
			successCallback(storedData);
		},
		function onNoDataRetrieved(){
			RequestManager.performGet("https://opendata.paris.fr/api/records/1.0/search/?dataset=zones-touristiques-internationales&rows=100",
				function(receivedData){
					var result = [];
					receivedData.records.forEach(function(item){
						result.push({name: item.fields.name, geometry: item.fields.geo_shape, id: item.fields.source});
					});
					CacheManager.storeData("zonesTouristiques", result,
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
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};
