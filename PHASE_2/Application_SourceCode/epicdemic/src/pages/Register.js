import React from 'react';
import { useNavigate } from 'react-router';
import RegisterForm from '../components/RegisterForm'
import { BigTitle } from '../components/Form'
import { API_URL } from '../config.json'

function Register () {
  const navigate = useNavigate()

  return (
    <>
    <RegisterForm submit={async (request) => {
      const response = await fetch(`${API_URL}/users/register`, request)
      const data = await response.json()
      if (response.status !== 200) {
        alert(data.error)
      } else {
        localStorage.setItem('token', data.token)
        navigate('/home')
      }
    }}></RegisterForm>
  </>);
}

export default Register;
