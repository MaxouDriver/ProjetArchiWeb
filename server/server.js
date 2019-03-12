const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }, { limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
 

zonesTouristiques = require('./routes/zonesTouristiques.js');

router.route('/zonesTouristiques').get(zonesTouristiques.getZones);



router.get('/', function(req, res) {
  res.json({ message: 'Nothing here!'});
});

app.use('/api', router);

app.listen(port, () => console.log(`Listening on port ${port}`));
