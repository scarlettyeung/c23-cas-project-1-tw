import React from 'react';
import { CorporateClientsSettingValue } from '../../../utils/userInfoType';
import { Text, TextInput, Checkbox, Button, Group, Box, Center } from '@mantine/core';

type CorporateInfo = {
	info: CorporateClientsSettingValue;
	exitEdit: () => void;
	complete: () => void;
};
function CorporateClientsEdit(props: CorporateInfo) {
	return (
		<>
			<div>Corporate Clients Edit</div>
			<button onClick={props.exitEdit}>Exit</button>
			<button onClick={props.complete}>Complete</button>
			<br></br>
		</>
	);
}

export default CorporateClientsEdit;
