import React from 'react';
import { PerformersSettingValue } from '../../../utils/userInfoType';
import { Text, TextInput, Checkbox, Button, Group, Box, Center } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
type performerInfo = {
	info: PerformersSettingValue;
	goBack: () => void;
	edit: () => void;
};

function PerformersDisplay(props: performerInfo) {
	const userInfo = props.info;
	return (
		<>
			<div>
				<button onClick={props.goBack}>Go back</button>
				<div>Performers Details</div>
				<button onClick={props.edit}>To Edit</button>
			</div>
			<div>
				<Text>userName:{userInfo.username} </Text>
				<Text>email: {userInfo.email}</Text>
				<Text>gender: {userInfo.gender}</Text>
				<Text>identity:{userInfo.identity}</Text>

				<Text>AvgScore: {userInfo.avgScore}</Text>
				<Text>SumOfEven: {userInfo.sumOfEven}</Text>
				<Text>yearsOfExp: {userInfo.years_of_exp}</Text>
				<Center>
					<DatePicker
						placeholder='Pick date'
						label='birthday'
						value={new Date(userInfo.birthday!)}
						variant='unstyled'
						readOnly
					/>
				</Center>
				<Text>contactNumber: {userInfo.contact_number}</Text>
				<Text>name: {userInfo.name}</Text>
				<Text>description: {userInfo.description}</Text>
				<Text>facebookUrl: {userInfo.facebook_url}</Text>
				<Text>twitterUrl: {userInfo.twitter_url}</Text>
				<Text>youtubeUrl: {userInfo.youtube_url}</Text>
				<Text>igUrl: {userInfo.ig_url}</Text>
				<Text>
					hashTag: {userInfo.performers_hashtags[0].id < 0 && <div>No hashTag</div>}
					{userInfo.performers_hashtags[0].id > 0 &&
						userInfo.performers_hashtags.map((tag) => <div key={tag.id}>{tag.name}</div>)}
				</Text>
			</div>
		</>
	);
}

export default PerformersDisplay;
