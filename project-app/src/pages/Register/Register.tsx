import React, { useState } from 'react';
import { useRootDispatch } from '../../redux/store';
import { AccountType } from '../../redux/auth';
import { useNavigate } from 'react-router-dom';
import { chooseType } from '../../redux/auth/slice';
import '../../styles/register.css';
import { Button } from '@mantine/core';

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useRootDispatch();

  const [performer, setPerformer] = useState<AccountType>(AccountType.Performer);
  const [client, setClient] = useState<AccountType>(AccountType.Client);
  const [corporateClient, setCorporateClient] = useState<AccountType>(AccountType.CorporateClient);

  const handlePerformer = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPerformer(event.currentTarget.value as AccountType);
    dispatch(chooseType(AccountType.Performer));
    navigate('/register/performer');
  };
  const handleClient = (event: React.MouseEvent<HTMLButtonElement>) => {
    setClient(event.currentTarget.value as AccountType);
    dispatch(chooseType(AccountType.Client));
    navigate('/register/individual');
  };

  const handleCorporateClient = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCorporateClient(event.currentTarget.value as AccountType);
    dispatch(chooseType(AccountType.CorporateClient));
    navigate('/register/corporate');
  };

  return (
    <div className='register__outerDiv'>
      <img className='register__logo' src='../../joasisLogo.png' alt='Joasis logo' />
      <div className='register__content'>Choose your account type!!</div>

      <div className='register__btnContainer'>
        <Button
          className='register__btn'
          uppercase
          id='performer'
          value={performer}
          onClick={handlePerformer}
        >
          Performer
        </Button>
        <Button
          className='register__btn'
          uppercase
          id='client'
          value={client}
          onClick={handleClient}
        >
          Individual Client
        </Button>
        <Button
          className='register__btn'
          uppercase
          id='corporate'
          value={corporateClient}
          onClick={handleCorporateClient}
        >
          Corporate Client
        </Button>

      </div>
    </div>
  );
}
