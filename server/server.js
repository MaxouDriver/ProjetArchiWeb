const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");

const app = express();
const router = express.Router();
const port = 4000;
const serverInfos = require("../serverInfos.json");

app.use(bodyParser.urlencoded({ extended: true }, { limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

async function sendMail(name, email, subject, text, successCallback, failureCallback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: serverInfos.transporterHost,
    port: serverInfos.transporterPort,
    secure: serverInfos.transporterSecured, // true for 465, false for other ports
    auth: {
      user: serverInfos.transporterEmail, // generated ethereal user
      pass: serverInfos.transporterPassword // generated ethereal password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"' + name + '" <' + email + '>', // sender address
    to: serverInfos.transporterEmail, // list of receivers
    subject: subject, // Subject line
    text: text // plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return failureCallback(error);
    }
    return successCallback(info);
});
}

filters = require('./routes/filters.js');

zonesTouristiques = require('./routes/zonesTouristiques.js');
toilets = require('./routes/toilettes.js');
weather = require('./routes/meteo.js');
shop = require('./routes/commerces.js');
news = require('./routes/news.js');
planning = require('./routes/planning.js');
musees = require('./routes/musees.js');

router.route('/filters').get(filters.getFilters);

router.route('/zonesTouristiques').get(zonesTouristiques.getZones);

router.route('/toilets').get(toilets.getToilets);

router.route('/weather').get(weather.getWeather);
router.route('/weather/current').get(weather.getWeatherCurrent);

router.route('/shops/restaurant/frenchTraditionalRestaurant').get(shop.getFrenchTraditionalRestaurant);
router.route('/shops/restaurant/fastFood/sat').get(shop.getSatFastFood);
router.route('/shops/restaurant/fastFood/standing').get(shop.getStandingFastFood);
router.route('/shops/beverage/barCoffee').get(shop.getBarAndCoffee);
router.route('/shops/beverage/tea').get(shop.getTea);
router.route('/shops/artGallery').get(shop.getArtGallery);
router.route('/shops/localProduct').get(shop.getLocalProduct);
router.route('/shops/souvenir').get(shop.getSouvenirShop);

router.route('/musees').get(musees.getMusees);

router.route('/topHeadlinesNews').get(news.getTopHeadlinesNews);

router.route('/planning/add').post(planning.saveOnPlanning);
router.route('/planning').get(planning.getPlanning);

router.get('/', function(req, res) {
  res.json({ message: 'Nothing here!'});
});

router.post('/mail/send', function(req, res) {
  
  sendMail(req.body.name, req.body.email, req.body.subject, req.body.text, 
    function(info){
      res.json({ success: true, message: "Message sent: %s" + info.messageId});
    }, 
    function(err){
      res.json({ success: false, message: err});
    })
});

app.use('/api', router);

app.listen(port, () => console.log("Listening on port " + port));
