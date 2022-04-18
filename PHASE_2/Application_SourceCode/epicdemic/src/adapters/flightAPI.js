import axios from "axios";

const controller = new AbortController();

// This function allow you to make GET request to backend with params we need
export const getFligtData = params => {

  // Destructuring params
  const { originCode = "SYD", destinationCode = "BKK", dateOfDeparture = "2020-05-01", adults = 1 } = params;

  // Checking for proper subType 
  // const subTypeCheck = city && airport ? "CITY,AIRPORT" : city ? "CITY" : airport ? "AIRPORT" : ""

  // Amadeus API require at least 1 character, so with this we can be sure that we can make this request
  // const searchQuery = keyword ? keyword : "a";

  // This is extra tool for cancelation request, to avoid overload API 

  // GET request with all params we need
  console.log(params)
  const out = axios.get(
    `http://localhost:8080/api/flight-search/?originCode=${originCode}&destinationCode=${destinationCode}&dateOfDeparture=${dateOfDeparture}&adults=${adults}`,
    {
      signal: controller.signal
    }
  )

  return { out, controller }
};
