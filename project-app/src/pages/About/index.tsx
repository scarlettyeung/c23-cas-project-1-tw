import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import PersonalInfo from './components/PersonalInfo';

import {
	Role,
	RespTypeInProfile,
	PerformanceInfo,
	IndividualClientsInfo,
	CorporateClientsInfo,
} from '../../utils/userInfoType';
import '../../styles/about.css';

function About() {
	const { uuid } = useParams<string>()!;
	const {
		data: resp,
		isLoading,
		error,
	} = useFetch<RespTypeInProfile | null>(`users/getInfo/${uuid}`, 'GET', null, uuid);

	let role: Role = Role.Performer;
	if (resp?.data && resp.data.identity === 'client') {
		const userInfo = resp.data as IndividualClientsInfo | CorporateClientsInfo;
		role = userInfo.client_type === 'individual' ? Role.Individual : Role.Corporate;
	}

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
			<div className='About-ButtonGroup'></div>
			{resp && role === Role.Performer && <div>{returnPerformer()}</div>}

			{resp && role === Role.Corporate && <div>{returnCorporate()}</div>}

			{resp && role === Role.Individual && <div>{returnIndividual()}</div>}
		</div>
	);
}

export default About;
