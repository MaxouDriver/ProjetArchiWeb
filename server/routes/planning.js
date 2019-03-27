const db = require('../utils/DatabaseProvider.js').db;

exports.saveOnPlanning = function(req, res){
    console.log("/saveOnPlanning called");

    var ref = db.ref(req.body.user + "/planning");

    ref.push().set({
        title: req.body.name, 
        type: req.body.type, 
        date: req.body.date, 
        moment: req.body.moment
    });
    res.json({success: true, message: "Yes"});
};

exports.getPlanning = function(req, res){
    console.log("/getPlanning called");

    var ref = db.ref(req.query.user + "/planning");
    ref.once('value', function(snapshot) {
        var result = [];
        snapshot.forEach(function(childSnapshot) {
            result.push(childSnapshot.val());
        });
        res.json({success: true, data: result});
    });
}