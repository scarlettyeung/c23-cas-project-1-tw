import React, { useState } from 'react';
import { loginThunk } from '../redux/auth';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { useRootDispatch } from '../redux/store';

function Login() {
	// const navigate = useNavigate();
	// const location = useLocation();
	// const targetPathname = location.state?.from.pathname || '/';

	const dispatch = useRootDispatch();
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');

	const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(loginThunk({ userEmail, userPassword }))
			.unwrap()
			// .then(() => navigate('/'))
			.catch((err) => {
				alert(err.message);
			});
		// navigate(targetPathname);
	};
	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={submitLogin}>
				<div>
					<label htmlFor='userEmail'>Email</label>
					<input
						id='userEmail'
						type='text'
						value={userEmail}
						onChange={(e) => setUserEmail(e.target.value)}
					></input>
				</div>
				<br></br>
				<div>
					<label htmlFor='userPassword'>Password</label>
					<input
						id='userPassword'
						type='text'
						value={userPassword}
						onChange={(e) => setUserPassword(e.target.value)}
					></input>
				</div>
				<div>
					<input type='submit' value='Submit' />
				</div>
				<div>
					<input type='button' value='register' />
				</div>
			</form>
		</div>
	);
}

export default Login;
