import { FormEvent } from 'react';
import { PerformersSettingValue } from '../../../utils/userInfoType';

import { TextInput, Button, Group, Box, Center, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';

import { useNavigate } from 'react-router-dom';
import '../../../styles/userEdit.css';

type PerformerInfo = {
	info: PerformersSettingValue;
	exitEdit: () => void;
};

function PerformersEdit(props: PerformerInfo) {
	const form = useForm({
		initialValues: {
			username: props.info.username,
			email: props.info.email,
			contact_email: props.info.contact_email,
			gender: props.info.gender,
			identity: props.info.identity,
			avg_score: props.info.avg_score || 0,
			sum_of_even: props.info.sum_of_even || 0,
			years_of_exp: props.info.years_of_exp,
			birthday: props.info.birthday,
			contact_number: props.info.contact_number,
			name: props.info.name || '',
			description: props.info.description || '',
			facebook_url: props.info.facebook_url || '',
			twitter_url: props.info.twitter_url || '',
			youtube_url: props.info.youtube_url || '',
			ig_url: props.info.ig_url || '',
			performers_hashtags: props.info.performers_hashtags,
		},

		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
		},
	});

	const hashArray = props.info.performers_hashtags?.map((tag) => '#' + tag.name + ' ');

	const navigate = useNavigate();

	return (
		<Box sx={{ maxWidth: 300 }} mx='auto'>
			<form
				onSubmit={form.onSubmit((values, e: FormEvent) => {
					e.preventDefault();

					async function fetchData() {
						const path = process.env.REACT_APP_API_BASE;
						const jwt = localStorage.getItem('token');
						await fetch(`${path}users/editInfo`, {
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
				<div>Performers Edit</div>
				<TextInput readOnly {...form.getInputProps('email')} label='email: (read only)' />
				<TextInput {...form.getInputProps('contact_email')} label='contact email: ' type='email' />
				<TextInput
					required
					{...form.getInputProps('contact_number')}
					label='contact number:'
					minLength={8}
					maxLength={8}
				/>
				<TextInput required {...form.getInputProps('username')} label='username:' />
				<TextInput readOnly {...form.getInputProps('gender')} label='gender: (read only)' />
				<TextInput readOnly {...form.getInputProps('identity')} label='identity: (read only)' />
				<NumberInput readOnly {...form.getInputProps('avg_score')} label='AvgScore: (read only)' />
				<TextInput readOnly {...form.getInputProps('sum_of_even')} label='SumOfEven: (read only)' />
				<NumberInput {...form.getInputProps('years_of_exp')} label='yearsOfExp:' min={0} max={99} />
				<Center>
					<DatePicker
						styles={{ root: { width: 700 } }}
						placeholder='Pick date'
						readOnly
						label='birthday: (read only)'
						inputFormat='MM/DD/YYYY'
						labelFormat='MM/YYYY'
						defaultValue={new Date(props.info.birthday!)}
					/>
				</Center>
				<TextInput readOnly {...form.getInputProps('name')} label='name: (read only)' />
				<TextInput {...form.getInputProps('facebook_url')} label='facebookUrl:' />
				<TextInput {...form.getInputProps('twitter_url')} label='twitterUrl:' />
				<TextInput {...form.getInputProps('youtube_url')} label='youtubeUrl:' />
				<TextInput {...form.getInputProps('ig_url')} label='igUrl:' />
				<TextInput readOnly value={hashArray} label='hash tag: (read only)' />
				<TextInput label='description:' {...form.getInputProps('description')} />
				<Group position='right' mt='md'>
					<Button type='button' onClick={props.exitEdit}>
						Exit
					</Button>
					<Button type='submit'>Complete</Button>
				</Group>
			</form>
		</Box>
	);
}

export default PerformersEdit;
