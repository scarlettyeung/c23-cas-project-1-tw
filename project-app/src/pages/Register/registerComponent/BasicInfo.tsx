import { useState } from 'react';
import { TextInput, Text, Button } from '@mantine/core';
import '../../../styles/register.css';
import { IconLock, IconMail, IconUser } from '@tabler/icons';

export type BasicData = {
  email: string;
  password: string;
  password2: string;
  username: string;
};

type UserFormProps = Omit<BasicData, 'password2'> & {
  updateFields: (fields: Partial<Omit<BasicData, 'password2'>>) => void;
};

function BasicInfo({ email, password, username, updateFields }: UserFormProps) {
  const [psw, setPsw] = useState('');
  const [psw2, setPsw2] = useState('');
  const [errStatement, setErrStatement] = useState('');
  const [isShown, setIsShown] = useState(false);
  const [isShown2, setIsShown2] = useState(false);

  return (
    <>
      <div >
        <Text style={{ fontSize: 25, marginBottom: 20 }}>Basic Information</Text>
        <TextInput
          icon={<IconMail size={20} />}
          size='lg'
          className='register__input'
          label='Email'
          autoFocus
          required
          type='email'
          value={email}
          onChange={(e) => {
            updateFields({ email: e.target.value });
          }}
        />
        <TextInput
          icon={<IconLock size={20} />}
          id='register__password'
          size='lg'
          className='register__input'
          label='Password'
          required
          minLength={8}
          maxLength={16}
          value={psw}
          type='password'
          autoComplete='on'
          onChange={(e) => {
            setPsw(e.target.value);
          }}
        />
        <Button
          className='register__basicInfo__checkPassword'
          onClick={() => {
            setIsShown((cur) => !cur);
            isShown === true
              ? document.getElementById('register__password')?.setAttribute('type', 'text')
              : document.getElementById('register__password')?.setAttribute('type', 'password');
          }}
        >
          {isShown === false ? <>Disable Password</> : <>Show Password</>}
        </Button>
        <TextInput
          icon={<IconLock size={20} />}
          id='register__password2'
          size='lg'
          className='register__input'
          label='Confirm Password'
          required
          minLength={8}
          maxLength={16}
          error={errStatement}
          value={psw2}
          type='password'
          autoComplete='on'
          onChange={(e) => {
            setPsw2(e.target.value);

            console.log('in', psw, e.target.value);
            if (psw === e.target.value) {
              console.log('Ok');
              password = e.target.value;
              updateFields({ password: password });
              setErrStatement('');
            } else {
              setErrStatement('Invalid Password');
              updateFields({ password: '' });
            }
          }}
        />
        <Button
          className='register__basicInfo__checkPassword'
          onClick={() => {
            setIsShown2((cur) => !cur);
            isShown2 === true
              ? document.getElementById('register__password2')?.setAttribute('type', 'text')
              : document.getElementById('register__password2')?.setAttribute('type', 'password');
          }}
        >
          {isShown2 === false ? <>Disable Password</> : <>Show Password</>}
        </Button>
        <TextInput
          icon={<IconUser size={20} />}
          size='lg'
          className='register__input'
          label='Username'
          required
          type='text'
          value={username}
          onChange={(e) => updateFields({ username: e.target.value })}
        />
      </div>
    </>
  );
}

export default BasicInfo;
