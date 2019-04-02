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
        performPost("/api/planning/add", params, successCallback, failureCallback);
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
};

export default DatabaseManager;