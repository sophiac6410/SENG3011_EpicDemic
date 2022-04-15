import React from 'react';
import API_URL from './config.json';

export const getUserSaved = async () => {
    try {
        const response = await fetch(`${API_URL.API_URL}/v1/users/saved`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('token'),
            },
        });
        const data = await response.json();
        console.log(data);
        if (!data.ok) {
            alert(data.data.error)
        } else {
            console.log(data.data)
            return data.data;
        }
    } catch (e) {
        console.log(e)
    }
}

export const saveDestination = async (method, code) => {
    try {
      const response = await fetch(`${API_URL.API_URL}/v1/users/location/${code}`, {
        method: method,
        headers: {
          'Content-type': 'application/json',
          Authorization: localStorage.getItem('token')
        }
      });
      const data = await response.json();
      if (!data.ok) {
        console.log(data);
        alert(data.data.error);
      }
    } catch (e) {
      console.log(e);
    }
}

export const getDestination = async (code) => {
    try {
        const response = await fetch(`${API_URL.API_URL}/v1/locations/${code}`, {
            method: 'GET'
        });
        const data = await response.json();
        console.log(data);
        if (!data.ok) {
            alert(data.data.error);
        } else {
            return data.data;
        }
    } catch (e) {
      console.log(e);
    }
}