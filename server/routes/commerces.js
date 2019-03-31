const RequestManager = require('../utils/RequestManager.js')
const CacheManager = require('../utils/CacheManager.js');
var NodeGeocoder = require('node-geocoder');

var options = {
    provider: 'openstreetmap'
};
var geocoder = NodeGeocoder(options);

function getAllData(cacheKey, url, successCallback, failureCallback){
	CacheManager.retreiveData(cacheKey,
		function onDataRetrieved(storedData){
			successCallback(storedData);
		},
		function onNoDataRetrieved(){
      RequestManager.performGet(url,
				function(receivedData){
						var result = [];
						var cpt = 0;
						var length = receivedData.records.length - 1;
            var onEverythingsDone = function(data){
									result.push(data);
									
									if (cpt == receivedData.records.length - 2) {
											CacheManager.storeData(cacheKey, result,
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
					receivedData.records.forEach(function(item){
						if (item.geometry == undefined) {
							if (item.fields.adresse_complete != undefined) {
									geocoder.geocode(item.fields.adresse_complete + ", Paris", function ( err, d ) {
											if (err){
												console.log(err);
											}
											if (d.length) {
													geo = {
															type: "Point",
															coordinates: [
																	d[0].latitude,
																	d[0].longitude
															]
													}
													onEverythingsDone({name: item.fields.nom_du_musee, geometry: geo, id: item.recordid});
											}
									});
							}
						}else{
							onEverythingsDone({name: item.fields.adresse_complete, geometry: item.geometry, id: item.recordid});
						}
					});
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

function getAllFrenchTraditionalRestaurant(successCallback, failureCallback){
	getAllData("frenchTraditionalRestaurant", "https://opendata.paris.fr/api/records/1.0/search/?dataset=commercesparis&rows=3000&facet=arro&facet=situation&facet=libact&refine.libact=Restaurant+traditionnel+fran%C3%A7ais", successCallback, failureCallback);
};

function getAllSatFastFood(successCallback, failureCallback){
	getAllData("satFastFood", "https://opendata.paris.fr/api/records/1.0/search/?dataset=commercesparis&rows=3000&facet=arro&facet=situation&facet=libact&refine.libact=Restauration+rapide+assise", successCallback, failureCallback);
};

function getAllStandingFastFood(successCallback, failureCallback){
	getAllData("standingFastFood", "https://opendata.paris.fr/api/records/1.0/search/?dataset=commercesparis&rows=3000&facet=arro&facet=situation&facet=libact&refine.libact=Restauration+rapide+debout", successCallback, failureCallback);
};

function getAllBarAndCoffee(successCallback, failureCallback){
	getAllData("barCoffee", "https://opendata.paris.fr/api/records/1.0/search/?dataset=commercesparis&rows=3000&facet=arro&facet=situation&facet=libact&refine.libact=Bar+ou+Caf%C3%A9+sans+tabac", successCallback, failureCallback);
};

function getAllArtGallery(successCallback, failureCallback){
	getAllData("artGallery", "https://opendata.paris.fr/api/records/1.0/search/?dataset=commercesparis&rows=3000&facet=arro&facet=situation&facet=libact&refine.libact=Galerie+d%27art", successCallback, failureCallback);
};

function getAllLocalProduct(successCallback, failureCallback){
	getAllData("localProduct", "https://opendata.paris.fr/api/records/1.0/search/?dataset=commercesparis&rows=3000&facet=arro&facet=situation&facet=libact&refine.libact=Produits+alimentaires+sp%C3%A9cialis%C3%A9s+r%C3%A9gionaux+et+%C3%A9trangers", successCallback, failureCallback);
};

function getAllSouvenirShop(successCallback, failureCallback){
	getAllData("souvenir", "https://opendata.paris.fr/api/records/1.0/search/?dataset=commercesparis&rows=3000&facet=arro&facet=situation&facet=libact&refine.libact=Bimbeloterie+-+Articles+souvenirs", successCallback, failureCallback);
};

function getAllTea(successCallback, failureCallback){
	getAllData("tea", "https://opendata.paris.fr/api/records/1.0/search/?dataset=commercesparis&rows=3000&facet=arro&facet=situation&facet=libact&refine.libact=Salon+de+th%C3%A9", successCallback, failureCallback);
};

exports.getFrenchTraditionalRestaurant = function(req, res){
    console.log("getFrenchTraditionalRestaurant called");
		getAllFrenchTraditionalRestaurant(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};
exports.getSatFastFood = function(req, res){
	console.log("getSatFastFood called");
	getAllSatFastFood(
	function(data){
		res.json({success: true, data: data})
	},
	function(err){
		res.json({success: false, message: err});
	}
);
};
exports.getStandingFastFood = function(req, res){
	console.log("getStandingFastFood called");
	getAllStandingFastFood(
	function(data){
		res.json({success: true, data: data})
	},
	function(err){
		res.json({success: false, message: err});
	}
);
};
exports.getBarAndCoffee = function(req, res){
	console.log("getBarAndCoffee called");
	getAllBarAndCoffee(
	function(data){
		res.json({success: true, data: data})
	},
	function(err){
		res.json({success: false, message: err});
	}
);
};
exports.getArtGallery = function(req, res){
	console.log("getArtGallery called");
	getAllArtGallery(
	function(data){
		res.json({success: true, data: data})
	},
	function(err){
		res.json({success: false, message: err});
	}
);
};
exports.getLocalProduct = function(req, res){
	console.log("getLocalProduct called");
	getAllLocalProduct(
	function(data){
		res.json({success: true, data: data})
	},
	function(err){
		res.json({success: false, message: err});
	}
);
};
exports.getSouvenirShop = function(req, res){
	console.log("getSouvenirShop called");
	getAllSouvenirShop(
	function(data){
		res.json({success: true, data: data})
	},
	function(err){
		res.json({success: false, message: err});
	}
);
};
exports.getTea = function(req, res){
	console.log("getTea called");
	getAllTea(
	function(data){
		res.json({success: true, data: data})
	},
	function(err){
		res.json({success: false, message: err});
	}
);
};
