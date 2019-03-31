const RequestManager = require('../utils/RequestManager.js')
const CacheManager = require('../utils/CacheManager.js');

function getAllDataToilet(successCallback, failureCallback){
	CacheManager.retreiveData("toilets",
		function onDataRetrieved(storedData){
			successCallback(storedData);
		},
		function onNoDataRetrieved(){
			RequestManager.performGet("https://opendata.paris.fr/api/records/1.0/search/?dataset=sanisettesparis&rows=1000&facet=arrondissement&facet=horaires_ouverture",
				function(receivedData){
					var result = [];
					receivedData.records.forEach(function(item){
						result.push({name: item.fields.nom_voie, geometry: item.fields.geom, id: item.recordid});
					});
					CacheManager.storeData("toilets", result,
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

exports.getToilets = function(req, res){
    console.log("/getToilets called");
	getAllDataToilet(function(data){
			res.json({success: true, data: data});
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};
