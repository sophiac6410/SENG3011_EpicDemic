import { GroupAdd } from '@mui/icons-material';
import React from 'react';
import API_URL from '../../config.json';

export const addNewItem = async (cityId, item, groups, description) => {
  console.log(cityId, item, groups)
  try {
    const response = await fetch(`${API_URL.API_URL}/v1/trips/new/city/${cityId}/checklist/item`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({
        item,
        groups,
        description,
      }),
    });
    const data = await response.json();
    if (response.status !== 200) {
      console.log(data)
      alert(data.data.error);
    }
  } catch (e) {
      console.log(e)
  }
}

export const addNewGroup = async (cityId, group) => {
  console.log(cityId, group)
  try {
    const response = await fetch(`${API_URL.API_URL}/v1/trips/new/city/${cityId}/checklist/group`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({
        group
      }),
    });
    const data = await response.json();
    if (response.status !== 200) {
      console.log(data)
      alert(data.data.error);
    }
  } catch (e) {
      console.log(e)
  }
}