import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllDataThunk } from '../../redux/home/thunk';
import { useRootDispatch, useRootSelector } from '../../redux/store';

function EventDetail() {
	console.log(useParams());

	const dispatch = useRootDispatch();
	const loading = useRootSelector((state) => state.home.loading);
	const eventArr = useRootSelector((state) => state.home.eventArr);

	useEffect(() => {
		dispatch(getAllDataThunk());
	}, []);

	return <div>EventDetail</div>;
}

export default EventDetail;
