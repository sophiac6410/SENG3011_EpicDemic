import React from 'react';
import { useNavigate } from 'react-router'
import LoginForm from '../components/LoginForm'

function Login () {
  const navigate = useNavigate()

  return (
    <>
    <LoginForm submit={async (request) => {
      // CHANGE API 
      const response = await fetch('http://localhost:5005/admin/auth/login', request)
      const data = await response.json()
      if (response.status === 400) {
        alert(data.error)
      } else {
        localStorage.setItem('token', data.token)
        navigate('/')
      }
    }}></LoginForm>
  </>);
}

export default Login;
