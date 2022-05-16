import React from 'react';
import data from '../components/Diseases/data';
import API_URL from '../config.json';

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

///// FOR GROUPS /////

export const addMember = async (email, tripId, type) => {
  console.log(email, tripId, type)
  try {
    const response = await fetch(`${API_URL.API_URL}/v1/trips/${tripId}/new/member`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({
        email: email,
        type: type
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

export const removeMember = async (email, tripId) => {
  console.log(email, tripId)
  try {
    const response = await fetch(`${API_URL.API_URL}/v1/trips/${tripId}/delete/member`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({
        email: email
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

export const getMembers = async (tripId) => {
  try {
    const response = await fetch(`${API_URL.API_URL}/v1/trips/${tripId}/members`, {
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
      return undefined
    } else {
      console.log(data)
      return data.data
    }
  } catch (e) {
      console.log(e)
  }
}

export const getTripOwner = async (tripId) => {
  try {
    const response = await fetch(`${API_URL.API_URL}/v1/trips/${tripId}/owner`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
    });
    const data = await response.json();
    if (response.status !== 200) {
      console.log(data.data)
      alert(data.data.error)
      return undefined
    } else {
      console.log('get trip owner', data.data)
      return data.data
    }
  } catch (e) {
      console.log(e)
  }
}

export const getActivityByCity = async (tripId, cityId) => {
    const response = await fetch(`${API_URL.API_URL}/v1/trips/${tripId}/city/${cityId}/activity`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('token')
      }, 
    })

    const data = response.json()
    return data
}

export const getDestinationPhotos = async (destination, small) => {
  const responseFindDest = await fetch(`https://api.roadgoat.com/api/v2/destinations/auto_complete?q=${destination}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Basic NzBjMjZkZGRjYzNmNThlYjMyNzM4NjQ4MGUxNDk3N2E6ZmY2ZjQyYWZjNWFiOTFkMjk1NTEzNmM1YzFlMjg5ODQ='
    }
  })

  const dataFindDest = await responseFindDest.json()
  if (responseFindDest.status !== 200) {
    console.log(dataFindDest.errors);
    alert('Error fetching destination');
  } else {
    console.log('finding dest', dataFindDest);
    if (dataFindDest.data.length > 0) {
      const locationId = dataFindDest.data[0].id;
      const respDestination = await fetch(`https://api.roadgoat.com/api/v2/destinations/${locationId}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Basic NzBjMjZkZGRjYzNmNThlYjMyNzM4NjQ4MGUxNDk3N2E6ZmY2ZjQyYWZjNWFiOTFkMjk1NTEzNmM1YzFlMjg5ODQ='
        }
      })
      const dataDestination = await respDestination.json()
      if (respDestination.status != 200) {
        console.log(respDestination.errors);
        alert('Error fetching destination');
      } else {
        console.log('got destination', dataDestination);
        let photos = []
        let known_for = []
        dataDestination.included.map((data) => {
          if (data.type == 'photo') {
            if (small) {
              photos = [data.attributes.image.medium, ...photos]
            } else {
              photos = [data.attributes.image.large, ...photos]
            }
          } else if (data.type == 'known_for') {
            known_for.push(data.attributes)
          }
        })
        console.log('photos', photos);
        return { photos: photos, known_for: known_for }
      }
    } else {
      return []
    }  
  }
}