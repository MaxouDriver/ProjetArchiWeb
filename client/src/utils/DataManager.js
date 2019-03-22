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
    
        if (response.status === 401) {
            //Not authenticated
        }
    
        return body;
    };

    doGetAjax(url, query).then(res => {
        successCallback(res)
    }).catch(err => {
        failureCallback(err)}
    );
}
/*
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
    
        if (response.status !== 200) {
            //Not authenticated
        }
    
        return body;
    };

    doPostAjax(url, params).then(res => {
        successCallback(res)
    }).catch(err => {
        failureCallback(err)}
    );
};*/

const DatabaseManager = {
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
    }
};

export default DatabaseManager;