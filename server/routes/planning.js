const db = require('../utils/DatabaseProvider.js').db;

exports.saveOnPlanning = function(req, res){
    console.log("/saveOnPlanning called");

    var ref = db.ref(req.body.user + "/planning/" + req.body.date + "/" + req.body.moment + "/");

    ref.once('value', function(snapshot) {
        var length = 0;
        var alreadyPlanned = false;
        snapshot.forEach(function(childSnapshot) {
            if (childSnapshot.val().title == req.body.name){
                alreadyPlanned = true;
            }
            length++;
        });
        if (alreadyPlanned) {
            res.json({success: false, message: "You already planned this event"});
        }else if(length < 6){
            ref.push().set({
                title: req.body.name, 
                type: req.body.type
            });
            res.json({success: true, message: "Successfully added"});
        }else{
            res.json({success: false, message: "Too many element at the moment of the selection"});
        }
        return;
    });
};

exports.getPlanning = function(req, res){
    console.log("/getPlanning called");

    var ref = db.ref(req.query.user);
    ref.once('value', function(snapshot) {
        var result = [];
        snapshot.forEach(function(childSnapshot) {
            result.push(childSnapshot.val());
        });
        console.log(result);
        res.json({success: true, data: result});
    });
}