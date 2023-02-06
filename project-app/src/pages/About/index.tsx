import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mantine/core';
import useFetch from '../../hooks/useFetch';
import PersonalInfo from './components/PersonalInfo ';
import { useRootSelector } from '../../redux/store';
import {
	Role,
	RespTypeInProfile,
	PerformanceInfo,
	IndividualClientsInfo,
	CorporateClientsInfo,
} from '../../utils/userInfoType';
import '../../styles/about.css';
import { useEffect, useState } from 'react';
import { IconBrandWhatsapp } from '@tabler/icons';
import { ActionIcon } from '@mantine/core';
function About() {
	const navigate = useNavigate();
	const { uuid } = useParams<string>()!;
	const {
		data: resp,
		isLoading,
		error,
	} = useFetch<RespTypeInProfile | null>(`users/getInfo/${uuid}`, 'GET', null, uuid);
	const [wsLink, setWSLink] = useState<string>('');
	const openURL = (url: string) => {
		window.location.href = url;
	};

	useEffect(() => {
		async function getNumber() {
			const jwt = localStorage.getItem('token');
			const path = process.env.REACT_APP_API_BASE;
			let data = await fetch(`${path}users/contact/${uuid}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${jwt}`,
				},
			});
			let result = await data.json();

			if (result.contactData.performers[0].contact_number) {
				const userPhoneNumber: number = result.contactData.performers[0].contact_number;
				setWSLink(`https://wa.me/852${userPhoneNumber}`);
				console.log(`https://wa.me/852${userPhoneNumber}`);
			}
		}
		getNumber();
	}, [uuid]);

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
		return <PersonalInfo pageUUID={uuid!} performanceInfo={userInfo} />;
	};
	const returnCorporate = () => {
		if (!resp) return;
		const userInfo = resp.data as CorporateClientsInfo;
		return <PersonalInfo pageUUID={uuid!} corporateClientsInfo={userInfo} />;
	};
	const returnIndividual = () => {
		if (!resp) return;
		const userInfo = resp.data as IndividualClientsInfo;
		return <PersonalInfo pageUUID={uuid!} individualClientsInfo={userInfo} />;
	};

	return (
		<div className='Body'>
			<div className='Title'>About</div>
			<div className='About-ButtonGroup'>
				{uuid === uuidFromState && (
					<ActionIcon
						key={1}
						onClick={() => {
							openURL(wsLink);
						}}
					>
						<IconBrandWhatsapp size={34} />
					</ActionIcon>
				)}
				{uuid === uuidFromState && (
					<Button className='AboutBtn' onClick={() => navigate('/about')}>
						Edit
					</Button>
				)}
				{uuid === uuidFromState && (
					<Button
						className='AboutBtn'
						onClick={() => navigate(`/eProfile/uuid/${uuidFromState}/get`)}
					>
						E-Profile
					</Button>
				)}
			</div>
			{resp && role === Role.Performer && <div>{returnPerformer()}</div>}

			{resp && role === Role.Corporate && <div>{returnCorporate()}</div>}

			{resp && role === Role.Individual && <div>{returnIndividual()}</div>}
		</div>
	);
}

export default About;
