import React, { useState, useEffect } from 'react';
import { PerformersSettingValue } from '../../../utils/userInfoType';
import useFetch from '../../../hooks/useFetch';
import { Text, TextInput, Checkbox, Button, Group, Box, Center } from '@mantine/core';
import { useForm } from '@mantine/form';

type PerformerInfo = {
	info: PerformersSettingValue;
	complete: () => void;
	exitEdit: () => void;
};

interface hashtags {
	name: string;
	id: number;
}

function PerformersEdit(props: PerformerInfo) {
	const {
		data: tagOptions,
		isLoading,
		error,
	} = useFetch<hashtags[] | null>(`users/getAllTag`, 'GET', null);

	const form = useForm({
		initialValues: {
			identity: props.info.identity,
			icon: props.info.icon,
			email: props.info.email,
			username: props.info.username,
			name: props.info.name,
			contact_number: props.info.contact_number,
			performers_hashtags: props.info.performers_hashtags,
			gender: props.info.gender,
			years_of_exp: props.info.years_of_exp,
			avgScore: props.info.avg_score,
			sumOfEven: props.info.sum_of_even,
			birthday: props.info.birthday,
			description: props.info.description,
			facebook_url: props.info.facebook_url,
			twitter_url: props.info.twitter_url,
			youtube_url: props.info.youtube_url,
			ig_url: props.info.ig_url,
			events: props.info.events,
			tag_options: tagOptions,
			// avg_score:props.info
			// sum_of_even:props.info
		},

		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
		},
	});

	return (
		<>
			<div>Performers Edit</div>
			<button onClick={props.exitEdit}>Exit</button>

			<button onClick={props.complete}>Complete</button>
			<br></br>
		</>
	);
}

export default PerformersEdit;
