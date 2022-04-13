import React from 'react';
import { useNavigate } from 'react-router'
import LoginForm from '../components/LoginForm'
import API_URL from '../config.json'

function Login () {
  const navigate = useNavigate()

  return (
    <>
    <LoginForm submit={async (request) => {
      // CHANGE API 
      const response = await fetch(`${API_URL}/users/login`, request)
      const data = await response.json()
      if (response.status === 400) {
        alert(data.error)
      } else {
        localStorage.setItem('token', data.token)
        navigate('/home')
      }
    }}></LoginForm>
  </>);
}

export default Login;
