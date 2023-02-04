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
	const tags = userInfo.performers_hashtags.map((tag) => {
		return {};
	});
	const hashArray = userInfo.performers_hashtags?.map((tag) => '#' + tag.name + ' ');
	return (
		<>
			<div>
				<Button onClick={props.goBack}>Go back</Button>

				<div>Performers Details</div>
				<Button onClick={props.edit}>To Edit</Button>
			</div>
			<div>
				<Text>username:{userInfo.username} </Text>
				<Text>email: {userInfo.email}</Text>
				<Text>contactemail: {userInfo.contact_email}</Text>
				<Text>gender: {userInfo.gender}</Text>
				<Text>identity:{userInfo.identity}</Text>

				<Text>AvgScore: {userInfo.avg_score}</Text>
				<Text>SumOfEven: {userInfo.sum_of_even}</Text>
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
				<Text>contact number: {userInfo.contact_number}</Text>
				<Text>name: {userInfo.name ? userInfo.name : <>No name</>}</Text>
				<Text>
					description: {userInfo.description ? userInfo.description : <>No description</>}
				</Text>
				<Text>facebookUrl: {userInfo.facebook_url ? userInfo.facebook_url : <>No URL</>}</Text>
				<Text>twitterUrl: {userInfo.twitter_url ? userInfo.twitter_url : <>No URL</>}</Text>
				<Text>youtubeUrl: {userInfo.youtube_url ? userInfo.youtube_url : <>No URL</>}</Text>
				<Text>igUrl: {userInfo.ig_url ? userInfo.ig_url : <>No URL</>}</Text>
				<Text>hashTag: {hashArray}</Text>
			</div>
		</>
	);
}

export default PerformersDisplay;
