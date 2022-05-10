import axios from "axios";

const controller = new AbortController();

// This function allow you to make GET request to backend with params we need
export const GetActivities = params => {

  // Destructuring params
  const { lat, lot } = params;

  // Checking for proper subType 
  // const subTypeCheck = city && airport ? "CITY,AIRPORT" : city ? "CITY" : airport ? "AIRPORT" : ""

  // Amadeus API require at least 1 character, so with this we can be sure that we can make this request
  // const searchQuery = keyword ? keyword : "a";

  // This is extra tool for cancelation request, to avoid overload API 

  // GET request with all params we need
  console.log(params)
  const out = axios.get(
    `http://localhost:8080/api/activity-search/?lat=${lat}&lot=${lot}`,
    {
      signal: controller.signal
    }
  )

  return { out, controller }
};

export const GetActivityById = params => {
  const { id } = params;
  const out = axios.get(
    `http://localhost:8080/api/activity-by-id/?activityId=${id}`,
    {
      signal: controller.signal
    }
  )

  return { out, controller }
};

export const GetActivityByIds = params => {
  const { ids } = params;
  const out = axios.get(
    `http://localhost:8080/api/activity-by-ids/?activityIds=${ids}`,
    {
      signal: controller.signal
    }
  )

  return { out, controller }
};