// import UserCardImage from './components/Profile';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex, Avatar, Text } from '@mantine/core';
import useFetch from '../../hooks/useFetch';
import PersonalInfo from './components/PersonalInfo ';
import EventInfo from './components/EventInfo';
import { useRootSelector } from '../../redux/store';
import {
	Role,
	RespTypeInProfile,
	PerformanceInfo,
	IndividualClientsInfo,
	CorporateClientsInfo,
} from '../../utils/userInfoType';

// export interface PersonalData {
// 	userIcon: string;
// 	userName: string;
// 	gender: string;
// 	expYear?: number;
// 	clientType?: string;
// 	avgScore: number;
// 	sumOfEvent: number;
// }
// export interface TeamData {
// 	id: number | null;
// 	name: string | null;
// }
// export interface HashtagData {
// 	// [x: string]: any;
// 	id: number;
// 	name: string;
// 	// hashtag_details: HashTag[];
// }
// export interface HashTag {
// 	id: number;
// 	name: string;
// }
// export interface Event {
// 	id: number;
// 	title: string;
// }
// export interface MediaURL {
// 	facebook: string | null;
// 	twitter: string | null;
// 	youtube: string | null;
// 	ig: string | null;
// }
// export interface LoadingObj {
// 	message: string;
// 	data?: LoadingPersonaInfo;
// }
// export interface LoadingPersonaInfo {
// 	uuid: string;
// 	id: number;
// 	username: string;
// 	icon?: string;
// 	email: string;
// 	identity: string;
// 	performers?: LoadingPerformanceInfo;
// 	clients?: LoadingClientInfo;
// }
// export interface LoadingPerformanceInfo {
// 	years_of_exp: number;
// 	contact_number: number;
// 	gender: string;
// 	description?: string;
// 	facebook_url?: string;
// 	twitter_url?: string;
// 	youtube_url?: string;
// 	ig_url?: string;
// 	performers_hashtags?: HashTag[] | null;
// 	events?: Event[] | null;
// }
// export interface LoadingClientInfo {
// 	gender: string;
// 	description?: string;
// 	client_type: string;
// 	business_address?: string;
// 	business_BR_no?: string;
// 	business_website_url?: string;
// 	events?: Event[] | null;
// }
// const initData: LoadingObj = {
// 	message: 'Loading',
// 	data: undefined,
// };

function About() {
	const navigate = useNavigate();
	const { uuid } = useParams<string>();
	const {
		data: resp,
		isLoading,
		error,
	} = useFetch<RespTypeInProfile | null>(`users/getInfo/${uuid}`, 'GET', null);

	let role: Role = Role.Performer;
	if (resp?.data && resp.data.identity === 'client') {
		const userInfo = resp.data as IndividualClientsInfo | CorporateClientsInfo;
		role = userInfo.client_type === 'individual' ? Role.Individual : Role.Corporate;
	}
	const uuidFromState = useRootSelector((state) => state.auth.uuid);

	if (isLoading) {
		return <div>isLoading...</div>;
	}
	if (error) {
		return (
			<div>
				<div>Who are You?</div>
			</div>
		);
	}

	const returnPerformer = () => {
		if (!resp) return;
		const userInfo = resp.data as PerformanceInfo;
		console.log(resp);
		return <PersonalInfo pageUUID={uuid} info={userInfo} />;
	};
	// const returnCorporate = () => {
	// 	const a = 123;
	// 	return <div>{a}</div>;
	// };
	// const returnIndividual = () => {
	// 	const a = 123;
	// 	return <div>{a}</div>;
	// };

	return (
		<>
			<h1>About page</h1>

			<div>
				{uuid === uuidFromState && <button onClick={() => navigate('/about')}>setting btn</button>}
				<br></br>
			</div>

			{resp && role === Role.Performer && <div>{returnPerformer()}</div>}
			{/* 
			{resp && role === Role.Performer && (
				<div>
					<PersonalInfo pageUUID={uuid} info={} />
				</div>
			)} */}

			{/* {(resp && role === Role.Corporate) ||
				(role === Role.Individual && (
					<div>
						<PersonalInfo pageUUID={uuid} personalData={personalDataToProp} />
					</div>
				))}

			<div>
				<EventInfo eventInfoData={eventInfoDataToProp} />
			</div> */}
		</>
	);
}

export default About;
