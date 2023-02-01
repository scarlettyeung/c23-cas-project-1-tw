import React, { useState, useEffect } from 'react';
// import { MediaURL, PersonalData, TeamData, HashTag } from '../index';
import HashTags from './HashTags';
import EventInfo from './EventInfo';
import { useRootSelector } from '../../../redux/store';
import { PerformanceInfo } from '../../../utils/userInfoType';
import { Rating, Group } from '@mantine/core';

type UserInfoProps = {
	pageUUID?: string;
	info: PerformanceInfo;
};

function PersonalInfo(props: UserInfoProps) {
	const uuidFromState = useRootSelector((state) => state.auth.uuid);
	const uuidInPage = props.pageUUID;
	console.log(props);

	return (
		<>
			<div>===PersonalInfo===</div>
			<br></br>
			{props.info.icon ? <div>user Icon:{props.info.icon} </div> : <div>userName: No icon </div>}
			<div>user name:{props.info.username} </div>
			<div>gender:{props.info.gender} </div>
			<div>Avg score (sum of the event) </div>
			<Group position='center'>
				<Rating defaultValue={props.info.avg_score} readOnly />
				<div> ({props.info.sum_of_even}) </div>
			</Group>
			<div>expYear: {props.info.years_of_exp} </div>
			{uuidFromState !== uuidInPage && <button>ToChatRoom</button>}
			<div>=========</div>
			<br></br>
			<div>===hashtags=== </div>
			<div>
				{props.info.performers_hashtags && <HashTags tags={props.info.performers_hashtags} />}
			</div>
			<div>=========</div>
			<br></br>
			<div>===URL===</div>

			{props.info.facebook_url ? (
				<div>
					facebook_url: {props.info.facebook_url} <br></br>
				</div>
			) : (
				<>
					facebook_url: No ULR<br></br>
				</>
			)}
			{props.info.ig_url ? (
				<div>
					ig_url: {props.info.ig_url} <br></br>
				</div>
			) : (
				<>
					ig_url: No ULR<br></br>
				</>
			)}
			{props.info.twitter_url ? (
				<div>
					twitter_url: {props.info.twitter_url} <br></br>
				</div>
			) : (
				<>
					twitter_url: No ULR<br></br>
				</>
			)}
			{props.info.youtube_url ? (
				<div>
					youtube_url: {props.info.youtube_url} <br></br>
				</div>
			) : (
				<>
					youtube_url: No ULR<br></br>
				</>
			)}
			<div>=========</div>

			<div>=== Event ===</div>
			<div>{props.info.events ? <EventInfo info={props.info.events} /> : <div>No Event</div>}</div>
			<div>=============</div>
			<br></br>
		</>
	);
}

export default PersonalInfo;
