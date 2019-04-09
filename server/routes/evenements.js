const RequestManager = require('../utils/RequestManager.js')
const CacheManager = require('../utils/CacheManager.js');

function getAllData(cacheKey, url, successCallback, failureCallback){
	CacheManager.retreiveData(cacheKey,
		function onDataRetrieved(storedData){
			successCallback(storedData);
		},
		function onNoDataRetrieved(){
			RequestManager.performGet("https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&rows=1010&facet=category&facet=tags&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type" + url,
				function(receivedData){
					var result = [];
						
					receivedData.records.forEach(function(element){
						result.push({name: element.fields.title, geometry: element.geometry, id: element.recordid});
					});

					CacheManager.storeData(cacheKey, result,
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

function getAllBalade(successCallback, failureCallback){
	getAllData("balade", "&refine.category=Animations-%3EBalade", successCallback, failureCallback);
};
function getAllAtelierCours(successCallback, failureCallback){
	getAllData("atelierCours", "&refine.category=Animations-%3EAtelier+%2F+Cours", successCallback, failureCallback);
};
function getAllConferenceDebat(successCallback, failureCallback){
	getAllData("getAllConferenceDebat", "&refine.category=Animations-%3EConf%C3%A9rence+%2F+D%C3%A9bat", successCallback, failureCallback);
};
function getAllStage(successCallback, failureCallback){
	getAllData("stage", "&refine.category=Animations-%3EStage", successCallback, failureCallback);
};
function getAllVisiteGuidee(successCallback, failureCallback){
	getAllData("visiteGuidee", "&refine.category=Animations-%3EVisite+guid%C3%A9e", successCallback, failureCallback);
};
function getAllLoisirsJeux(successCallback, failureCallback){
	getAllData("loisirsJeux", "&refine.category=Animations-%3ELoisirs+%2F+Jeux", successCallback, failureCallback);
};
function getAllLectureRencontre(successCallback, failureCallback){
	getAllData("lectureRencontre", "&refine.category=Animations-%3ELecture+%2F+Rencontre", successCallback, failureCallback);
};
function getAllAutreAnimation(successCallback, failureCallback){
	getAllData("autreAnimation", "&refine.category=Animations-%3EAutre+animation", successCallback, failureCallback);
};


function getAllHumour(successCallback, failureCallback){
	getAllData("humour", "&refine.category=Spectacles-%3EHumour", successCallback, failureCallback);
};
function getAllDanse(successCallback, failureCallback){
	getAllData("danse", "&refine.category=Spectacles-%3EDanse", successCallback, failureCallback);
};
function getAllTheatre(successCallback, failureCallback){
	getAllData("theatre", "&refine.category=Spectacles-%3ETh%C3%A9%C3%A2tre", successCallback, failureCallback);
};
function getAllProjection(successCallback, failureCallback){
	getAllData("projection", "&refine.category=Spectacles-%3EProjection", successCallback, failureCallback);
};
function getAllCirqueArtDeLaRue(successCallback, failureCallback){
	getAllData("cirqueArtDeLaRue", "&refine.category=Spectacles-%3ECirque+%2F+Art+de+la+Rue", successCallback, failureCallback);
};
function getAllJeunePublic(successCallback, failureCallback){
	getAllData("jeunePublic", "&refine.category=Spectacles-%3EJeune+public", successCallback, failureCallback);
};
function getAllOperaMusical(successCallback, failureCallback){
	getAllData("operaMusical", "&refine.category=Spectacles-%3EOp%C3%A9ra+%2F+Musical", successCallback, failureCallback);
};
function getAllAutreSpectacle(successCallback, failureCallback){
	getAllData("autreSpectacle", "&refine.category=Spectacles-%3EAutre+spectacle", successCallback, failureCallback);
};


function getAllPhotographie(successCallback, failureCallback){
	getAllData("photographie", "&refine.category=Expositions-%3EPhotographie", successCallback, failureCallback);
};
function getAllBeauxArts(successCallback, failureCallback){
	getAllData("beauxArts", "&refine.category=Expositions-%3EBeaux-Arts", successCallback, failureCallback);
};
function getAllArtContemporain(successCallback, failureCallback){
	getAllData("artContemporain", "&refine.category=Expositions-%3EArt+Contemporain", successCallback, failureCallback);
};
function getAllStreetArt(successCallback, failureCallback){
	getAllData("streetArt", "&refine.category=Expositions-%3EStreet-art", successCallback, failureCallback);
};
function getAllHistoireCivilisations(successCallback, failureCallback){
	getAllData("histoireCivilisations", "&refine.category=Expositions-%3EHistoire+%2F+Civilisations", successCallback, failureCallback);
};
function getAllIllustrationBD(successCallback, failureCallback){
	getAllData("illustrationBD", "&refine.category=Expositions-%3EIllustration+%2F+BD", successCallback, failureCallback);
};
function getAllSciencesTechniques(successCallback, failureCallback){
	getAllData("sciencesTechniques", "&refine.category=Expositions-%3ESciences+%2F+Techniques", successCallback, failureCallback);
};
function getAllDesignMode(successCallback, failureCallback){
	getAllData("designMode", "&refine.category=Expositions-%3EDesign+%2F+Mode", successCallback, failureCallback);
};
function getAllAutreExpo(successCallback, failureCallback){
	getAllData("autreExpo", "&refine.category=Expositions-%3EAutre+expo", successCallback, failureCallback);
};


function getAllClassique(successCallback, failureCallback){
	getAllData("classique", "&refine.category=Concerts-%3EClassique", successCallback, failureCallback);
};
function getAllFolk(successCallback, failureCallback){
	getAllData("folk", "&refine.category=Concerts-%3EFolk", successCallback, failureCallback);
};
function getAllHipHop(successCallback, failureCallback){
	getAllData("hipHop", "&refine.category=Concerts-%3EHip-Hop", successCallback, failureCallback);
};
function getAllReggae(successCallback, failureCallback){
	getAllData("reggae", "&refine.category=Concerts-%3EReggae ", successCallback, failureCallback);
};
function getAllChansonFrançaise(successCallback, failureCallback){
	getAllData("chansonFrançaise", "&refine.category=Concerts-%3EChanson+fran%C3%A7aise", successCallback, failureCallback);
};
function getAllPopVariete(successCallback, failureCallback){
	getAllData("popVariete", "&refine.category=Concerts-%3EPop+%2F+Vari%C3%A9t%C3%A9", successCallback, failureCallback);
};
function getAllRock(successCallback, failureCallback){
	getAllData("rock", "&refine.category=Concerts-%3ERock", successCallback, failureCallback);
};
function getAllJazz(successCallback, failureCallback){
	getAllData("jazz", "&refine.category=Concerts-%3EJazz", successCallback, failureCallback);
};
function getAllMusiquesDuMonde(successCallback, failureCallback){
	getAllData("musiquesDuMonde", "&refine.category=Concerts-%3EMusiques+du+Monde", successCallback, failureCallback);
};
function getAllElectronique(successCallback, failureCallback){
	getAllData("electronique", "&refine.category=Concerts-%3E%C3%89lectronique", successCallback, failureCallback);
};
function getAllAutreConcert(successCallback, failureCallback){
	getAllData("autreConcert", "&refine.category=Concerts-%3EAutre+concert", successCallback, failureCallback);
};

	
function getAllBrocanteMarche(successCallback, failureCallback){
	getAllData("brocanteMarche", "&refine.category=Animations-%3EBalade", successCallback, failureCallback);
};
function getAllEvenementSportif(successCallback, failureCallback){
	getAllData("evenementSportif", "&refine.category=Animations-%3EAtelier+%2F+Cours", successCallback, failureCallback);
};
function getAllFestivalCycle(successCallback, failureCallback){
	getAllData("festivalCycle", "&refine.category=Animations-%3EConf%C3%A9rence+%2F+D%C3%A9bat", successCallback, failureCallback);
};
function getAllSoireeBal(successCallback, failureCallback){
	getAllData("soireeBal", "&refine.category=Animations-%3EStage", successCallback, failureCallback);
};
function getAllSalon(successCallback, failureCallback){
	getAllData("salon", "&refine.category=Animations-%3ELoisirs+%2F+Jeux", successCallback, failureCallback);
};
function getAllFeteParade(successCallback, failureCallback){
	getAllData("feteParade", "&refine.category=Animations-%3ELecture+%2F+Rencontre", successCallback, failureCallback);
};
function getAllAutreEvenement(successCallback, failureCallback){
	getAllData("autreEvenement", "&refine.category=Animations-%3EAutre+animation", successCallback, failureCallback);
};

exports.getBalade = function(req, res){
    console.log("/getBalade called");
	getAllBalade(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getAtelierCours = function(req, res){
    console.log("/getAtelierCours called");
	getAllAtelierCours(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getConferenceDebat = function(req, res){
    console.log("/getConferenceDebat called");
	getAllConferenceDebat(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getStage = function(req, res){
    console.log("/getStage called");
	getAllStage(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getVisiteGuidee = function(req, res){
    console.log("/getVisiteGuidee called");
	getAllVisiteGuidee(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getLoisirsJeux = function(req, res){
    console.log("/getLoisirsJeux called");
	getAllLoisirsJeux(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getLectureRencontre = function(req, res){
    console.log("/getLoisirsJeux called");
	getAllLectureRencontre(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getAutreAnimation = function(req, res){
    console.log("/getAutreAnimation called");
	getAllAutreAnimation(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};


exports.getHumour = function(req, res){
    console.log("/getHumour called");
	getAllHumour(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getDanse = function(req, res){
    console.log("/getDanse called");
	getAllDanse(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getTheatre = function(req, res){
    console.log("/getTheatre called");
	getAllTheatre(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getProjection = function(req, res){
    console.log("/getProjection called");
	getAllProjection(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};


exports.getCirqueArtDeLaRue = function(req, res){
    console.log("/getCirqueArtDeLaRue called");
	getAllCirqueArtDeLaRue(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getJeunePublic = function(req, res){
    console.log("/getJeunePublic called");
	getAllJeunePublic(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getOperaMusical = function(req, res){
    console.log("/getOperaMusical called");
	getAllOperaMusical(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getAutreSpectacle = function(req, res){
    console.log("/getAutreSpectacle called");
	getAllAutreSpectacle(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getPhotographie = function(req, res){
    console.log("/getPhotographie called");
	getAllPhotographie(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getBeauxArts = function(req, res){
    console.log("/getBeauxArts called");
	getAllBeauxArts(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getArtContemporain = function(req, res){
    console.log("/getArtContemporain called");
	getAllArtContemporain(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getStreetArt = function(req, res){
    console.log("/getStreetArt called");
	getAllStreetArt(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getHistoireCivilisations = function(req, res){
    console.log("/getHistoireCivilisations called");
	getAllHistoireCivilisations(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getIllustrationBD = function(req, res){
    console.log("/getIllustrationBD called");
	getAllIllustrationBD(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getSciencesTechniques = function(req, res){
    console.log("/getSciencesTechniques called");
	getAllSciencesTechniques(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getDesignMode = function(req, res){
    console.log("/getDesignMode called");
	getAllDesignMode(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getAutreExpo = function(req, res){
    console.log("/getAutreExpo called");
	getAllAutreExpo(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getClassique = function(req, res){
    console.log("/getClassique called");
	getAllClassique(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getFolk = function(req, res){
    console.log("/getFolk called");
	getAllFolk(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};


exports.getHipHop = function(req, res){
    console.log("/getHipHop called");
	getAllHipHop(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getReggae = function(req, res){
    console.log("/getReggae called");
	getAllReggae(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getChansonFrançaise = function(req, res){
    console.log("/getChansonFrançaise called");
	getAllChansonFrançaise(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getPopVariete = function(req, res){
    console.log("/getPopVariete called");
	getAllPopVariete(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getRock = function(req, res){
    console.log("/getRock called");
	getAllRock(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getJazz = function(req, res){
    console.log("/getJazz called");
	getAllJazz(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getMusiquesDuMonde = function(req, res){
    console.log("/getMusiquesDuMonde called");
	getAllMusiquesDuMonde(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};


exports.getElectronique = function(req, res){
    console.log("/getElectronique called");
	getAllElectronique(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getAutreConcert = function(req, res){
    console.log("/getAutreConcert called");
	getAllAutreConcert(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getBrocanteMarche = function(req, res){
    console.log("/getBrocanteMarche called");
	getAllBrocanteMarche(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getEvenementSportif = function(req, res){
    console.log("/getEvenementSportif called");
	getAllEvenementSportif(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getFestivalCycle = function(req, res){
    console.log("/getFestivalCycle called");
	getAllFestivalCycle(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getSoireeBal = function(req, res){
    console.log("/getSoireeBal called");
	getAllSoireeBal(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};
	
exports.getSalon = function(req, res){
    console.log("/getSalon called");
	getAllSalon(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getFeteParade = function(req, res){
    console.log("/getFeteParade called");
	getAllFeteParade(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

exports.getAutreEvenement = function(req, res){
    console.log("/getAutreEvenement called");
	getAllAutreEvenement(
		function(data){
			res.json({success: true, data: data})
		},
		function(err){
			res.json({success: false, message: err});
		}
	);
};

