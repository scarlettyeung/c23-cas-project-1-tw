import React from 'react';
import { IndividualClientsSettingValue } from '../../../utils/userInfoType';
import { Text, TextInput, Checkbox, Button, Group, Box, Center } from '@mantine/core';
type individualClientsInfo = {
	info: IndividualClientsSettingValue;
	complete: () => void;
	exitEdit: () => void;
};

function IndividualClientsEdit(props: individualClientsInfo) {
	return (
		<>
			<div>IndividualClientsEdit</div>;<button onClick={props.exitEdit}>Exit</button>
			<div>Performers Details Editing</div>
			<button onClick={props.complete}>Complete</button>
			<br></br>
		</>
	);
}

export default IndividualClientsEdit;
