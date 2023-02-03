import { constants } from 'fs/promises';
import React from 'react';
import BasicInformation from './components/BasicInformation';
// import useFetch from '../../hooks/useFetch';
import Tag from './components/Tag';
function Eprofile() {
	const data = {
		header: {
			iconPosition: 'left',
			iconName: null,
			backgroundImage: 'default',
			colorStyle: 'black',
			displayTab: 'about',
			userName: 'Rick Astley',
			title: 'pop dancer',
			introduction: 'Hi I am Rick Astley',
			contactNumber: '12345678',
			contactEmail: 'RickAstley@email.com',
		},
		page: [
			{
				page: 1,
				pageTitle: 'About me',
				pageName: 'SelfIntroducePage',
				style: 'textAndVideo',
				mainColor: 'black',
				ContentsOrMedia: [
					{
						id: 1,
						type: 'video',
						content1: 'Never Gonna Give You Up',
						content2: 'Hi I am Rick Astley. This is Never Gonna Give You Up (Official Music Video)',
						content3: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
					},
					{
						id: 2,
						type: 'text',
						content1: '',
						content2: 'I am an English singer, songwriter and radio personality.',
						content3: '',
					},
				],
			},
			{
				page: 2,
				pageTitle: 'Time Line',
				pageName: 'TimeLinePage',
				style: 'left',
				mainColor: 'black',
				ContentsOrMedia: [
					{
						id: 1,
						type: 'text',
						content1: 'Signing with Stock Aitken Waterman',
						content2:
							'In 1985, Astley was performing as a drummer with a soul band named FBI, with Morris on guitar. They were a well-known local band writing and performing their own music, gigging in pubs and clubs.',
						content3: '',
					},
					{
						id: 2,
						type: 'video',
						content1: 'Never Gonna Give You Up (Official Music Video)',
						content2: 'at 1987/7/27/',
						content3: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
					},
					{
						id: 3,
						type: 'image',
						content1: 'Retirement and Return to singing ',
						content2:
							'1994 to 2000 was Retirement and in 2000 to present , He was returned to the music industry',
						content3: 'Rick_Astley_Dallas.jpg',
					},
					{
						id: 4,
						type: 'video',
						content1: 'Never Gonna Give You Up (粤语改編)',
						content2: 'at  2021/7/27',
						content3: 'https://www.youtube.com/watch?v=ZhnjLj2Ou90&ab_channel=B%E7%AB%99%E9%95%BF',
					},
					{
						id: 5,
						type: 'video',
						content1: 'Never Gonna Give You Up (國語改編)',
						content2: 'at  2022/2/19',
						content3:
							'https://www.youtube.com/watch?v=vnIGrETLFKg&ab_channel=%E7%B4%94%E6%83%85%E5%B0%8F%E4%B8%AD%E6%9D%91NakamuraC',
					},
				],
			},
			{
				page: 3,
				pageTitle: 'Albums',
				pageName: 'AlbumsPage',
				style: 'style1',
				mainColor: 'black',
				ContentsOrMedia: [
					{
						id: 1,
						type: 'image',
						content1: '',
						content2: '',
						content3: '',
					},
				],
			},
		],
	};
	/*/should use this to fetch date
	// const {
	// 	data,
	// 	isLoading,
	// 	error,
	// } = useFetch<someType | null>(`url/${uuid}`, 'GET', null);
	*/
	const headerInfo = data.header;
	const pageInfo = data.page.map((page) => {
		return {
			id: page.page,
			title: page.pageTitle,
			pageName: page.pageName,
			pageStyle: page.style,
		};
	});
	const contents = data.page.map((content) => {
		return content.ContentsOrMedia;
	});
	return (
		<div>
			<BasicInformation headerInfo={headerInfo} />
			<Tag pageInfo={pageInfo} pageDetail={contents} />
		</div>
	);
} //51+16 67

export default Eprofile;
