const firebase = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
const serverInfos = require("../../serverInfos.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: serverInfos.databaseUrl
});

exports.db = firebase.database();