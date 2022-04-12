import React from 'react';
import { useNavigate } from 'react-router';
import RegisterForm from '../components/RegisterForm'
import { BigTitle } from '../components/Form'

function Register () {
  const navigate = useNavigate()

  return (
    <>
    <RegisterForm submit={async (request) => {
      const response = await fetch('http://localhost:5005/admin/auth/register', request)
      const data = await response.json()
      if (response.status !== 200) {
        alert(data.error)
      } else {
        localStorage.setItem('token', data.token)
        navigate('/')
      }
    }}></RegisterForm>
  </>);
}

export default Register;
