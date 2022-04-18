const Amadeus = require("amadeus");
const router = require("express").Router();
// Getting env variables 
// const { CLIENT_ID, CLIENT_SECRET } = require('./config');
const API = `api`;
// This is AMADEUS client for getting authToken that we need to make actual call to amadeus API 
const amadeus = new Amadeus({
  clientId: "mGjZ7901nb0kV25dnkj2WZy1tEtLqVbp",
  clientSecret: "zzyRaxseNwed0V0D"
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
    await res.header("Access-Control-Allow-Origin", "*");
    await res.json(response.data);
  } catch(err) {
    await res.json(err);
  }
});
module.exports = router;