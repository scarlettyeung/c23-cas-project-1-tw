import { useEffect, useState } from 'react';
// import axios from "axios"
export default function useFetch<T = unknown>(
	url: string,
	method: string,
	initValue: T,
	refresh?: any,
) {
	const [data, setData] = useState<T>(initValue);
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const jwt = localStorage.getItem('token');
			const path = process.env.REACT_APP_API_BASE;

			const resp = await fetch(`${path}/${url}`, {
				method: method,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${jwt}`,
				},
			});
			if (resp.status >= 400) {
				setError(true);
			}

			// if (isLoading) {
			const data = await resp.json();
			setData(data);
			setIsLoading(false);
			// }
		};

		fetchData();
		return () => {
			// setIsLoading(true)
		};
	}, [url, method, isLoading, refresh]);

	return { data, error, isLoading };
}
