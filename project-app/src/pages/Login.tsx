import React, { useState } from 'react';
import { loginThunk } from '../redux/auth';
import { useRootDispatch } from '../redux/store';
import '../styles/login.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Checkbox } from '@mantine/core'

function Login() {
  const dispatch = useRootDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginThunk({ userEmail, userPassword }))
      .unwrap()
      .then(() => navigate('/'))
      .catch((err) => {
        alert(err.message);
      });

    const targetPathname = location.state?.from.pathname || '/';
    navigate(targetPathname);
  };

  return (
    <div className='outerDiv'>
      <img className='logo' src='../../joasisLogo.png' alt='Joasis logo' />
      <form onSubmit={submitLogin}>
        <div>
          <input
            className='loginInput'
            id='userEmail'
            type='text'
            placeholder='Email'
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            className='loginInput'
            id='userPassword'
            type='password'
            placeholder='Password'
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>
        <div>
          <Button type='submit' className='login' radius="xl" variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }} uppercase size="lg" >LOGIN</Button>
        </div>
        <img className='break' src="../../break.png" alt="break" />
        <div>
          <Button
            type='button'
            className='register'
            onClick={() => navigate('/register')}
            radius="xl" variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }} uppercase size="lg"
          >REGISTER</Button>
        </div>
      </form>
      <div className='checkbox'>
        <Checkbox
          label="Logging in means you agree to our Terms of Use & Privacy Policy"
          color="red"
          radius="md"
        />
      </div>
    </div>
  );
}
export default Login;
