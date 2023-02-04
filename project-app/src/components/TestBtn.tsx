import React from 'react';
import { useRootDispatch } from '../redux/store';
import { testThunk } from '../redux/auth';

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
			<input type='button' value='test-btn' onClick={testBtn}></input>
		</div>
	);
}

export default TestBtn;
