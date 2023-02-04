import React, { useState, useEffect } from 'react';
// import { MediaURL, PersonalData, TeamData, HashTag } from '../index';
import HashTags from './HashTags';
import EventInfo from './EventInfo';
import { useRootSelector } from '../../../redux/store';
import {
	PerformanceInfo,
	CorporateClientsInfo,
	IndividualClientsInfo,
} from '../../../utils/userInfoType';
import { Rating, Group } from '@mantine/core';

type UserInfoProps = {
	pageUUID: string;
	performanceInfo?: PerformanceInfo;
	corporateClientsInfo?: CorporateClientsInfo;
	individualClientsInfo?: IndividualClientsInfo;
};

function PersonalInfo(props: UserInfoProps) {
	const uuidFromState = useRootSelector((state) => state.auth.uuid);
	const uuidInPage = props.pageUUID;
	const performanceInfo = props.performanceInfo;
	const corporateClientsInfo = props.corporateClientsInfo;
	const individualClientsInfo = props.individualClientsInfo;

	if (performanceInfo) {
		return (
			<>
				<div>===PersonalInfo===</div>
				<br></br>
				{performanceInfo.icon ? (
					<div>user Icon:{performanceInfo.icon} </div>
				) : (
					<div>userName: No icon </div>
				)}
				<div>user name:{performanceInfo.username} </div>
				<div>gender:{performanceInfo.gender} </div>
				<div>Avg score (sum of the event) </div>
				<Group position='center'>
					<Rating defaultValue={performanceInfo.avg_score} readOnly />
					<div> ({performanceInfo.sum_of_even}) </div>
				</Group>
				<div>expYear: {performanceInfo.years_of_exp} </div>
				{uuidFromState !== uuidInPage && <button>ToChatRoom</button>}
				<div>=========</div>
				<br></br>
				<div>===hashtags=== </div>
				<div>
					{performanceInfo.performers_hashtags && (
						<HashTags tags={performanceInfo.performers_hashtags} />
					)}
				</div>
				<div>=========</div>
				<br></br>
				<div>===URL===</div>

				{performanceInfo.facebook_url ? (
					<div>
						facebook_url: {performanceInfo.facebook_url} <br></br>
					</div>
				) : (
					<>
						facebook_url: No ULR<br></br>
					</>
				)}
				{performanceInfo.ig_url ? (
					<div>
						ig_url: {performanceInfo.ig_url} <br></br>
					</div>
				) : (
					<>
						ig_url: No ULR<br></br>
					</>
				)}
				{performanceInfo.twitter_url ? (
					<div>
						twitter_url: {performanceInfo.twitter_url} <br></br>
					</div>
				) : (
					<>
						twitter_url: No ULR<br></br>
					</>
				)}
				{performanceInfo.youtube_url ? (
					<div>
						youtube_url: {performanceInfo.youtube_url} <br></br>
					</div>
				) : (
					<>
						youtube_url: No ULR<br></br>
					</>
				)}
				<div>=========</div>

				<div>=== Event ===</div>
				<div>
					{performanceInfo.events ? (
						<EventInfo info={performanceInfo.events} />
					) : (
						<div>No Event</div>
					)}
				</div>
				<div>=============</div>
				<br></br>
			</>
		);
	}

	if (corporateClientsInfo) {
		return (
			<>
				<div>===Corporate Clients Info===</div>
				<br></br>
				{corporateClientsInfo.icon ? (
					<div>user Icon:{corporateClientsInfo.icon} </div>
				) : (
					<div>userName: No icon </div>
				)}
				<div>user name:{corporateClientsInfo.username} </div>
				<div>BA No:{corporateClientsInfo.business_BR_no} </div>
				<div>business address:{corporateClientsInfo.business_address} </div>
				{corporateClientsInfo.business_website_url ? (
					<div>business website:{corporateClientsInfo.business_website_url} </div>
				) : (
					<></>
				)}

				<div>Avg score (sum of the event) </div>
				<Group position='center'>
					<Rating defaultValue={corporateClientsInfo.avg_score} readOnly />
					<div> ({corporateClientsInfo.sum_of_even}) </div>
				</Group>

				{uuidFromState !== uuidInPage && <button>ToChatRoom</button>}
				<div>=========</div>
				<br></br>

				<div>=== Event ===</div>
				<div>
					{corporateClientsInfo.events ? (
						<EventInfo info={corporateClientsInfo.events} />
					) : (
						<div>No Event</div>
					)}
				</div>
				<div>=============</div>
				<br></br>
			</>
		);
	}

	if (individualClientsInfo) {
		return (
			<>
				<div>===Corporate Clients Info===</div>
				<br></br>
				{individualClientsInfo.icon ? (
					<div>user Icon:{individualClientsInfo.icon} </div>
				) : (
					<div>userName: No icon </div>
				)}
				<div>user name:{individualClientsInfo.username} </div>

				<div>Avg score (sum of the event) </div>
				<Group position='center'>
					<Rating defaultValue={individualClientsInfo.avg_score} readOnly />
					<div> ({individualClientsInfo.sum_of_even}) </div>
				</Group>

				{uuidFromState !== uuidInPage && <button>ToChatRoom</button>}
				<div>=========</div>
				<br></br>

				<div>=== Event ===</div>
				<div>
					{individualClientsInfo.events ? (
						<EventInfo info={individualClientsInfo.events} />
					) : (
						<div>No Event</div>
					)}
				</div>
				<div>=============</div>
				<br></br>
			</>
		);
	}
	return <>missing data</>;
}

export default PersonalInfo;
