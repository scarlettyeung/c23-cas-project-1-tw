import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import {
	PerformersSettingValue,
	IndividualClientsSettingValue,
	CorporateClientsSettingValue,
} from '../../utils/userInfoType';
import PerformersDisplay from './Performers/PerformersDisplay';
import PerformersEdit from './Performers/PerformersEdit';
import IndividualClientsDisplay from './IndividualClients/IndividualClientsDisplay';
import IndividualClientsEdit from './IndividualClients/IndividualClientsEdit';
import CorporateClientsDisplay from './CorporateClients/CorporateClientsDisplay';
import CorporateClientsEdit from './CorporateClients/CorporateClientsEdit';

import { Text, TextInput, Checkbox, Button, Group, Box, Center } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconUpload } from '@tabler/icons';
import { FileInput } from '@mantine/core';

enum Role {
	Performer = 'performer',
	Individual = 'individual',
	Corporate = 'corporate',
}

interface RespType {
	message: string;
	userInfo: PerformersSettingValue | IndividualClientsSettingValue | CorporateClientsSettingValue;
}

function Details() {
	const navigate = useNavigate();
	const { data: resp, isLoading } = useFetch<RespType | null>(`users/getSettingInfo`, 'GET', null);
	const [isEdit, setIsEdit] = useState<boolean>(false);

	const edit = () => {
		console.log('edit Now !');
		setIsEdit(true);
	};

	const complete = () => {
		console.log('complete!! / summit !!');
		setIsEdit(false);
	};

	const exit = () => {
		console.log('exit Now !');
		setIsEdit(false);
	};

	const goBack = () => {
		console.log('goBack Now !');
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

	if (resp && !isEdit && role === Role.Performer) {
		const userInfo = resp.userInfo as PerformersSettingValue;
		console.log('userInfo ', userInfo);
		return (
			<>
				<PerformersDisplay info={userInfo} goBack={goBack} edit={edit} />

				<br></br>
			</>
		);
	} else {
		return <div>error</div>;
	}

	// return (
	// 	<>
	// 		{!isEdit && role === Role.Performer && (
	// 			<>
	// 				<button onClick={goBack}>Go back</button>
	// 				<div>Performers Details</div>
	// 				<button onClick={edit}>To Edit</button>
	// 				<br></br>
	// 				<Text>icon: {performersValue.icon}</Text>
	// 				{/* <Text>userName:{userName} </Text> */}
	// 				<Text>userName:{performersValue.userName} </Text>
	// 				<Text>email: {performersValue.email}</Text>
	// 				<Text>gender: {performersValue.gender}</Text>
	// 				<Text>identity: 123{performersValue.identity}</Text>
	// 				{/* <Text>identity: {identity}</Text> */}
	// 				<Text>AvgScore: {performersValue.avgScore}</Text>
	// 				<Text>SumOfEven: {performersValue.sumOfEven}</Text>
	// 				<Text>yearsOfExp: {performersValue.yearsOfExp}</Text>
	// 				<Center>
	// 					<DatePicker
	// 						placeholder='Pick date'
	// 						label='birthday'
	// 						value={new Date(performersValue.birthday!)}
	// 						variant='unstyled'
	// 						readOnly
	// 					/>
	// 				</Center>
	// 				<Text>contactNumber: {performersValue.contactNumber}</Text>
	// 				<Text>name: {performersValue.name}</Text>
	// 				<Text>description: {performersValue.description}</Text>
	// 				<Text>facebookUrl: {performersValue.fbURL}</Text>
	// 				<Text>twitterUrl: {performersValue.twURL}</Text>
	// 				<Text>youtubeUrl: {performersValue.ytURL}</Text>
	// 				<Text>igUrl: {performersValue.igURL}</Text>
	// 				<Text>
	// 					hashTag: {performersValue.hashtags[0].id < 0 && <div>No hashTag</div>}
	// 					{performersValue.hashtags[0].id > 0 &&
	// 						performersValue.hashtags.map((tag) => <div key={tag.id}>{tag.name}</div>)}
	// 				</Text>
	// 			</>
	// 		)}
	// 		{/* {!isLoading && !isEdit && isClients && isIndividualClients && (
	// 			<>
	// 				<button onClick={goBack}>Go back</button>
	// 				<div>Individual Clients Details</div>
	// 				<button onClick={edit}>To Edit</button>
	// 				<br></br>
	// 				<Text>icon: {icon}</Text>
	// 				<Text>userName:{userName} </Text>
	// 				<Text>email: {email}</Text>
	// 				<Text>gender: {gender}</Text>
	// 				<Text>
	// 					identity: {identity} ({isIndividualClients ? <>Individual</> : <> Corporate</>})
	// 				</Text>
	// 				<Text>AvgScore: {avgScore}</Text>
	// 				<Text>SumOfEven: {sumOfEven}</Text>
	// 				<Text>contactNumber: {contactNumber}</Text>
	// 				<Text>name: {name}</Text>
	// 				<Text>description: {description}</Text>
	// 				<Text>events: {description}</Text>
	// 			</>
	// 		)}
	// 		{!isLoading && !isEdit && isClients && isCorporateClients && (
	// 			<>
	// 				<button onClick={goBack}>Go back</button>
	// 				<div>Corporate Clients Details</div>
	// 				<button onClick={edit}>To Edit</button>
	// 				<br></br>
	// 			</>
	// 		)}

	// 		{!isLoading && isEdit && isPerformers && (
	// 			<>
	// 				<button onClick={exit}>Exit</button>
	// 				<div>Performers Details Editing</div>
	// 				<button onClick={complete}>Complete</button>
	// 				<br></br>
	// 				<Box sx={{ maxWidth: 300 }} mx='auto'>
	// 					<form onSubmit={form.onSubmit((values) => console.log(values))}>
	// 						<FileInput
	// 							label='Icon'
	// 							placeholder='Your Icon'
	// 							accept='image'
	// 							icon={<IconUpload size={14} />}
	// 							onChange={setIconFile}
	// 							clearButtonLabel='REMOVE'
	// 							clearable={true}
	// 						/>

	// 						<TextInput
	// 							label='Contact Email'
	// 							// placeholder={userName}
	// 							{...form.getInputProps('fContactEmail')}
	// 						/>
	// 						<TextInput
	// 							label='User Name'
	// 							// placeholder={userName}
	// 							{...form.getInputProps('fUserName')}
	// 						/>

	// 						<Group position='right' mt='md'>
	// 							<Button type='submit'>Submit</Button>
	// 						</Group>
	// 					</form>
	// 				</Box>

	// 				<Text>icon: {icon}</Text>
	// 				<Text>userName:{userName} </Text>
	// 				<Text>email: {email}</Text>
	// 				<Text>gender: {gender}</Text>
	// 				<Text>
	// 					identity: {identity} ({isIndividualClients ? <>Individual</> : <> Corporate</>})
	// 				</Text>
	// 				<Text>AvgScore: {avgScore}</Text>
	// 				<Text>SumOfEven: {sumOfEven}</Text>
	// 				<Text>contactNumber: {contactNumber}</Text>
	// 				<Text>name: {name}</Text>
	// 				<Text>description: {description}</Text>
	// 				<Text>events: {description}</Text>
	// 			</>
	// 		)}
	// 		{!isLoading && isEdit && isClients && isIndividualClients && (
	// 			<>
	// 				<button onClick={exit}>Exit</button>
	// 				<div>Individual Clients Details Editing</div>
	// 				<button onClick={complete}>Complete</button>
	// 				<br></br>
	// 			</>
	// 		)}
	// 		{!isLoading && isEdit && isClients && isCorporateClients && (
	// 			<>
	// 				<button onClick={exit}>Exit</button>
	// 				<div>Corporate Clients Details Editing</div>
	// 				<button onClick={complete}>Complete</button>
	// 				<br></br>
	// 			</>
	// 		)} */}
	// 	</>
	// );
}

export default Details;
