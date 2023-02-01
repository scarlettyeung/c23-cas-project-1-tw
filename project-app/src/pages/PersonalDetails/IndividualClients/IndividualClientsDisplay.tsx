import React from 'react';
import { IndividualClientsSettingValue } from '../../../utils/userInfoType';
import { Text, TextInput, Checkbox, Button, Group, Box, Center } from '@mantine/core';
type individualClientsInfo = {
	info: IndividualClientsSettingValue;
	goBack: () => void;
	edit: () => void;
};

function IndividualClientsDisplay(props: individualClientsInfo) {
	const userInfo = props.info;
	return (
		<>
			<div>Individual Clients Display</div>
			<div>
				<br></br>
				<button onClick={props.goBack}>Go back</button>
				<div>Performers Details</div>
				<button onClick={props.edit}>To Edit</button>
			</div>
			<div>
				<Text>userName:{userInfo.username} </Text>
				<Text>email: {userInfo.email}</Text>
				<Text>gender: {userInfo.gender}</Text>
				<Text>identity:{userInfo.identity}</Text>

				<Text>AvgScore: {userInfo.avg_score}</Text>
				<Text>SumOfEven: {userInfo.sum_of_even}</Text>

				<Text>contactNumber: {userInfo.contact_number}</Text>
				<Text>name: {userInfo.name ? userInfo.name : <>No name</>}</Text>
				<Text>
					description: {userInfo.description ? userInfo.description : <>No description</>}
				</Text>
			</div>
		</>
	);
}

export default IndividualClientsDisplay;
