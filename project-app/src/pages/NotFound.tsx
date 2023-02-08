import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

function NotFound() {
	const navigate = useNavigate();
	const [time, setTime] = useState<number>(5);

	useEffect(() => {
		const timerToHome = setTimeout(() => {
			navigate('/');
			console.log('1231');
		}, 5000);

		return () => {
			clearTimeout(timerToHome);
		};
	}, [navigate]);

	useEffect(() => {
		const timerToCount = setTimeout(() => {
			setTime(time - 1);
		}, 1000);

		return () => {
			clearTimeout(timerToCount);
		};
	});

	return (
		<>
			<h1>404 Not Found</h1>
			<br></br>
			<h1>will go home after {time}s</h1>

			<button
				onClick={() => {
					navigate('/');
				}}
			>
				back to home
			</button>
		</>
	);
}

export default NotFound;
