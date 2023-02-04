import React from 'react';
import AlbumsPage from './AlbumsPage';
import SelfIntroducePage from './SelfIntroducePage';
import TimeLinePage from './TimeLinePage';
import VideoPage from './VideoPage';
import { PropsDownType } from '../../../utils/EprofileType';

function PageBody(props: PropsDownType) {
	const { pageName, pageDetail } = props;

	const pageNo = parseInt(pageName.split('_')[0], 10) - 1;
	const pageNameToDrp = pageName.split('_')[1];
	const onePageDetails = pageDetail[pageNo];
	// const mediaContentsStyle = pageStyle[pageNo];

	if (pageName.split('_')[1] === 'SelfIntroducePage') {
		return (
			<>
				<SelfIntroducePage contents={onePageDetails} />
				{/* <SelfIntroducePage
					contents={onePageDetails}
					pageStyleName={pageNameToDrp}
					mediaContentsStyle={mediaContentsStyle}
				/> */}
			</>
		);
	} else if (pageNameToDrp === 'TimeLinePage') {
		return (
			<>
				<TimeLinePage contents={onePageDetails} />
			</>
		);
	} else if (pageNameToDrp === 'AlbumsPage') {
		return (
			<>
				<AlbumsPage contents={onePageDetails} />
			</>
		);
	} else if (pageNameToDrp === 'VideoPage') {
		return (
			<>
				<VideoPage contents={onePageDetails} />
			</>
		);
	} else {
		return (
			<>
				<div>getting err</div>
			</>
		);
	}
}

export default PageBody;
