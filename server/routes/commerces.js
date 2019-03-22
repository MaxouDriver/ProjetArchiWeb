const RequestManager = require('../utils/RequestManager.js')
const CacheManager = require('../utils/CacheManager.js');

function getAllData(successCallback, failureCallback){
	CacheManager.retreiveData("shops",
		function onDataRetrieved(storedData){
			successCallback(storedData);
		},
		function onNoDataRetrieved(){
      var shops = [];
      var ii = 0;
      var arroSuccess = function(receivedData){
        shops.push(receivedData);
        if (ii==19) {
          CacheManager.storeData("shops", shops,
            function(data){
              successCallback(data);
            },
            function(err){
              failureCallback(err);
            }
          );
        }
        ii++;
      }
      for(var i = 75001; i<75021; i++){
        console.log(i);
  			RequestManager.performGet("https://opendata.paris.fr/api/records/1.0/search/?dataset=commercesparis&q=arro%3D"+i+"&rows=8999&facet=arro&facet=situation&facet=libact",
  				function(receivedData){
  				      arroSuccess(receivedData);
  				},function(err){
  					failureCallback(err);
  				}
  			);
      }
		},
		function failureCallback(err){
			failureCallback(err);
		}
	);
};

exports.getShops = function(req, res){
    console.log("/getShops called");
	getAllData(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};
