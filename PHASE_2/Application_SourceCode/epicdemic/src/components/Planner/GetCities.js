import { TableSortLabel } from '@material-ui/core';
import React from 'react'

export const getUserSaved = async () => {
  
}

const GetCities = async (country, sort) => {
  console.log(sort)
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
      'X-RapidAPI-Key': 'd6ac1d5f54msh087827c9371bac6p1f5c44jsn94f2fd0d46f6'
    }
  };
  if (country) {
    console.log("ok")
    try {
      const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions?sort=${sort}&limit=100&countryIds=${country.code}`, options);
      const data = await response.json();
      console.log(data);
      if (!data.data) {
          alert(data.data.errors)
      } else {
          console.log(data)
          return data;
      }
    } catch (e) {
      console.log(e)
    }
  } else {
    console.log("hello")
    const countries = "AD%2CAL%2CAT%2CBA%2CBE%2CBG%2CBY%2CCH%2CCY%2CCZ%2CDE%2CDK%2CEE%2CES%2CFI%2CFR%2CGB%2CGR%2CHR%2CHU%2CIE%2CIT%2CJE%2CLI%2CLT%2CLU%2CLV%2CMC%2CMD%2CMK%2CMT%2CNL%2CNO%2CPL%2CPT%2CRO%2CRU%2CSE%2CSI%2CSK%2CSM%2CUA%2CVA"
    try {
      const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions?sort=${sort}&limit=100&countryIds=${countries}`, options);
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
/*  } else {

    try {
      console.log("hi")
      const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions?sort=-population`, options);
      const data = await response.json();
      console.log(data);
      if (!data.data) {
          alert(data.data.errors)
          console.log("hi error")
      } else {
          console.log(data.data)
          return data.data;
      }
    } catch (e) {
      console.log(e)
    }
  } */
}

export default GetCities;