import React, { useState, useEffect } from 'react';
import HashTags from './HashTags';
import EventInfo from './EventInfo';
import { useRootSelector } from '../../../redux/store';
import {
	PerformanceInfo,
	CorporateClientsInfo,
	IndividualClientsInfo,
} from '../../../utils/userInfoType';
import { Rating, Group, Card, Title, Avatar, Text, Badge } from '@mantine/core';
import {
	IconBrandInstagram,
	IconBrandMeta,
	IconBrandTwitter,
	IconBrandYoutube,
	IconChevronRight,
} from '@tabler/icons';
import '../../../styles/about.css';
const { REACT_APP_IMAGE_BASE } = process.env;

type UserInfoProps = {
	pageUUID: string;
	performanceInfo?: PerformanceInfo;
	corporateClientsInfo?: CorporateClientsInfo;
	individualClientsInfo?: IndividualClientsInfo;
};

function PersonalInfo(props: UserInfoProps) {
	const uuidFromState = useRootSelector((state) => state.auth.uuid);
	const uuidInPage = props.pageUUID;
	const performanceInfo = props.performanceInfo;
	const corporateClientsInfo = props.corporateClientsInfo;
	const individualClientsInfo = props.individualClientsInfo;

	if (performanceInfo) {
		return (
			<Card classNames={'IdCard'} withBorder p='xl' radius='md' className={'Performer'}>
				<Card.Section sx={{ height: 20 }} />
				<Title order={2}>Personal Info</Title>
				<Avatar size={150} radius={80} mx='auto'>
					{performanceInfo.icon ? (
						<img
							src={`${REACT_APP_IMAGE_BASE}/${performanceInfo.icon}`}
							alt={performanceInfo.icon}
						/>
					) : (
						<img src={`${REACT_APP_IMAGE_BASE}/defaultImage.jpg`} alt={'defaultImage.jpg'} />
					)}
				</Avatar>
				<Text align='left' size='lg' weight={500} mt='sm'>
					USER NAME : {performanceInfo.username}
				</Text>
				<Text align='left' size='lg' weight={500} mt='sm'>
					GENDER : {performanceInfo.gender}
				</Text>
				<Text align='left' size='lg' weight={500} mt='sm'>
					USER NAME : {performanceInfo.username}
				</Text>
				<Text align='left' size='lg' weight={500} mt='sm'>
					EXPERIENCE : {performanceInfo.years_of_exp}
				</Text>
				<Text align='left' size='lg' weight={500} mt='sm'>
					SCORE (EVENTS) :{' '}
					<Group align='left'>
						<Rating defaultValue={performanceInfo.avg_score} readOnly />
						<div> ({performanceInfo.sum_of_even}) </div>
					</Group>
				</Text>
				{uuidFromState !== uuidInPage && <button>ToChatRoom</button>}
				<Badge color='teal' radius='sm' variant='filled'>
					{performanceInfo.performers_hashtags && (
						<HashTags tags={performanceInfo.performers_hashtags} />
					)}
				</Badge>

				<div className='IconGroup'>
					<IconBrandMeta>
						{' '}
						{performanceInfo.facebook_url ? (
							<div>{performanceInfo.facebook_url}</div>
						) : (
							<> facebook_url: No ULR</>
						)}
					</IconBrandMeta>

					<IconBrandInstagram>
						{' '}
						{performanceInfo.ig_url ? (
							<div>ig_url: {performanceInfo.ig_url}</div>
						) : (
							<>ig_url: No ULR</>
						)}
					</IconBrandInstagram>

					<IconBrandTwitter>
						{performanceInfo.twitter_url ? (
							<div>twitter_url: {performanceInfo.twitter_url}</div>
						) : (
							<>twitter_url: No ULR</>
						)}
					</IconBrandTwitter>

					<IconBrandYoutube>
						{performanceInfo.youtube_url ? (
							<div>youtube_url: {performanceInfo.youtube_url}</div>
						) : (
							<>youtube_url: No ULR</>
						)}
					</IconBrandYoutube>
				</div>

				<div style={{ flex: 1 }}>
					<Text size='sm' weight={500}>
						{performanceInfo.events ? (
							<EventInfo info={performanceInfo.events} />
						) : (
							<div>No Event</div>
						)}
					</Text>
				</div>
			</Card>
		);
	}

	if (corporateClientsInfo) {
		return (
			<>
				<div>===Corporate Clients Info===</div>
				<br></br>
				{corporateClientsInfo.icon ? (
					<div>user Icon:{corporateClientsInfo.icon} </div>
				) : (
					<div>userName: No icon </div>
				)}
				<div>user name:{corporateClientsInfo.username} </div>
				<div>BA No:{corporateClientsInfo.business_BR_no} </div>
				<div>business address:{corporateClientsInfo.business_address} </div>
				{corporateClientsInfo.business_website_url ? (
					<div>business website:{corporateClientsInfo.business_website_url} </div>
				) : (
					<></>
				)}

				<div>Avg score (sum of the event) </div>
				<Group position='center'>
					<Rating defaultValue={corporateClientsInfo.avg_score} readOnly />
					<div> ({corporateClientsInfo.sum_of_even}) </div>
				</Group>

				{uuidFromState !== uuidInPage && <button>ToChatRoom</button>}
				<div>=========</div>
				<br></br>

				<div>=== Event ===</div>
				<div>
					{corporateClientsInfo.events ? (
						<EventInfo info={corporateClientsInfo.events} />
					) : (
						<div>No Event</div>
					)}
				</div>
				<div>=============</div>
				<br></br>
			</>
		);
	}

	if (individualClientsInfo) {
		return (
			<>
				<div>===Corporate Clients Info===</div>
				<br></br>
				{individualClientsInfo.icon ? (
					<div>user Icon:{individualClientsInfo.icon} </div>
				) : (
					<div>userName: No icon </div>
				)}
				<div>user name:{individualClientsInfo.username} </div>

				<div>Avg score (sum of the event) </div>
				<Group position='center'>
					<Rating defaultValue={individualClientsInfo.avg_score} readOnly />
					<div> ({individualClientsInfo.sum_of_even}) </div>
				</Group>

				{uuidFromState !== uuidInPage && <button>ToChatRoom</button>}
				<div>=========</div>
				<br></br>

				<div>=== Event ===</div>
				<div>
					{individualClientsInfo.events ? (
						<EventInfo info={individualClientsInfo.events} />
					) : (
						<div>No Event</div>
					)}
				</div>
				<div>=============</div>
				<br></br>
			</>
		);
	}
	return <>missing data</>;
}

export default PersonalInfo;
