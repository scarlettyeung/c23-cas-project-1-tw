import React from 'react';
import useFetch from '../../hooks/useFetch';
import BasicInformation from './components/BasicInformation';
import { EporfileResDataType, EporfileDataType } from '../../utils/EprofileType';
import Tag from './components/Tag';
import { useParams } from 'react-router-dom';
import { useRootSelector } from '../../redux/store';

const createEprofile = () => {};
function Eprofile() {
	const { uuid } = useParams<string>()!;
	const uuidFromState = useRootSelector((state) => state.auth.uuid);
	const {
		data: resp,
		isLoading,
		error,
	} = useFetch<EporfileResDataType | null>(`users/eProfile/uuid/${uuid}/get`, 'GET', null);

	if (error) {
		if (uuidFromState === uuid) {
			return (
				<>
					<div>empty eProfile</div>
					<button onClick={createEprofile}>create eProfile</button>
				</>
			);
		}
		return (
			<>
				<div>empty eProfile</div>
			</>
		);
	}

	if (!isLoading && resp) {
		const data: EporfileDataType = JSON.parse(resp.eProfileInfo);

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
			return content.contentsOrMedia;
		});

		return (
			<div>
				<BasicInformation headerInfo={headerInfo} />
				<Tag pageInfo={pageInfo} pageDetail={contents} />
			</div>
		);
	} else {
		return <div>Loading...</div>;
	}
}

export default Eprofile;
