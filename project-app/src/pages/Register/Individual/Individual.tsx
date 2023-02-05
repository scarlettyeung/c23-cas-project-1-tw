import { FormEvent, useState } from 'react';
import BasicInfo from '../registerComponent/BasicInfo';
import { useMultiStepForm } from '../../../models/useMultistepForm';
import IndividualInfo from './Component/IndividualInfo';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useRootDispatch, useRootSelector } from '../../../redux/store';
import { checkPswValidation } from '../../../redux/auth/slice';
import '../../../styles/register.css';

type FormData = {
	email: string;
	password: string;
	password2: string;
	username: string;
	firstName: string;
	lastName: string;
	contact: string;
	gender: string;
	contactEmail: string;
};

const INITIAL_DATA: FormData = {
	email: '',
	password: '',
	password2: '',
	username: '',
	firstName: '',
	lastName: '',
	contact: '',
	gender: '',
	contactEmail: '',
};

function Individual() {
	const navigate = useNavigate();
	const dispatch = useRootDispatch();
	const typeOfAccount = useRootSelector((state) => state.auth.accountType);
	const [data, setData] = useState(INITIAL_DATA);

	function updateFields(fields: Partial<FormData>) {
		setData((prev) => {
			return { ...prev, ...fields };
		});
	}
	let fetchAccType: string;
	if (typeOfAccount === 'individual') {
		fetchAccType = 'client';
	} else {
		fetchAccType = '';
	}

	const fetchData = {
		identitySelect: fetchAccType,
		clientType: typeOfAccount,
		email: data.email,
		password: data.password,
		username: data.username,
		name: data.firstName + '/' + data.lastName,
		contactNumber: Number(data.contact),
		contactEmail: data.contactEmail,
		gender: data.gender,
	};
	dispatch(checkPswValidation(data.password));
	const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultiStepForm([
		<BasicInfo {...data} updateFields={updateFields} />,
		<IndividualInfo {...data} updateFields={updateFields} />,
	]);
	async function onSubmit(e: FormEvent) {
		e.preventDefault();
		if (!isLastStep) return next();
		const path = process.env.REACT_APP_API_BASE;
		await fetch(`${path}users/createUser`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(fetchData),
		});
		navigate('/');
	}

	return (
		<div>
			<form onSubmit={onSubmit} className='register-performer-outerDiv'>
				<div style={{ marginTop: 70, fontSize: 30, fontWeight: 'bold', marginBottom: 20 }}>
					Individual Client Registration
				</div>
				{step}
				<div
					style={{
						marginTop: '3vh',
						marginBottom: '10vh',
					}}
				>
					<div className='register-user-backPageSubmit'>
						{!isFirstStep ? (
							<Button className='register-user-back' type='button' onClick={back}>
								Back
							</Button>
						) : (
							<Button className='register-back-none'>Back</Button>
						)}
						<a className='register-performer-pageShow'>
							{currentStepIndex + 1} / {steps.length}
						</a>
						<Button className='register-user-nextAndSubmit' type='submit'>
							{isLastStep ? 'Submit' : 'Next'}
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default Individual;
