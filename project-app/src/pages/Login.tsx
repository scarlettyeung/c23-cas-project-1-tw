import React, { useState } from 'react';
import { loginThunk } from '../redux/auth';
import { useRootDispatch } from '../redux/store';
import '../styles/login.css';
import { useLocation, useNavigate } from 'react-router-dom';

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
		<div>
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
					<input type='submit' value='LOGIN' className='login' />
				</div>
				<div>
					<input
						type='button'
						value='REGISTER'
						className='register'
						onClick={() => navigate('/register')}
					/>
				</div>
			</form>
		</div>
	);
}
export default Login;
