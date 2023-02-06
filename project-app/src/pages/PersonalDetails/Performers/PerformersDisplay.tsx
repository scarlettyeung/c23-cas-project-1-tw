import React from 'react';
import { PerformersSettingValue } from '../../../utils/userInfoType';
import { Text, Button, Card, Title } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import '../../../styles/userEdit.css';
import logger from 'redux-logger';
type performerInfo = {
	info: PerformersSettingValue;
	goBack: () => void;
	edit: () => void;
};

function PerformersDisplay(props: performerInfo) {
	const userInfo = props.info;
	const tags = userInfo.performers_hashtags.map((tag) => {
		console.log(tags);
		return {};
	});
	const hashArray = userInfo.performers_hashtags?.map((tag) => '#' + tag.name).join(' ');

	return (
		<div className='Body'>
			<Card classNames={'IdCard'} withBorder p='xl' radius='md'>
				<Card.Section sx={{ height: 20 }} />
				<Title order={2}>Performers Details</Title>
				<div>
					<div className='userDisplay'>
						<Text fw={700} ta='left' tt='uppercase'>
							Username:
						</Text>
						<Text c='dimmed'>{userInfo.username} </Text>
					</div>
					<div className='userDisplay'>
						<Text fw={700} ta='left' tt='uppercase'>
							Email:
						</Text>
						<Text c='dimmed'>{userInfo.email} </Text>
					</div>
					<div className='userDisplay'>
						<Text fw={700} ta='left' tt='uppercase'>
							Contact Email:
						</Text>
						<Text c='dimmed'>{userInfo.contact_email}</Text>
					</div>
					<div className='userDisplay'>
						<Text fw={700} ta='left' tt='uppercase'>
							Gender:
						</Text>
						<Text c='dimmed'>{userInfo.gender}</Text>
					</div>
					<div className='userDisplay'>
						<Text fw={700} ta='left' tt='uppercase'>
							Identity:
						</Text>
						<Text c='dimmed'>{userInfo.identity}</Text>
					</div>
					<div className='userDisplay'>
						<Text fw={700} ta='left' tt='uppercase'>
							Average Score:
						</Text>
						<Text c='dimmed'>{userInfo.avg_score}</Text>
					</div>
					<div className='userDisplay'>
						<Text fw={700} ta='left' tt='uppercase'>
							Sum of Event:
						</Text>
						<Text c='dimmed'>{userInfo.sum_of_even}</Text>
					</div>
					<div className='userDisplay'>
						<Text fw={700} ta='left' tt='uppercase'>
							Year Of Experience:
						</Text>
						<Text c='dimmed'>{userInfo.years_of_exp}</Text>
					</div>
					<div className='userDisplay'>
						<Text fw={700} ta='left' tt='uppercase'>
							Birthday:
						</Text>
						<DatePicker
							c='dimmed'
							placeholder='Pick date'
							value={new Date(userInfo.birthday!)}
							variant='unstyled'
							readOnly
						/>
					</div>
					<div className='userDisplay'>
						<Text fw={700} ta='left' tt='uppercase'>
							Contact Number:
						</Text>
						<Text c='dimmed'>{userInfo.contact_number}</Text>
					</div>
					<div className='userDisplay'>
						<Text fw={700} ta='left' tt='uppercase'>
							Name:
						</Text>
						<Text c='dimmed'>{userInfo.name ? userInfo.name : <>No name</>}</Text>
					</div>
					<div className='userDisplay'>
						<Text fw={700} ta='left' tt='uppercase'>
							Description:
						</Text>
						<Text c='dimmed'>
							{userInfo.description ? userInfo.description : <>No description</>}
						</Text>
					</div>
					<div className='userDisplay'>
						<Text fw={700} ta='left' tt='uppercase'>
							Facebook Link:
						</Text>
						<Text c='dimmed'>{userInfo.facebook_url ? userInfo.facebook_url : <>No URL</>}</Text>
					</div>
					<div className='userDisplay'>
						<Text fw={700} ta='left' tt='uppercase'>
							Twitter Link:
						</Text>
						<Text c='dimmed'>{userInfo.twitter_url ? userInfo.twitter_url : <>No URL</>}</Text>
					</div>
					<div className='userDisplay'>
						<Text fw={700} ta='left' tt='uppercase'>
							Youtube Link:
						</Text>
						<Text c='dimmed'>{userInfo.youtube_url ? userInfo.youtube_url : <>No URL</>}</Text>
					</div>
					<div className='userDisplay'>
						<Text fw={700} ta='left' tt='uppercase'>
							Instagram Link:
						</Text>
						<Text c='dimmed'>{userInfo.ig_url ? userInfo.ig_url : <>No URL</>}</Text>
					</div>
					<div className='userDisplay'>
						<Text fw={700} ta='left' tt='uppercase'>
							Hashtags:
						</Text>
						<Text c='dimmed'>{hashArray}</Text>
					</div>
				</div>
			</Card>

			<div className='User-ButtonGroup'>
				<Button className='User-EditButtonGroup' onClick={props.goBack}>
					Go back
				</Button>
				<Button className='User-EditButtonGroup' onClick={props.edit}>
					To Edit
				</Button>
			</div>
		</div>
	);
}

export default PerformersDisplay;
