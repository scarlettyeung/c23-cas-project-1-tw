import { useEffect, useState } from 'react';

export default function useFetch<T = unknown>(url: string, method: string, initValue: T) {
	const [data, setData] = useState<T>(initValue);
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			const jwt = localStorage.getItem('token');
			const path = process.env.REACT_APP_API_BASE;

			const resp = await fetch(`${path}${url}`, {
				method: method,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${jwt}`,
				},
			});
			console.log('response status', resp.status);
			if (resp.status >= 400) {
				setError(true);
			}

			if (isLoading) {
				const data = await resp.json();
				// console.dir('check data', data);
				setData(data);
				setIsLoading(false);
				// console.log('check state', data, error.toString(), isLoading.toString());
			}
		};

		fetchData();
	}, [url, method, isLoading]);
	return { data, error, isLoading };
}
