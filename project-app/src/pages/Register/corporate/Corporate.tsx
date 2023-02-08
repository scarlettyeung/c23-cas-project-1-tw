import { FormEvent, useState } from 'react';
import BasicInfo from '../registerComponent/BasicInfo';
import { useMultiStepForm } from '../../../models/useMultistepForm';
import CorporateInfo from './Component/CorporateInfo';
import { useNavigate } from 'react-router-dom';
import { useRootDispatch, useRootSelector } from '../../../redux/store';
import { checkPswValidation } from '../../../redux/auth/slice';
import { Button } from '@mantine/core';

type FormData = {
	email: string;
	password: string;
	password2: string;
	username: string;
	companyName: string;
	contact: string;
	businessAddress: string;
	bRNumber: string;
	website: string;
	description: string;
	gender: string;
	contactEmail: string;
};

const INITIAL_DATA: FormData = {
	email: '',
	password: '',
	password2: '',
	username: '',
	companyName: '',
	contact: '',
	businessAddress: '',
	bRNumber: '',
	website: '',
	description: '',
	gender: '',
	contactEmail: '',
};

function Corporate() {
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
	if (typeOfAccount === 'corporate') {
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
		name: data.companyName,
		contactNumber: Number(data.contact),
		contactEmail: data.contactEmail,
		businessBRNo: data.bRNumber,
		businessWebsiteUrl: data.website,
		description: data.description,
		gender: data.gender,
		businessAddress: data.businessAddress,
	};
	dispatch(checkPswValidation(data.password));
	const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultiStepForm([
		<BasicInfo {...data} updateFields={updateFields} />,
		<CorporateInfo {...data} updateFields={updateFields} />,
	]);
	async function onSubmit(e: FormEvent) {
		e.preventDefault();
		if (!isLastStep) return next();
		const path = process.env.REACT_APP_API_BASE;
		await fetch(`${path}/users/createUser`, {
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
			<form onSubmit={onSubmit} className='register__performer__outerDiv'>
				<div style={{ marginTop: 70, fontSize: 30, fontWeight: 'bold', marginBottom: 20 }}>
					Corporate Client Registration
				</div>
				{step}
				<div
					style={{
						marginTop: '3vh',
						marginBottom: '10vh',
					}}
				>
					<div className='register__user__backPageSubmit'>
						{!isFirstStep ? (
							<Button className='register__user__back' type='button' onClick={back}>
								Back
							</Button>
						) : (
							<Button
								className='register__back__none'
								type='button'
								onClick={() => navigate('/register')}
							>
								Back
							</Button>
						)}
						<div className='register__performer__pageShow'>
							{currentStepIndex + 1} / {steps.length}
						</div>
						<Button className='register__user__nextAndSubmit' type='submit'>
							{isLastStep ? 'Submit' : 'Next'}
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default Corporate;
