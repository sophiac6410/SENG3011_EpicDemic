import React from 'react';
import { useNavigate } from 'react-router';
import RegisterForm from '../components/RegisterForm'
import { BigTitle } from '../components/Form'
import API_URL from '../config.json'
import { Context, useContext } from '../context';
import NavbarComp from '../components/Navbar';

function Register () {
  const navigate = useNavigate()
  const { setters } = useContext(Context);
  return (
    <>
    <NavbarComp bg={true}/>
    <RegisterForm submit={async (request) => {
      try {
        const response = await fetch(`${API_URL.API_URL}/v1/users/register`, request)
        const data = await response.json()
        if (response.status !== 200) {
          alert(data.error)
        } else {
          localStorage.setItem('token', data.data.token)
          setters.setLoggedIn(true);
          navigate('/')
        }
      } catch (e) {
        console.log(e)
      }
    }}></RegisterForm>
  </>);
}

export default Register;
