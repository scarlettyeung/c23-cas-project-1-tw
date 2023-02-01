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
		console.log('tag');
		console.log(tag);
		return {
			// 		id: tag.hashtag_details.id,
			// 		name: tag.hashtag_details.name,
		};
	});
	console.log('tags');
	// console.log(tags);
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
				<Text>contactNumber: {userInfo.contact_number}</Text>
				<Text>name: {userInfo.name ? userInfo.name : <>No name</>}</Text>
				<Text>
					description: {userInfo.description ? userInfo.description : <>No description</>}
				</Text>
				<Text>facebookUrl: {userInfo.facebook_url ? userInfo.facebook_url : <>No URL</>}</Text>
				<Text>twitterUrl: {userInfo.twitter_url ? userInfo.twitter_url : <>No URL</>}</Text>
				<Text>youtubeUrl: {userInfo.youtube_url ? userInfo.youtube_url : <>No URL</>}</Text>
				<Text>igUrl: {userInfo.ig_url ? userInfo.ig_url : <>No URL</>}</Text>
				<Text>
					hashTag: {!userInfo.performers_hashtags && <div>No hashTag</div>}
					{/* {userInfo.performers_hashtags &&
						tags.map((tag) => <div key={`event_${tag.id}`}>{tag.name}</div>)} */}
				</Text>
			</div>
		</>
	);
}

export default PerformersDisplay;
