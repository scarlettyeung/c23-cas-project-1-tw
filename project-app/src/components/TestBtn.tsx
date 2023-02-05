import React from 'react';
import { useRootDispatch } from '../redux/store';
import { testThunk } from '../redux/auth';
import { Button } from '@mantine/core';

function TestBtn() {
	const dispatch = useRootDispatch();

	const testBtn = () => {
		dispatch(testThunk())
			.unwrap()
			// .then(() => navigate('/'))
			.catch((err) => {
				alert(err.message);
			});
	};
	return (
		<div>
			<Button value='test-btn' onClick={testBtn}></Button>
		</div>
	);
}

export default TestBtn;
