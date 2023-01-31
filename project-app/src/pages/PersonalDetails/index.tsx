import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { HashTag, Event } from '../About/index';
import { Text, TextInput, Checkbox, Button, Group, Box, Center } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

// import { useForm } from '@mantine/form';

function Details() {
	const { data, isLoading, error } = useFetch<any>(`users/getSettingInfo`, 'GET', '');
	const userInfo = data;
	// console.log(userInfo.data)
	const navigate = useNavigate();

	const [isPerformers, setIsPerformers] = useState<boolean>(false);
	const [isClients, setIsClients] = useState<boolean>(false);
	const [isIndividualClients, setIsIndividualClients] = useState<boolean>(false);
	const [isCorporateClients, setIsCorporateClients] = useState<boolean>(false);

	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [avgScore, setAvgScore] = useState<number>(0);
	const [sumOfEven, setSumOfEven] = useState<number>();

	const [icon, setIcon] = useState<string | null>();
	const [userName, setUserName] = useState<string>();
	const [email, setEmail] = useState<string>();
	const [identity, setIdentity] = useState<string>();
	const [yearsOfExp, setYearsOfExp] = useState<number>(0);
	const [birthday, setBirthday] = useState<Date>();
	const [contactNumber, setContactNumber] = useState<number | null>();
	const [contactEmail, setContactEmail] = useState<string | null>('');
	const [gender, setGender] = useState<string>('other');
	const [name, setName] = useState<string | null>('Miss name');
	const [description, setDescription] = useState<string | null>('Missing description');
	const [facebookUrl, setFacebookUrl] = useState<string | null>('Missing URL');
	const [twitterUrl, setTwitterUrl] = useState<string | null>('Missing URL');
	const [youtubeUrl, setYoutubeUrl] = useState<string | null>('Missing URL');
	const [igUrl, setIgUrl] = useState<string | null>('Missing URL');
	const [hashtags, setHashtags] = useState<HashTag[] | null>();
	const [events, setEvents] = useState<Event[] | null>();
	const [businessAddress, setBusinessAddress] = useState<string | null>('Missing Address');
	const [businessBRNo, setBusinessBRNo] = useState<string | null>('Missing BR No');
	const [businessWebsiteUrl, setBusinessWebsiteUrl] = useState<string | null>('Missing URL');
	const edit = () => {
		console.log('edit Now !');
		setIsEdit(true);
	};
	const complete = () => {
		console.log('complete!! / summit !!');
		setIsEdit(false);
	};
	const exit = () => {
		console.log('exit Now !');
		setIsEdit(false);
	};
	const goBack = () => {
		console.log('goBack Now !');
		navigate(-1);
	};

	useEffect(() => {
		if (!isLoading) {
			const typeOfIdentity = userInfo.userInfo.identity;
			console.log(userInfo.userInfo);
			if (typeOfIdentity === 'performer') {
				setIsPerformers(true);
			}
			if (typeOfIdentity === 'client') {
				setIsClients(true);
			}
			if (isPerformers) {
				setIcon(userInfo.userInfo.icon);
				setUserName(userInfo.userInfo.username);
				setEmail(userInfo.userInfo.email);
				setGender(userInfo.userInfo.performers[0].gender);
				setIdentity(userInfo.userInfo.identity);
				setYearsOfExp(userInfo.userInfo.performers[0].years_of_exp);
				setAvgScore(userInfo.userInfo.performers[0].avgScore);
				setSumOfEven(userInfo.userInfo.performers[0].sumOfEven);
				setBirthday(userInfo.userInfo.performers[0].birthday);
				setContactNumber(userInfo.userInfo.performers[0].contact_number);

				const name = userInfo.userInfo.performers[0].name;
				if (name) {
					setName(name);
				}
				const description = userInfo.userInfo.performers[0].description;
				if (description) {
					setDescription(userInfo.userInfo.performers[0].description);
				}

				const fb = userInfo.userInfo.performers[0].facebook_url;

				if (fb) {
					setFacebookUrl(userInfo.userInfo.performers[0].facebook_url);
				}

				const tw = userInfo.userInfo.performers[0].twitter_url;
				if (tw) {
					setTwitterUrl(userInfo.userInfo.performers[0].twitter_url);
				}

				const yt = userInfo.userInfo.performers[0].youtube_url;
				if (yt) {
					setYoutubeUrl(userInfo.userInfo.performers[0].youtube_url);
				}
				const ig = userInfo.userInfo.performers[0].ig_url;
				if (ig) {
					setIgUrl(userInfo.userInfo.performers[0].ig_url);
				}

				const HashtagArrWithObj = userInfo.userInfo.performers[0].performers_hashtags;

				const mapTags = HashtagArrWithObj.map(
					(t: { hashtag_details: { id: number; name: string } }) => ({
						id: t.hashtag_details.id,
						name: t.hashtag_details.name,
					}),
				);
				setHashtags(mapTags);

				const events = userInfo.userInfo.performers[0].events;
				if (events) {
					setEvents(events);
				}
			}

			if (isClients) {
				const userType = userInfo.userInfo.clients[0].client_type;
				if (userType === 'individual') {
					setIsIndividualClients(true);
				}

				if (userType === 'corporate') {
					setIsCorporateClients(true);

					const BAddress = userInfo.userInfo.clients[0].business_address;
					const BRNo = userInfo.userInfo.clients[0].business_BR_no;
					const BUrl = userInfo.userInfo.clients[0].business_website_url;
					if (BAddress) {
						setBusinessAddress(BAddress);
					}
					if (BRNo) {
						setBusinessBRNo(BRNo);
					}
					if (BUrl) {
						setBusinessWebsiteUrl(BUrl);
					}
				}
				setIcon(userInfo.userInfo.icon);
				setUserName(userInfo.userInfo.username);
				setEmail(userInfo.userInfo.email);
				setGender(userInfo.userInfo.clients[0].gender);
				setIdentity(userInfo.userInfo.identity);
				setAvgScore(userInfo.userInfo.clients[0].avgScore);
				setSumOfEven(userInfo.userInfo.clients[0].sumOfEven);
				setContactNumber(userInfo.userInfo.clients[0].contact_number);

				const name = userInfo.userInfo.clients[0].name;
				if (name) {
					setName(name);
				}

				const contactEmail = userInfo.userInfo.clients[0].contact_email;
				if (contactEmail) {
					setContactEmail(contactEmail);
				} else {
					setContactEmail(userInfo.userInfo.clients[0].email);
				}

				const description = userInfo.userInfo.clients[0].description;
				if (description) {
					setDescription(userInfo.userInfo.clients[0].description);
				}

				const events = userInfo.userInfo.clients[0].events;
				if (events) {
					setEvents(events);
				}
			}
		}
	}, [userInfo, isLoading, isClients, isPerformers]);

	//// use this https://mantine.dev/core/text-input/
	return (
		<>
			{isLoading && <div>Loading....</div>}
			{!isLoading && !isEdit && isPerformers && (
				<>
					<button onClick={goBack}>Go back</button>
					<div>Performers Details</div>
					<button onClick={edit}>To Edit</button>
					<br></br>
					<Text>icon: {icon}</Text>
					<Text>userName:{userName} </Text>
					<Text>email: {email}</Text>
					<Text>gender: {gender}</Text>
					<Text>identity: {identity}</Text>
					<Text>AvgScore: {avgScore}</Text>
					<Text>SumOfEven: {sumOfEven}</Text>
					<Text>yearsOfExp: {yearsOfExp}</Text>
					<Center>
						<DatePicker
							placeholder='Pick date'
							label='birthday'
							value={new Date(birthday!)}
							variant='unstyled'
							readOnly
						/>
					</Center>
					<Text>contactNumber: {contactNumber}</Text>
					<Text>name: {name}</Text>
					<Text>description: {description}</Text>
					<Text>facebookUrl: {facebookUrl}</Text>
					<Text>twitterUrl: {twitterUrl}</Text>
					<Text>youtubeUrl: {youtubeUrl}</Text>
					<Text>igUrl: {igUrl}</Text>
					<Text>
						hashTag: {!hashtags && <div>No hashTag</div>}
						{hashtags && hashtags.map((tag) => <div key={tag.id}>{tag.name}</div>)}
					</Text>
				</>
			)}
			{!isLoading && !isEdit && isClients && isIndividualClients && (
				<>
					<button onClick={goBack}>Go back</button>
					<div>Individual Clients Details</div>
					<button onClick={edit}>To Edit</button>
					<br></br>
					<Text>icon: {icon}</Text>
					<Text>userName:{userName} </Text>
					<Text>email: {email}</Text>
					<Text>gender: {gender}</Text>
					<Text>
						identity: {identity} ({isIndividualClients ? <>Individual</> : <> Corporate</>})
					</Text>
					<Text>AvgScore: {avgScore}</Text>
					<Text>SumOfEven: {sumOfEven}</Text>
					<Text>contactNumber: {contactNumber}</Text>
					<Text>name: {name}</Text>
					<Text>description: {description}</Text>
					<Text>events: {description}</Text>
				</>
			)}
			{!isLoading && !isEdit && isClients && isCorporateClients && (
				<>
					<button onClick={goBack}>Go back</button>
					<div>Corporate Clients Details</div>
					<button onClick={edit}>To Edit</button>
					<br></br>
				</>
			)}

			{!isLoading && isEdit && isPerformers && (
				<>
					<button onClick={exit}>Exit</button>
					<div>Performers Details Editing</div>
					<button onClick={complete}>Complete</button>
					<br></br>
				</>
			)}
			{!isLoading && isEdit && isClients && isIndividualClients && (
				<>
					<button onClick={exit}>Exit</button>
					<div>Individual Clients Details Editing</div>
					<button onClick={complete}>Complete</button>
					<br></br>
				</>
			)}
			{!isLoading && isEdit && isClients && isCorporateClients && (
				<>
					<button onClick={exit}>Exit</button>
					<div>Corporate Clients Details Editing</div>
					<button onClick={complete}>Complete</button>
					<br></br>
				</>
			)}
		</>
	);
}

export default Details;
