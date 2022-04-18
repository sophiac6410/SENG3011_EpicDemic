export default getActivities = async (latitude, longitude) =>  {
  console.log(latitude)
  console.log(longitude)
  var Amadeus = require('amadeus');

  var amadeus = new Amadeus({
    clientId: 'LwLbO6Ao6Gq2AdfFXsGAGlNuLoy9l1Fb',
    clientSecret: 'TRQA07tq1ZtPAZEg',
    hostname: 'production'
  });

  try {
    const response = await amadeus.shopping.activities.get({
    longitude: 2.160873,
    latitude: 41.397158
    })
    const result = await response.json();
    console.log(data);
    if (!result.data) {
        alert("error")
    } else {
        console.log(result.data)
        return reesult.data;
    }
  } catch (e) {
    console.log(e)
  }

}

