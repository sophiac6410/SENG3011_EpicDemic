export default getActivities = async (latitude, longitude) =>  {
  console.log(latitude)
  console.log(longitude)
  var Amadeus = require('amadeus');

  var amadeus = new Amadeus({
    clientId: 'LwLbO6Ao6Gq2AdfFXsGAGlNuLoy9l1Fb',
    clientSecret: 'TRQA07tq1ZtPAZEg',
    hostname: 'production'
  });


    // const response = await amadeus.client.get('test.api.amadeus.com/v1/shopping/activities/', JSON.stringify({
    // longitude: 2.160873,
    // latitude: 41.397158
    // }))
    amadeus.shopping.activities.get({
      latitude: 41.397158,
      longitude: 2.160873
    }).then(function (response) {
      console.log(response);
    }).catch(function (response) {
      console.error(response);
    });
    /*const result = await response.json();
    console.log(data);
    if (!result.data) {
        alert("error")
    } else {
        console.log(result.data)
        return result.data;
    }
  } catch (e) {
    console.log(e)
  }*/

}

