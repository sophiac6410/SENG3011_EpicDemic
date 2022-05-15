
const FindCities = async (country, categories) => {
  if (country) {
    console.log("country name is", country.name)
    const data = JSON.stringify({
      "query": `{ getPlaces(categories:[\"CITY\"],country:\"${country.name}\") { name,lat,lng,country,categories } }`
    });
    console.log(data)
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Host': 'travel-places.p.rapidapi.com',
        'X-RapidAPI-Key': '490c50b77fmshc9235606ebcae6cp13dd26jsndf3afedcfcda'
      },
      body: data,
    };
    
    try {
      const response = await fetch('https://travel-places.p.rapidapi.com/', options);
      const data = await response.json();
      console.log(data);
      if (!data.data) {
          alert(data.errors)
      } else {
          console.log(data)
          return data;
      }
    } catch (e) {
      console.log(e)
    }

  } else {
    const data = JSON.stringify({
      "query": "{ getPlaces(categories:[\"CITY\"]) { name,lat,lng,country,categories } }"
    });
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Host': 'travel-places.p.rapidapi.com',
        'X-RapidAPI-Key': '490c50b77fmshc9235606ebcae6cp13dd26jsndf3afedcfcda'
      },
      body: data,
    };

    try {
      const response = await fetch('https://travel-places.p.rapidapi.com/', options);
      const data = await response.json();
      console.log(data);
      if (!data.data) {
        console.log("hello error")
          alert(data.data.errors)
      } else {
          console.log(data)
          return data;
      }
    } catch (e) {
      console.log(e)
    }
    
  }
}

export default FindCities;