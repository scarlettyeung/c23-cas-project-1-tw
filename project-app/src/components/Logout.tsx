import React from 'react';
import { logout } from '../redux/auth';
import { useRootDispatch } from '../redux/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconLogout } from '@tabler/icons-react';
import '../../src/styles/header.css'


function Logout() {
  const dispatch = useRootDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const targetPathname = location.state?.from.pathname || '/';

  const logoutBtn = () => {
    dispatch(logout());
    navigate('/login');

    navigate(targetPathname);
  };
  return (
    <button className='logOut-Btn' onClick={logoutBtn}>
      <IconLogout />
    </button>
  );
}

export default Logout;
