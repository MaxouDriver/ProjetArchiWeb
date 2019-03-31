const RequestManager = require('../utils/RequestManager.js')
const CacheManager = require('../utils/CacheManager.js');

function getAllRestaurants(successCallback, failureCallback){
	CacheManager.retreiveData("restaurants",
		function onDataRetrieved(storedData){
			successCallback(storedData);
		},
		function onNoDataRetrieved(){
      RequestManager.performGet("https://opendata.paris.fr/api/records/1.0/search/?dataset=commercesparis&rows=3000&facet=arro&facet=situation&facet=libact&refine.libact=Brasserie+-+Restauration+continue+sans+tabac",
				function(receivedData){
					CacheManager.storeData("restaurants", receivedData,
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

exports.getRestaurants = function(req, res){
    console.log("/restaurants called");
		getAllRestaurants(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};
