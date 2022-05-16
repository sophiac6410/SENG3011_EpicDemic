const Amadeus = require("amadeus");
const router = require("express").Router();
// Getting env variables 
// const { CLIENT_ID, CLIENT_SECRET } = require('./config');
const API = `api`;
// This is AMADEUS client for getting authToken that we need to make actual call to amadeus API 
const amadeus = new Amadeus({
  clientId: 'LwLbO6Ao6Gq2AdfFXsGAGlNuLoy9l1Fb',
  clientSecret: 'TRQA07tq1ZtPAZEg',
  hostname: 'production'
});

// Endpoint
router.get(`/${API}/flight-search`, async (req, res) => {
  const originCode = req.query.originCode;
  const destinationCode = req.query.destinationCode;
  const dateOfDeparture = req.query.dateOfDeparture
  const adults = req.query.adults
  // Find the cheapest flights
  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
        originLocationCode: originCode,
        destinationLocationCode: destinationCode,
        departureDate: dateOfDeparture,
        adults: adults,
        max: '10'
    });
    await res.header("Access-Control-Allow-Origin", "*").status(response.statusCode).json(response.data);
  } catch(err) {
    console.log(err)
    await res.status(500).json(err);
  }
});

router.get(`/${API}/activity-search`, async (req, res) => {
  const lat = req.query.lat;
  const lot = req.query.lot;
  // Find the cheapest flights
  try {
    const response = await amadeus.shopping.activities.get({
      latitude: lat,
      longitude: lot,
      radius: 20
    });
    await res.header("Access-Control-Allow-Origin", "*");
    await res.status(response.statusCode).json(response.data);
    console.log(response)
  } catch(err) {
    console.log(err)
    await res.status(500).json(err);
  }
});

router.get(`/${API}/activity-by-id`, async (req, res) => {
  const activityId = req.query.activityId;
  try {
    const response = await amadeus.shopping.activity(activityId).get()
    await res.header("Access-Control-Allow-Origin", "*");
    await res.status(response.status)
    await res.json(response.data);
  } catch (err) {
    console.log(err)
    res.status(500)
    res.send("Amadeus Network Limit Exceed")
  }
});

router.get(`/${API}/activity-by-ids`, async (req, res) => {
  const activityIds = req.query.activityIds.split(',');
  let result = []
  for(const activityId of activityIds) {
    try {
      const response = await amadeus.shopping.activity(activityId).get()
      console.log(response)
      if(response.statusCode == 200) {
        result.push(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  console.log(result)
  await res.header("Access-Control-Allow-Origin", "*");
  // await res.status(response.status)
  await res.json(result);
});
module.exports = router;