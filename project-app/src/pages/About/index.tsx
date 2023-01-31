// import UserCardImage from './components/Profile';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex, Avatar, Text } from '@mantine/core';
import useFetch from '../../hooks/useFetch';
import PersonalInfo from './components/PersonalInfo ';
import EventInfo from './components/EventInfo';
import { useRootSelector } from '../../redux/store';

export interface PersonalData {
	userIcon: string;
	userName: string;
	gender: string;
	expYear?: number;
	clientType?: string;
	avgScore: number;
	sumOfEvent: number;
}
export interface TeamData {
	id: number | null;
	name: string | null;
}
export interface HashtagData {
	// [x: string]: any;
	id: number;
	name: string;
	// hashtag_details: HashTag[];
}
export interface HashTag {
	id: number;
	name: string;
}
export interface Event {
	id: number;
	title: string;
}
export interface MediaURL {
	facebook: string | null;
	twitter: string | null;
	youtube: string | null;
	ig: string | null;
}
export interface LoadingObj {
	message: string;
	data?: LoadingPersonaInfo;
}
export interface LoadingPersonaInfo {
	uuid: string;
	id: number;
	username: string;
	icon?: string;
	email: string;
	identity: string;
	performers?: LoadingPerformanceInfo;
	clients?: LoadingClientInfo;
}
export interface LoadingPerformanceInfo {
	years_of_exp: number;
	contact_number: number;
	gender: string;
	description?: string;
	facebook_url?: string;
	twitter_url?: string;
	youtube_url?: string;
	ig_url?: string;
	performers_hashtags?: HashTag[] | null;
	events?: Event[] | null;
}
export interface LoadingClientInfo {
	gender: string;
	description?: string;
	client_type: string;
	business_address?: string;
	business_BR_no?: string;
	business_website_url?: string;
	events?: Event[] | null;
}
const initData: LoadingObj = {
	message: 'Loading',
	data: undefined,
};

function About() {
	const navigate = useNavigate();
	const { uuid } = useParams<string>();
	const { data, isLoading, error } = useFetch<any>(`users/getInfo/${uuid}`, 'GET', initData);
	const userInfo = data;
	const [personalDataToProp, setPersonalDataToProp] = useState<PersonalData>();
	const [hashtagsDataToProp, setHashtagsDataToProp] = useState<HashTag[]>();
	const [mediaURLDataToProp, setMediaURLDataToProp] = useState<MediaURL>();
	const [eventInfoDataToProp, setEventInfoDataToProp] = useState<Event[]>();
	const [isPerformers, setIsPerformers] = useState<boolean>(false);
	const [isClients, setIsClients] = useState<boolean>(false);

	useEffect(() => {
		if (!isLoading) {
			// console.log('useEffect call');
			const typeOfIdentity = userInfo.data.identity;
			if (typeOfIdentity === 'performer') {
				setIsPerformers(true);
			}
			if (typeOfIdentity === 'client') {
				setIsClients(true);
			}
			if (isPerformers) {
				//// PersonalData start
				const icon = userInfo.data.icon;
				const name = userInfo.data.username;
				const gender = userInfo.data.performers[0].gender;
				const expYear = userInfo.data.performers[0].years_of_exp;
				const avgScore = userInfo.data.performers[0].avgScore;
				const sumOfEvent = userInfo.data.performers[0].sumOfEven;
				const userIdentity = userInfo.data.identity;
				const propPersonalObj: PersonalData = {
					userIcon: icon,
					userName: name,
					gender: gender,
					clientType: userIdentity,
					expYear: expYear,
					avgScore: avgScore,
					sumOfEvent: sumOfEvent,
				};
				setPersonalDataToProp(propPersonalObj);
				//// PersonalData end
				//// MediaURL start
				const facebook = userInfo.data.performers[0].facebook_url;
				const twitter = userInfo.data.performers[0].twitter_url;
				const youtube = userInfo.data.performers[0].youtube_url;
				const ig = userInfo.data.performers[0].ig_url;
				const mediaObj: MediaURL = {
					facebook: facebook,
					twitter: twitter,
					youtube: youtube,
					ig: ig,
				};
				setMediaURLDataToProp(mediaObj);

				//// MediaURL end

				//// hashTagsData starts

				const HashtagArrWithObj = userInfo.data.performers[0].performers_hashtags;

				const mapTags = HashtagArrWithObj.map(
					(t: { hashtag_details: { id: number; name: string } }) => ({
						id: t.hashtag_details.id,
						name: t.hashtag_details.name,
					}),
				);
				setHashtagsDataToProp(mapTags);
				//// hashTagsData end

				const eventArr = userInfo.data.performers[0].events;

				setEventInfoDataToProp(eventArr);
			}
			if (isClients) {
				//// PersonalData start
				const icon = userInfo.data.icon;
				const name = userInfo.data.username;
				const gender = userInfo.data.clients[0].gender;

				const avgScore = userInfo.data.clients[0].avgScore;
				const sumOfEvent = userInfo.data.clients[0].sumOfEven;
				const userIdentity = userInfo.data.identity;

				const propPersonalObj: PersonalData = {
					userIcon: icon,
					userName: name,
					gender: gender,
					clientType: userIdentity,
					avgScore: avgScore,
					sumOfEvent: sumOfEvent,
				};
				setPersonalDataToProp(propPersonalObj);

				//// PersonalData end

				const eventArr = userInfo.data.clients[0].events;

				setEventInfoDataToProp(eventArr);
			}
		}
	}, [isPerformers, isClients, isLoading, userInfo]);

	const uuidFromState = useRootSelector((state) => state.auth.uuid);

	return (
		<>
			{<h1>about page</h1>}
			{isLoading && <div>isLoading...</div>}
			{!isLoading && error && (
				<div>
					<div>Who are You?</div>
					<br></br>
					<button>go back</button>
				</div>
			)}

			{!isLoading && isPerformers && (
				<div>
					{uuid === uuidFromState && (
						<button onClick={() => navigate('/about')}>setting btn</button>
					)}

					<br></br>
					<PersonalInfo
						pageUUID={uuid}
						personalData={personalDataToProp}
						hashtagsData={hashtagsDataToProp}
						mediaURLData={mediaURLDataToProp}
					/>
					<EventInfo eventInfoData={eventInfoDataToProp} />
				</div>
			)}

			{!isLoading && isClients && (
				<div>
					{uuid === uuidFromState && (
						<button onClick={() => navigate('/about')}>setting btn</button>
					)}

					<br></br>
					<PersonalInfo pageUUID={uuid} personalData={personalDataToProp} />
					<EventInfo eventInfoData={eventInfoDataToProp} />
				</div>
			)}
		</>
	);
}

export default About;
