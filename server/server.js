const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");

const app = express();
const router = express.Router();
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
events = require('./routes/evenements.js');

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

router.route('/events/animations/balade').get(events.getBalade);
router.route('/events/animations/atelierCours').get(events.getAtelierCours);
router.route('/events/animations/conferenceDebat').get(events.getConferenceDebat);
router.route('/events/animations/lectureRencontre').get(events.getLectureRencontre);
router.route('/events/animations/stage').get(events.getStage);
router.route('/events/animations/visiteGuidee').get(events.getVisiteGuidee);
router.route('/events/animations/loisirsJeux').get(events.getLoisirsJeux);
router.route('/events/animations/autre').get(events.getAutreAnimation);
router.route('/events/spectacles/humour').get(events.getHumour);
router.route('/events/spectacles/danse').get(events.getDanse);
router.route('/events/spectacles/theatre').get(events.getTheatre);
router.route('/events/spectacles/projection').get(events.getProjection);
router.route('/events/spectacles/cirque').get(events.getCirqueArtDeLaRue);
router.route('/events/spectacles/jeune').get(events.getJeunePublic);
router.route('/events/spectacles/opera').get(events.getOperaMusical);
router.route('/events/spectacles/autre').get(events.getAutreSpectacle);
router.route('/events/expositions/photographie').get(events.getPhotographie);
router.route('/events/expositions/beauxArts').get(events.getBeauxArts);
router.route('/events/expositions/artContemporain').get(events.getArtContemporain);
router.route('/events/expositions/streetArt').get(events.getStreetArt);
router.route('/events/expositions/histoireCivilisations').get(events.getHistoireCivilisations);
router.route('/events/expositions/illustration').get(events.getIllustrationBD);
router.route('/events/expositions/autre').get(events.getAutreExpo);
router.route('/events/concerts/classique').get(events.getClassique);
router.route('/events/concerts/chansonFrancaise').get(events.getChansonFrançaise);
router.route('/events/concerts/pop').get(events.getPopVariete);
router.route('/events/concerts/rock').get(events.getRock);
router.route('/events/concerts/jazz').get(events.getJazz);
router.route('/events/concerts/musiqueDuMonde').get(events.getMusiquesDuMonde);
router.route('/events/concerts/electronique').get(events.getElectronique);
router.route('/events/concerts/folk').get(events.getFolk);
router.route('/events/concerts/hipHop').get(events.getHipHop);
router.route('/events/concerts/reggae').get(events.getReggae);
router.route('/events/concerts/autre').get(events.getAutreConcert);
router.route('/events/brocante').get(events.getBrocanteMarche);
router.route('/events/sport').get(events.getEvenementSportif);
router.route('/events/festival').get(events.getFestivalCycle);
router.route('/events/fete').get(events.getFeteParade);
router.route('/events/salon').get(events.getSalon);
router.route('/events/autre').get(events.getAutreEvenement);

router.get('/', function(req, res) {
  res.json({ message: 'Nothing here!'});
});

router.post('/mail/send', function(req, res) {
  console.log('/mail/send called!');
  sendMail(req.body.name, req.body.email, req.body.subject, req.body.text, 
    function(info){
      res.json({ success: true, message: "Message sent: %s" + info.messageId});
    }, 
    function(err){
      res.json({ success: false, message: err});
    })
});

app.use('/api', router);

app.listen(serverInfos.serverPort, () => console.log("Listening on port " + serverInfos.serverPort));
