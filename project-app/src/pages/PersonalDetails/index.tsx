import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import {
	PerformersSettingValue,
	IndividualClientsSettingValue,
	CorporateClientsSettingValue,
	Role,
	RespType,
} from '../../utils/userInfoType';
import PerformersDisplay from './Performers/PerformersDisplay';
import PerformersEdit from './Performers/PerformersEdit';
import IndividualClientsDisplay from './IndividualClients/IndividualClientsDisplay';
import IndividualClientsEdit from './IndividualClients/IndividualClientsEdit';
import CorporateClientsDisplay from './CorporateClients/CorporateClientsDisplay';
import CorporateClientsEdit from './CorporateClients/CorporateClientsEdit';

function Details() {
	const navigate = useNavigate();
	const {
		data: resp,
		isLoading,
		error,
	} = useFetch<RespType | null>(`users/getSettingInfo`, 'GET', null);
	const [isEdit, setIsEdit] = useState<boolean>(false);

	const edit = () => {
		setIsEdit(true);
	};

	const exitEdit = () => {
		setIsEdit(false);
	};

	const goBack = () => {
		navigate(-1);
	};

	let role: Role = Role.Performer;
	if (resp?.userInfo && resp.userInfo.identity === 'client') {
		const userInfo = resp.userInfo as IndividualClientsSettingValue | CorporateClientsSettingValue;
		role = userInfo.client_type === 'individual' ? Role.Individual : Role.Corporate;
	}

	if (isLoading) {
		return <div>Loading....</div>;
	}

	if (error) {
		return <div>get error</div>;
	}

	if (resp && !isEdit && role === Role.Performer) {
		const userInfo = resp.userInfo as PerformersSettingValue;
		return (
			<>
				<PerformersDisplay info={userInfo} goBack={goBack} edit={edit} />

				<br></br>
			</>
		);
	}

	if (resp && !isEdit && role === Role.Individual) {
		const userInfo = resp.userInfo as IndividualClientsSettingValue;
		return (
			<>
				<IndividualClientsDisplay info={userInfo} goBack={goBack} edit={edit} />
				<br></br>
			</>
		);
	}

	if (resp && !isEdit && role === Role.Corporate) {
		const userInfo = resp.userInfo as CorporateClientsSettingValue;
		return (
			<>
				<CorporateClientsDisplay info={userInfo} goBack={goBack} edit={edit} />
				<br></br>
			</>
		);
	}

	if (resp && isEdit && role === Role.Performer) {
		const userInfo = resp.userInfo as PerformersSettingValue;
		return <PerformersEdit info={userInfo} exitEdit={exitEdit} />;
	}
	if (resp && isEdit && role === Role.Individual) {
		const userInfo = resp.userInfo as IndividualClientsSettingValue;
		return <IndividualClientsEdit info={userInfo} exitEdit={exitEdit} />;
	}
	if (resp && isEdit && role === Role.Corporate) {
		const userInfo = resp.userInfo as CorporateClientsSettingValue;
		return <CorporateClientsEdit info={userInfo} exitEdit={exitEdit} />;
	}

	return <div>get error</div>;
}

export default Details;
