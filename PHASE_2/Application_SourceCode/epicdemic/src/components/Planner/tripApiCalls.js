import React from 'react';
import API_URL from '../../config.json';

export const createTrip = async (name, start_date, end_date, travellers) => {
  console.log(name, start_date, end_date, travellers)
  try {
    const response = await fetch(`${API_URL.API_URL}/v1/trips/new`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({
        name: name,
        start_date: start_date,
        end_date: end_date,
        travellers: travellers
      }),
    });
    const data = await response.json();
    if (response.status !== 200) {
      console.log(data)
      alert(data.data.error);
    } else {
      return (data.data)
    }
  } catch (e) {
      console.log(e)
  }
}

export const getSavedTrips = async () => {
  try {
    const response = await fetch(`${API_URL.API_URL}/v1/trips`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
    });
    const data = await response.json();
    if (response.status !== 200) {
      console.log(data)
      alert(data.data.error);
    } else {
      return (data.data)
    }
  } catch (e) {
      console.log(e)
  }
}

export const addCityToTrip = async (tripId, name, latitude, longitude, country_code, country_name) => {
  console.log(tripId, name, latitude, longitude, country_code, country_name)
  try {
    const response = await fetch(`${API_URL.API_URL}/v1/trips/new/city`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({
        trip_id: tripId,
        city_name: name,
        latitude: latitude,
        longitude: longitude,
        // start_date: null,
        // end_date: null,
        country_name: country_name,
        country_code: country_code,
      }),
    });
    const data = await response.json();
    if (response.status !== 200) {
      console.log(data)
      console.log(response)
    } else {
      return (data.data)
    }
  } catch (e) {
      console.log(e)
  }
}

export const addActivityToCity = async (activityId, cityId, tripId, name) => {
  try {
    const response = await fetch(`${API_URL.API_URL}/v1/trips/new/activity`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({
        tripId,
        cityId,
        activityId,
        name
      }),
    });
    const data = await response.json();
    if (response.status !== 200) {
      console.log(data)
      console.log(response)
    } 
    console.log(data)
  } catch (e) {
      console.log(e)
  }
}

export const deleteTrip = async (tripId) => {
  try {
    const response = await fetch(`${API_URL.API_URL}/v1/trips/${tripId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
    });
    const data = await response.json();
    if (response.status !== 200) {
      console.log(data)
      console.log(response)
    } 
    console.log(data)
  } catch (e) {
      console.log(e)
  }
}

export const getTripById = async (tripId) => {
  try {
    const response = await fetch(`${API_URL.API_URL}/v1/trips/${tripId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
    });
    const data = await response.json();
    if (response.status !== 200) {
      console.log(data)
      console.log(response)
    } else {
      console.log(data)
      return data.data
    }
  } catch (e) {
      console.log(e)
  }
}