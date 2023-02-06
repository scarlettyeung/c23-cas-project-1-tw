import { useState } from 'react';
import { TextInput, Text, Button } from '@mantine/core';
import '../../../styles/register.css';

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
			<div className='register-basicInfo-outerDiv'>
				<Text style={{ fontSize: 25, marginBottom: 20 }}>Basic Information</Text>
				<TextInput
					size='lg'
					className='register-input'
					label='Email'
					autoFocus
					required
					type='email'
					value={email}
					onChange={(e) => {
						updateFields({ email: e.target.value });
						// dispatch(checkEmailValidation(e.target.value));
					}}
				/>
				<TextInput
					// variant="unstyled"
					id='register-password'
					size='lg'
					className='register-input'
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
					className='register-basicInfo-psw-btn'
					onClick={() => {
						setIsShown((cur) => !cur);
						isShown === true
							? document.getElementById('register-password')?.setAttribute('type', 'text')
							: document.getElementById('register-password')?.setAttribute('type', 'password');
					}}
				>
					{isShown === false ? <>Disable Password</> : <>Show Password</>}
				</Button>
				<TextInput
					// variant="unstyled"
					id='register-password2'
					size='lg'
					className='register-input'
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
					onClick={() => {
						setIsShown2((cur) => !cur);
						isShown2 === true
							? document.getElementById('register-password2')?.setAttribute('type', 'text')
							: document.getElementById('register-password2')?.setAttribute('type', 'password');
					}}
				>
					{isShown2 === false ? <>Disable Password</> : <>Show Password</>}
				</Button>
				<TextInput
					size='lg'
					className='register-input'
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
