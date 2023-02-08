import React, { FormEvent } from 'react';
import { CorporateClientsSettingValue } from '../../../utils/userInfoType';
import { TextInput, Button, Group, Box, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import '../../../styles/userEdit.css';
type CorporateInfo = {
	info: CorporateClientsSettingValue;
	exitEdit: () => void;
};
function CorporateClientsEdit(props: CorporateInfo) {
	const form = useForm({
		initialValues: {
			username: props.info.username,
			email: props.info.email,
			contact_email: props.info.contact_email || '',
			gender: props.info.gender,
			identity: props.info.identity,
			avg_score: props.info.avg_score || 0,
			sum_of_even: props.info.sum_of_even || 0,
			contact_number: props.info.contact_number,
			name: props.info.name || '',
			description: props.info.description || '',
			businessAddress: props.info.business_address,
			businessBRNo: props.info.business_BR_no,
			businessWebsiteUrl: props.info.business_website_url,
		},

		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
		},
	});

	const navigate = useNavigate();

	return (
		<Box sx={{ maxWidth: 300 }} mx='auto'>
			<form
				onSubmit={form.onSubmit((values, e: FormEvent) => {
					e.preventDefault();

					async function fetchData() {
						const path = process.env.REACT_APP_API_BASE;
						const jwt = localStorage.getItem('token');
						await fetch(`${path}/users/editInfo`, {
							method: 'PUT',
							headers: {
								'Content-Type': 'application/json',
								Authorization: `Bearer ${jwt}`,
							},
							body: JSON.stringify(values),
						});
					}
					fetchData();
					navigate(-1);
				})}
			>
				<div className='outer'>Individual Clients EDIT</div>
				{/* <RichTextEditor {...form.getInputProps('email')} /> */}
				<TextInput
					className='allInput'
					disabled
					readOnly
					{...form.getInputProps('email')}
					label='email: (read only)'
				/>
				<TextInput
					className='allInput'
					{...form.getInputProps('contact_email')}
					label='contact email:'
					type='email'
				/>
				<TextInput
					className='allInput'
					required
					{...form.getInputProps('contact_number')}
					label='contact number:'
					minLength={8}
					maxLength={8}
				/>
				<TextInput
					className='allInput'
					required
					{...form.getInputProps('username')}
					label='username:'
				/>
				<TextInput
					className='allInput'
					disabled
					readOnly
					{...form.getInputProps('gender')}
					label='gender: '
				/>
				<TextInput
					className='allInput'
					disabled
					readOnly
					{...form.getInputProps('identity')}
					label='identity: '
				/>
				<NumberInput
					className='allInput'
					disabled
					readOnly
					{...form.getInputProps('avg_score')}
					label='AvgScore: '
				/>
				<TextInput
					className='allInput'
					disabled
					readOnly
					{...form.getInputProps('sum_of_even')}
					label='SumOfEven: '
				/>
				<TextInput
					className='allInput'
					disabled
					readOnly
					{...form.getInputProps('name')}
					label='name: '
				/>
				<TextInput
					className='allInput'
					label='description:'
					{...form.getInputProps('description')}
				/>
				<TextInput
					className='allInput'
					{...form.getInputProps('businessAddress')}
					label='Business Address: '
				/>
				<TextInput
					className='allInput'
					disabled
					readOnly
					{...form.getInputProps('businessBRNo')}
					label='Business BR No: '
				/>
				<TextInput
					className='allInput'
					{...form.getInputProps('businessWebsiteUrl')}
					label='Business Website: '
				/>
				<Group
					className='EditButtonGroup'
					position='center'
					mt='md'
					style={{ display: 'flex', justifyContent: 'space-between' }}
				>
					<Button className='Client-EditButtonGroup' type='button' onClick={props.exitEdit}>
						Exit
					</Button>
					<Button className='Client-EditButtonGroup' type='submit'>
						Complete
					</Button>
				</Group>
			</form>
		</Box>
	);
}

export default CorporateClientsEdit;
