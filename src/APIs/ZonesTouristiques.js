import RequestManager from '../utils/RequestManager';
const APIEndpoint = "https://opendata.paris.fr/api/records/1.0/search/?dataset=zones-touristiques-internationales";

var cache = undefined;

function getAllData(done, failureCallback){
    if (cache == undefined) {
        RequestManager.performGet(APIEndpoint, undefined, 
            function(res){
                cache = res;
                done(cache);
            },
            function(err){
                failureCallback(err);
            }
        );
    }else{
        done(cache);
    }
}
const ZoneTouristiques = {
    getPolygons(successCallback, failureCallback){
        getAllData(function(data){
            var result = [];
            data.records.forEach(function(item){
                result.push({name: item.fields.name, coordinates: item.geometry.coordinates});
            });
            successCallback(result);
        },function(err){
            failureCallback(err);
        });
    }
};

export default ZoneTouristiques;