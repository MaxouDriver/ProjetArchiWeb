const NodeCache = require("node-cache");
const cache = new NodeCache();

exports.storeData = function(key, data, successCallback, failureCallback){
    cache.set(key, data, function(err, success){
        if(!err && success){
            successCallback(data);
        }else{
            failureCallback(err);
        }
    });
}

exports.retreiveData = function(key, onDataRetrieved, onNoDataRetrieved, failureCallback){
    cache.get("zonesTouristiques", function(err, value){
		if (!err) {
			if (value == undefined){
                onNoDataRetrieved();
            }else{
				onDataRetrieved(value);
			}
		}else{
			failureCallback(err);
        }
    });
}