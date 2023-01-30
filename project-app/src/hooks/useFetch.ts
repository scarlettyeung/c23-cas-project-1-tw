import { useEffect, useState } from 'react';

export default function useFetch<T = unknown>(url: string, method: string, initValue: T) {
	const [data, setData] = useState<T>(initValue);

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<boolean>(false);
	// const [isMounted, setIsMounted] = useState<boolean>(true);

	// const fetchData = async () => {
	// 	console.log('call getData!!!');
	// 	const jwt = localStorage.getItem('token');
	// 	const path = process.env.REACT_APP_API_BASE;
	// 	const resp = await fetch(`${path}${url}`, {
	// 		method: method,
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			Authorization: `Bearer ${jwt}`,
	// 		},
	// 	});

	// 	if (resp.ok) {
	// 		getData = await resp.json();
	// 		setData(getData);
	// 		setIsLoading(false);
	// 	}
	// };

	const fetchData = function () {
		const jwt = localStorage.getItem('token');
		const path = process.env.REACT_APP_API_BASE;
		console.log();
		console.log('calling function : ', i);
		i++;
		fetch(`${path}${url}`, {
			method: method,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwt}`,
			},
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					setError(true);
				}
			})
			.then((getData) => {
				setData(getData);
				setIsLoading(false);
				console.log(getData);
			})
			.catch((error) => {
				console.error('Error:', error);
				setError(true);
				setIsLoading(false);
			});
	};
	let i = 1;

	useEffect(() => {
		fetchData();

		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url, method]);

	return { data, isLoading, error };
}
