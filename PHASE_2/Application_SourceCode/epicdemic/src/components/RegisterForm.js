import React, { useState } from 'react';
import { useNavigate } from 'react-router'
import InputField from './InputField';
import PropTypes from 'prop-types';
import { SubmitButton, Header, Box, Title, SubHeading, Footer } from './Form'

function RegisterForm ({ submit }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  RegisterForm.propTypes = {
    submit: PropTypes.func.isRequired
  };

  const register = async () => {
    if (email === '' || name === '' || password === '' || password2 === '') {
      alert('Please enter all fields');
      return;
    } else if (password !== password2) {
      alert('Passwords do not match');
      return;
    }
    const request = {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        name,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
    submit(request)
  }

  return (
  <>
    <Box>
      <Header>
        <Title>Sign Up</Title>
        <InputField type="text" change={e => setName(e.target.value)} placeholder="Enter your name"></InputField>
        <InputField type="email" change={e => setEmail(e.target.value)} placeholder="Enter your email"></InputField>
        <InputField type="password" change={e => setPassword(e.target.value)} placeholder="Enter a password"></InputField>
        <InputField type="password" change={e => setConfirmPassword(e.target.value)} placeholder="Confirm password"></InputField>
        <SubmitButton onClick={register} variant="contained">Create Account</SubmitButton>
      </Header>
      <Footer>
        <SubHeading>Already have an account?</SubHeading>
        <SubmitButton variant="contained" onClick={() => { navigate('/') }}>Login</SubmitButton>
      </Footer>
      </Box>
  </>);
}

export default RegisterForm;
