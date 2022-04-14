import React, { useState } from 'react';
import { useNavigate } from 'react-router'
import InputField from './InputField';
import PropTypes from 'prop-types';
import { Header, Box, Title, SubHeading, Footer, SubmitButton } from './Form'

function LoginForm ({ submit }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
  };

  const login = () => {
    if (email === '' || password === '') {
      alert('Please enter all fields');
      return;
    }
    submit(email, password);
  }

  return (
  <>
  <Box>
      <Header>
        <Title>Login</Title>
        <InputField type="email" change={e => setEmail(e.target.value)} placeholder="Enter your email"></InputField>
        <InputField type="password" change={e => setPassword(e.target.value)} placeholder="Enter a password"></InputField>
        <SubmitButton onClick={login} variant="contained">Login</SubmitButton>
      </Header>
      <Footer>
        <SubHeading>No account yet?</SubHeading>
        <SubmitButton variant="contained" onClick={() => { navigate('/register') }}>Sign Up</SubmitButton>
      </Footer>
      </Box>
  </>);
}

export default LoginForm;
