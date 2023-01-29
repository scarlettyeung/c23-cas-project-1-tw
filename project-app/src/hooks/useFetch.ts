import { useEffect, useState } from 'react';

export default function useFetch<T = unknown>(url: string, method: string, initValue: T) {
    const [data, setData] = useState<T>(initValue);
    //const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            const jwt = localStorage.getItem('token');
            const path = process.env.REACT_APP_API_BASE;
            // console.log(`the URL is : ${path}${url}`)
            const resp = await fetch(`${path}${url}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                },
            });

            const data = await resp.json();

            if (isMounted) {
                console.log(data);
                setData(data);
            }
        };
        fetchData();

        return () => {
            isMounted = false;
        };
    }, [url, method]);

    return { data };
}