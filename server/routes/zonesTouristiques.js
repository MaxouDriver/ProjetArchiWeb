RequestManager = require('../utils/RequestManager.js')

exports.getZones = function(req, res){
    console.log("/getZones called");
    RequestManager.performGet(
        function(data){
            console.log(data);
            var result = [];
            data.records.forEach(function(item){
                result.push({name: item.fields.name, coordinates: item.geometry.coordinates});
            });
            res.json({success: true, data: result});
        }, function(err){
            res.json({success: false, message: err});
        }
    );
};