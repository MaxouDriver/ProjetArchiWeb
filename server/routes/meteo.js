const RequestManager = require('../utils/RequestManager.js')
const CacheManager = require('../utils/CacheManager.js');

function getAllData(successCallback, failureCallback){
	RequestManager.performGet("https://www.prevision-meteo.ch/services/json/lat=46.259lng=5.235",
		function(receivedData){
			CacheManager.storeData("weather", receivedData,
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
};

exports.getWeather = function(req, res){
    console.log("/getWeather called");
	getAllData(
		function(data){
			var result = undefined;
			if (data.fcst_day_0.date == req.query.date) {
				result = data.fcst_day_0;
			}else if (data.fcst_day_1.date == req.query.date) {
				result = data.fcst_day_1;
			}else if (data.fcst_day_2.date == req.query.date) {
				result = data.fcst_day_2;
			}else if (data.fcst_day_3.date == req.query.date) {
				result = data.fcst_day_3;
			}else if (data.fcst_day_4.date == req.query.date) {
				result = data.fcst_day_4;
			}
			res.json({success: true, data: result})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getWeatherCurrent = function(req, res){
    console.log("/getWeatherOfToday called");
	getAllData(
		function(data){
			res.json({success: true, data: {time: data.current_condition.hour, condition: data.current_condition.condition_key}})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};
