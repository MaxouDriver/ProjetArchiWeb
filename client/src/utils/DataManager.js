function performGet(url, queries, successCallback, failureCallback){
    var query = "";
    if (queries != undefined) {
        for (var k in queries){
            if (query.length == 0) query += "?";
            query += k + "=" + queries[k];
        }
    }

    var doGetAjax = async (url, query) => {
        const response = await fetch(queries != undefined ? url + query : url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        const body = await response.json();

        return body;
    };

    doGetAjax(url, query).then(res => {
        successCallback(res)
    }).catch(err => {
        failureCallback(err)}
    );
}

function performPost(url, params, successCallback, failureCallback){
    var doPostAjax = async (url, params) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        const body = await response.json();

        return body;
    };

    doPostAjax(url, params).then(res => {
        successCallback(res)
    }).catch(err => {
        failureCallback(err)}
    );
}

const DatabaseManager = {
    sendMail(params, successCallback, failureCallback){
        performPost("/api/mail/send", params, successCallback, failureCallback);
    },
    saveOnPlanning(params, successCallback, failureCallback){
        performPost("/api/planning/add", params, function(data){
            if (data.success == true) {
                successCallback(data.message);
            }else{
                failureCallback(data.message);
            }
        }, failureCallback);
    },
    getZonesTouristiques(successCallback, failureCallback){
        performGet("/api/zonesTouristiques", undefined,
        function(res){
            successCallback(res.data);
        },
        failureCallback);
    },
    getToilets(successCallback, failureCallback){
        performGet("/api/toilets", undefined,
        function(res){
            successCallback(res.data);
        },
        failureCallback);
    },
    getNews(successCallback, failureCallback){
        performGet("/api/topHeadlinesNews", undefined,
        function(res){
            successCallback(res.data);
        },
        failureCallback);
    },
    getFilters(successCallback, failureCallback){
        performGet("/api/filters", undefined,
        function(res){
            successCallback(res.data);
        },
        failureCallback);
    },
    getPlanning(user, successCallback, failureCallback){
        performGet("/api/planning", {user: user},
        function(res){
            successCallback(res.data);
        },
        failureCallback);
    },
    getMuseums(successCallback, failureCallback){
        performGet("/api/musees", undefined,
        function(res){
            successCallback(res.data);
        },
        failureCallback);
    },
    getFrenchTraditionalRestaurant(successCallback, failureCallback){
        performGet("/api/shops/restaurant/frenchTraditionalRestaurant", undefined,
        function(res){
            successCallback(res.data);
        },
        failureCallback);
    },
    getSatFastFood(successCallback, failureCallback){
        performGet("/api/shops/restaurant/fastFood/sat", undefined,
        function(res){
            successCallback(res.data);
        },
        failureCallback);
    },
    getStandingFastFood(successCallback, failureCallback){
        performGet("/api/shops/restaurant/fastFood/standing", undefined,
        function(res){
            successCallback(res.data);
        },
        failureCallback);
    },
    getBarAndCoffee(successCallback, failureCallback){
        performGet("/api/shops/beverage/barCoffee", undefined,
        function(res){
            successCallback(res.data);
        },
        failureCallback);
    },
    getTea(successCallback, failureCallback){
        performGet("/api/shops/beverage/tea", undefined,
        function(res){
            successCallback(res.data);
        },
        failureCallback);
    },
    getArtGallery(successCallback, failureCallback){
        performGet("/api/shops/artGallery", undefined,
        function(res){
            successCallback(res.data);
        },
        failureCallback);
    },
    getLocalProduct(successCallback, failureCallback){
        performGet("/api/shops/localProduct", undefined,
        function(res){
            successCallback(res.data);
        },
        failureCallback);
    },
    getSouvenirShop(successCallback, failureCallback){
        performGet("/api/shops/souvenir", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    getWeatherCurrent(successCallback, failureCallback){
       performGet("/api/weather/current", undefined,
       function(res){
           successCallback(res.data);
       },
       failureCallback);
    },
    getWeatherByDate(date, successCallback, failureCallback){
        performGet("/api/weather", {date: date},
        function(res){
            successCallback(res.data);
        },
        failureCallback);
    },
    getBalade (successCallback, failureCallback){
        performGet("/api/events/animations/balade", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getAtelierCours(successCallback, failureCallback){
        performGet("/api/events/animations/atelierCours", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getConferenceDebat(successCallback, failureCallback){
        performGet("/api/events/animations/conferenceDebat", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getStage(successCallback, failureCallback){
        performGet("/api/events/animations/stage", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getVisiteGuidee(successCallback, failureCallback){
        performGet("/api/events/animations/visiteGuidee", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getLoisirsJeux(successCallback, failureCallback){
        performGet("/api/events/animations/loisirsJeux", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getLectureRencontre(successCallback, failureCallback){
        performGet("/api/events/animations/lectureRencontre", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getAutreAnimation(successCallback, failureCallback){
        performGet("/api/events/animations/autre", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    
    getHumour(successCallback, failureCallback){
        performGet("/api/events/spectacles/humour", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getDanse (successCallback, failureCallback){
        performGet("/api/shops/souvenir", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getTheatre(successCallback, failureCallback){
        performGet("/api/events/spectacles/theatre", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getProjection(successCallback, failureCallback){
        performGet("/api/events/spectacles/projection", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    
    getCirqueArtDeLaRue(successCallback, failureCallback){
        performGet("/api/events/spectacles/cirque", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getJeunePublic(successCallback, failureCallback){
        performGet("/api/events/spectacles/jeune", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getOperaMusical(successCallback, failureCallback){
        performGet("/api/events/spectacles/opera", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getAutreSpectacle(successCallback, failureCallback){
        performGet("/api/events/spectacles/autre", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getPhotographie(successCallback, failureCallback){
        performGet("/api/events/expositions/photographie", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getBeauxArts(successCallback, failureCallback){
        performGet("/api/events/expositions/beauxArts", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getArtContemporain(successCallback, failureCallback){
        performGet("/api/events/expositions/artContemporain", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getStreetArt(successCallback, failureCallback){
        performGet("/api/events/expositions/streetArt", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getHistoireCivilisations(successCallback, failureCallback){
        performGet("/api/events/expositions/histoireCivilisations", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getIllustrationBD(successCallback, failureCallback){
        performGet("/api/events/expositions/illustration", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getAutreExpo(successCallback, failureCallback){
        performGet("/api/events/expositions/autre", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getClassique(successCallback, failureCallback){
        performGet("/api/events/concerts/classique", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getFolk(successCallback, failureCallback){
        performGet("/api/events/concerts/folk", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    
    getHipHop(successCallback, failureCallback){
        performGet("/api/events/concerts/hipHop", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getReggae(successCallback, failureCallback){
        performGet("/api/events/concerts/reggae", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getChansonFrancaise(successCallback, failureCallback){
        performGet("/api/events/concerts/chansonFrancaise", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getPopVariete(successCallback, failureCallback){
        performGet("/api/events/concerts/pop", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getRock(successCallback, failureCallback){
        performGet("/api/events/concerts/rock", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getJazz(successCallback, failureCallback){
        performGet("/api/events/concerts/jazz", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getMusiquesDuMonde(successCallback, failureCallback){
        performGet("/api/events/concerts/musiqueDuMonde", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    
    getElectronique(successCallback, failureCallback){
        performGet("/api/events/concerts/electronique", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getAutreConcert(successCallback, failureCallback){
        performGet("/api/events/concerts/autre", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getBrocanteMarche(successCallback, failureCallback){
        performGet("/api/events/brocante", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getEvenementSportif(successCallback, failureCallback){
        performGet("/api/events/sport", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getFestivalCycle(successCallback, failureCallback){
        performGet("/api/events/festival", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getSoireeBal(successCallback, failureCallback){
        performGet("/api/events/fete", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
        
    getSalon(successCallback, failureCallback){
        performGet("/api/events/salon", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    },
    
    getAutreEvenement(successCallback, failureCallback){
        performGet("/api/events/autre", undefined,
        function(res){
            successCallback(res.data);
        }, 
        failureCallback);
    }
};

export default DatabaseManager;
