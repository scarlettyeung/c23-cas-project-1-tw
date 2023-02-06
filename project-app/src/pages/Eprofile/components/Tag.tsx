import React, { useState } from 'react';
import { SegmentedControl } from '@mantine/core';
import PageBody from './PageBody';
import { PropsDownAllData } from '../../../utils/EprofileType';

function Tag(props: PropsDownAllData) {
	const [page, setPage] = useState<string>('1_SelfIntroducePage');
	const mapTagDataSegmentedControl = props.pageInfo.map((data) => {
		return {
			label: data.title,
			value: `${data.id}_${data.pageName}`,
		};
	});
	const pageStyle = props.pageInfo.map((data) => {
		return data.pageStyle;
	});
	return (
		<>
			<SegmentedControl
				value={page}
				onChange={setPage}
				data={mapTagDataSegmentedControl}
				fullWidth
				style={{ marginBottom: '2vh' }}
			/>
			<PageBody pageName={page} pageDetail={props.pageDetail} pageStyle={pageStyle} />
		</>
	);
}

export default Tag;
