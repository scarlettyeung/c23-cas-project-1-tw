import React, { useState } from 'react';
import { loginThunk } from '../redux/auth';
import { useRootDispatch } from '../redux/store';
import '../styles/login.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Checkbox, TextInput } from '@mantine/core';
import { IconMail, IconLock } from '@tabler/icons';

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
			// .catch((err) => {
			//   alert(err.message);
			// });
			.catch(() => {
				alert('Invalid Email or Password!');
			});

		const targetPathname = location.state?.from.pathname || '/';
		navigate(targetPathname);
	};
	const [isClicked, setIsClicked] = useState(false);
	return (
		<div className='login__outerDiv'>
			<img className='login__logo' src='../../joasisLogo.png' alt='Joasis logo' />
			<form onSubmit={submitLogin}>
				<div className='login__inputDiv'>
					<TextInput
						icon={<IconMail size={14} />}
						className='login__loginInput'
						id='userEmail'
						type='text'
						placeholder='Email'
						value={userEmail}
						onChange={(e) => setUserEmail(e.target.value)}
					/>
				</div>
				<div className='login__inputDiv'>
					<TextInput
						icon={<IconLock size={14} />}
						className='login__loginInput'
						id='userPassword'
						type='password'
						placeholder='Password'
						value={userPassword}
						onChange={(e) => setUserPassword(e.target.value)}
						autoComplete='on'
					/>
				</div>
				<div>
					<Button type='submit' className='login__loginBtn'>
						LOGIN
					</Button>
				</div>
				<img className='login__break' src='../../break.png' alt='break' />
				<div>
					<Button
						className='login__registerBtn'
						onClick={() =>
							isClicked === true
								? navigate('/register')
								: alert('Please agree the Terms of Use & Privacy Policy')
						}
					>
						REGISTER
					</Button>
				</div>
			</form>
			<div className='login__checkboxDiv'>
				<Checkbox
					className='login__Checkbox'
					onClick={() => setIsClicked((current) => !current)}
					label='Logging in means you agree to our Terms of Use & Privacy Policy'
					color='red'
					radius='md'
				/>
			</div>
		</div>
	);
}
export default Login;
