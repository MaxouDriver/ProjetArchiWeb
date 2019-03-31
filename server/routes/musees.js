const RequestManager = require('../utils/RequestManager.js')
const CacheManager = require('../utils/CacheManager.js');
var NodeGeocoder = require('node-geocoder');

var options = {
    provider: 'openstreetmap'
};
var geocoder = NodeGeocoder(options);

function getAllMusees(successCallback, failureCallback){
	CacheManager.retreiveData("musees",
		function onDataRetrieved(storedData){
            console.log("data retrieved from cache");
			successCallback(storedData);
		},
		function onNoDataRetrieved(){
            var result = [];
            var cpt = 0;
            var onEverythingsDone = function(data){
                result.push(data);
                
                if (cpt == 19) {
                    CacheManager.storeData("musees", result,
						function(data){
							successCallback(data);
						},
						function(err){
							failureCallback(err);
						}
					);
                }
                cpt++;
            }
            for (var i = 75000 ; i < (75000 + 20) ; i++) {
                RequestManager.performGet("https://opendata.paris.fr/api/records/1.0/search/?dataset=liste-musees-de-france-a-paris&rows=100&facet=cp&refine.cp="+i,
                    function(receivedData){
                        receivedData.records.forEach(element => {
                            if (element.geometry == undefined) {
                                if (element.fields.adr != undefined) {
                                    geocoder.geocode(element.fields.adr + ", " + element.fields.ville, function ( err, d ) {
                                        if (d.length) {
                                            geo = {
                                                type: "Point",
                                                coordinates: [
                                                    d[0].latitude,
                                                    d[0].longitude
                                                ]
                                            }
                                            onEverythingsDone({name: element.fields.nom_du_musee, address: element.fields.adr + ", " + element.fields.ville, geometry: geo, id: element.recordid});
                                        }
                                    });
                                }
                            }else{
                                onEverythingsDone({name: element.fields.nom_du_musee, address: element.fields.adr + ", " + element.fields.ville, geometry: element.geometry, id: element.recordid});
                            }
                        });
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

exports.getMusees = function(req, res){
    console.log("/musees called");
    getAllMusees(
		function(data){
            res.json({success: true, data: data});
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};