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
			<Card classNames={'IdCard'} withBorder p='xl' radius='md'>
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

				<>
					{performanceInfo.performers_hashtags && (
						<HashTags tags={performanceInfo.performers_hashtags} />
					)}
				</>

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
			<Card classNames={'IdCard'} withBorder p='xl' radius='md'>
				<Card.Section sx={{ height: 20 }} />
				<Title order={2}>Corporate Clients Info</Title>
				<Avatar size={150} radius={80} mx='auto'>
					{corporateClientsInfo.icon ? (
						<img
							src={`${REACT_APP_IMAGE_BASE}/${corporateClientsInfo.icon}`}
							alt={corporateClientsInfo.icon}
						/>
					) : (
						<img src={`${REACT_APP_IMAGE_BASE}/defaultImage.jpg`} alt={'defaultImage.jpg'} />
					)}
				</Avatar>
				<Text align='left' size='lg' weight={500} mt='sm'>
					USER NAME : {corporateClientsInfo.username}
				</Text>
				<Text align='left' size='lg' weight={500} mt='sm'>
					BR NO. : {corporateClientsInfo.business_BR_no}
				</Text>
				<Text align='left' size='lg' weight={500} mt='sm'>
					BUSINESS ADDRESS : {corporateClientsInfo.business_address}
				</Text>
				<Text align='left' size='lg' weight={500} mt='sm'>
					WEBSITE :
					{corporateClientsInfo.business_website_url ? (
						<>business website:{corporateClientsInfo.business_website_url} </>
					) : (
						<></>
					)}
				</Text>
				<Text align='left' size='lg' weight={500} mt='sm'>
					SCORE (EVENTS) :{' '}
					<Group position='left'>
						<Rating defaultValue={corporateClientsInfo.avg_score} readOnly />
						<> ({corporateClientsInfo.sum_of_even}) </>
					</Group>
				</Text>

				{uuidFromState !== uuidInPage && <button>ToChatRoom</button>}

				<div style={{ flex: 1 }}>
					<Text size='sm' weight={500}>
						{corporateClientsInfo.events ? (
							<EventInfo info={corporateClientsInfo.events} />
						) : (
							<div>No Event</div>
						)}
					</Text>
				</div>
			</Card>
		);
	}

	if (individualClientsInfo) {
		return (
			<Card classNames={'IdCard'} withBorder p='xl' radius='md'>
				<Card.Section sx={{ height: 20 }} />
				<Title order={2}>Clients Info</Title>
				<Avatar size={150} radius={80} mx='auto'>
					{individualClientsInfo.icon ? (
						<img
							src={`${REACT_APP_IMAGE_BASE}/${individualClientsInfo.icon}`}
							alt={individualClientsInfo.icon}
						/>
					) : (
						<img src={`${REACT_APP_IMAGE_BASE}/defaultImage.jpg`} alt={'defaultImage.jpg'} />
					)}
				</Avatar>
				<Text align='left' size='lg' weight={500} mt='sm'>
					USER NAME : {individualClientsInfo.username}
				</Text>
				<Text align='left' size='lg' weight={500} mt='sm'>
					SCORE (EVENTS) :{' '}
					<Group position='left'>
						<Rating defaultValue={individualClientsInfo.avg_score} readOnly />
						<> ({individualClientsInfo.avg_score}) </>
					</Group>
				</Text>

				{uuidFromState !== uuidInPage && <button>ToChatRoom</button>}

				<div style={{ flex: 1 }}>
					<Text size='sm' weight={500}>
						{individualClientsInfo.events ? (
							<EventInfo info={individualClientsInfo.events} />
						) : (
							<div>No Event</div>
						)}
					</Text>
				</div>
			</Card>
		);
	}
	return <>missing data</>;
}

export default PersonalInfo;
