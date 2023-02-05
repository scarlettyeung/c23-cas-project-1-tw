import React from 'react';
import { PerformersSettingValue } from '../../../utils/userInfoType';
import { Text, TextInput, Checkbox, Button, Group, Box, Center } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import '../../../styles/userEdit.css';
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
	const hashArray = userInfo.performers_hashtags?.map((tag) => '#' + tag.name).join(' ');

	return (
		<>
			<div>
				<Button onClick={props.goBack}>Go back</Button>

				<div>Performers Details:</div>
				<Button onClick={props.edit}>To Edit</Button>
			</div>
			<div>
				<div className='userDisplay'>
					<Text>Username:</Text>
					<Text>{userInfo.username} </Text>
				</div>
				<div className='userDisplay'>
					<Text>Email:</Text>
					<Text>{userInfo.email} </Text>
				</div>
				<div className='userDisplay'>
					<Text>Contact Email:</Text>
					<Text>{userInfo.contact_email}</Text>
				</div>
				<div className='userDisplay'>
					<Text>Gender:</Text>
					<Text>{userInfo.gender}</Text>
				</div>
				<div className='userDisplay'>
					<Text>Identity:</Text>
					<Text>{userInfo.identity}</Text>
				</div>
				<div className='userDisplay'>
					<Text>Average Score:</Text>
					<Text>{userInfo.avg_score}</Text>
				</div>
				<div className='userDisplay'>
					<Text>Sum of Event:</Text>
					<Text>{userInfo.sum_of_even}</Text>
				</div>
				<div className='userDisplay'>
					<Text>Year Of Experience:</Text>
					<Text>{userInfo.years_of_exp}</Text>
				</div>
				<div className='userDisplay'>
					<Text>Birthday:</Text>
					<Center>
						<DatePicker
							placeholder='Pick date'
							value={new Date(userInfo.birthday!)}
							variant='unstyled'
							readOnly
						/>
					</Center>
				</div>
				<div className='userDisplay'>
					<Text>Contact Number:</Text>
					<Text>{userInfo.contact_number}</Text>
				</div>
				<div className='userDisplay'>
					<Text>Name:</Text>
					<Text>{userInfo.name ? userInfo.name : <>No name</>}</Text>
				</div>
				<div className='userDisplay'>
					<Text>Description:</Text>
					<Text>{userInfo.description ? userInfo.description : <>No description</>}</Text>
				</div>
				<div className='userDisplay'>
					<Text>Facebook Link:</Text>
					<Text>{userInfo.facebook_url ? userInfo.facebook_url : <>No URL</>}</Text>
				</div>
				<div className='userDisplay'>
					<Text>Twitter Link:</Text>
					<Text>{userInfo.twitter_url ? userInfo.twitter_url : <>No URL</>}</Text>
				</div>
				<div className='userDisplay'>
					<Text>Youtube Link:</Text>
					<Text>{userInfo.youtube_url ? userInfo.youtube_url : <>No URL</>}</Text>
				</div>
				<div className='userDisplay'>
					<Text>Instagram Link:</Text>
					<Text>{userInfo.ig_url ? userInfo.ig_url : <>No URL</>}</Text>
				</div>
				<div className='userDisplay'>
					<Text>Hashtags:</Text>
					<Text>{hashArray}</Text>
				</div>
			</div>
		</>
	);
}

export default PerformersDisplay;
