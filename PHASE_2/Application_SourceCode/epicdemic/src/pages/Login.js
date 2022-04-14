import React from 'react';
import { useNavigate } from 'react-router'
import LoginForm from '../components/LoginForm'
import NavbarComp from '../components/Navbar';
import API_URL from '../config.json'
import { Context, useContext } from '../context';

function Login () {
  const navigate = useNavigate()
  const { setters } = useContext(Context);
  return (
    <>
    <NavbarComp bg={true}></NavbarComp>
    <LoginForm submit={async (email, password) => {
      try {
        const response = await fetch(`${API_URL.API_URL}/v1/users/login`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          })
        });
        const data = await response.json()
        if (response.status === 400) {
          alert(data.error)
        } else {
          localStorage.setItem('token', data.data.token)
          setters.setLoggedIn(true);
          navigate('/');
        }
      } catch (e) {
        console.log(e)
      }

    }}></LoginForm>
  </>);
}

export default Login;
