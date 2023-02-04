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

function About() {
	const navigate = useNavigate();
	const { uuid } = useParams<string>()!;
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
		return <PersonalInfo pageUUID={uuid!} performanceInfo={userInfo} />;
	};
	const returnCorporate = () => {
		if (!resp) return;
		const userInfo = resp.data as CorporateClientsInfo;
		console.log(resp);
		return <PersonalInfo pageUUID={uuid!} corporateClientsInfo={userInfo} />;
	};
	const returnIndividual = () => {
		if (!resp) return;
		const userInfo = resp.data as IndividualClientsInfo;
		console.log(resp);
		return <PersonalInfo pageUUID={uuid!} individualClientsInfo={userInfo} />;
	};

	return (
		<>
			<h1>About page</h1>

			<div>
				{uuid === uuidFromState && <button onClick={() => navigate('/about')}>setting btn</button>}
				{uuid === uuidFromState && (
					<button onClick={() => navigate(`/eProfile/uuid/${uuidFromState}/get`)}>
						To eProfile
					</button>
				)}
				<br></br>
			</div>

			{resp && role === Role.Performer && <div>{returnPerformer()}</div>}

			{resp && role === Role.Corporate && <div>{returnCorporate()}</div>}

			{resp && role === Role.Individual && <div>{returnIndividual()}</div>}
		</>
	);
}

export default About;
