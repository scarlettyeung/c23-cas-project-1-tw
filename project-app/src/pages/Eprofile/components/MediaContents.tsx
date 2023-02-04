import React from 'react';
import { PageContent, ItemType } from '../../../utils/EprofileType';
import { AspectRatio, Card, Image, Text } from '@mantine/core';
const getYtId = (url: string) => {
	const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
	const match = url.match(regExp);
	return match && match[2].length === 11 ? match[2] : null;
};
function MediaContents(props: { content: PageContent[] }) {
	const { REACT_APP_IMAGE_BASE } = process.env;
	const mapContents = props.content.map((data) => {
		if (data.type === ItemType.video) {
			const getYoutubeId = `https://www.youtube.com/embed/${getYtId(data.content3)}`;

			return (
				<div key={data.id}>
					<Card shadow='sm' p='xl' component='a' target='_blank'>
						<Card.Section>
							<AspectRatio ratio={16 / 9}>
								<iframe
									title='Rick Astley - Never Gonna Give You Up (Official Music Video)'
									src={getYoutubeId}
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
									allowFullScreen
								></iframe>
							</AspectRatio>
						</Card.Section>
						<Text weight={500} size='lg' mt='md' align='left'>
							{data.content1}
						</Text>

						<Text mt='xs' color='dimmed' size='sm' align='left'>
							{data.content2}
						</Text>
					</Card>
				</div>
			);
		} else if (data.type === ItemType.image) {
			const imagePath = `${data.content3}`;
			return (
				<div key={data.id}>
					<Card shadow='sm' p='xl' component='a' target='_blank'>
						<Card.Section>
							<Image
								src={`${REACT_APP_IMAGE_BASE}/${imagePath}`}
								height={160}
								alt='AboutPageImage'
							/>
						</Card.Section>
						<Text weight={500} size='lg' mt='md' align='left'>
							{data.content1}
						</Text>

						<Text mt='xs' color='dimmed' size='sm' align='left'>
							{data.content2}
						</Text>
					</Card>
				</div>
			);
		} else if (data.type === ItemType.text) {
			return (
				<div key={data.id}>
					<Card shadow='sm' p='xl' component='a' target='_blank'>
						{data.content1 ? (
							<Text weight={500} size='lg' mt='md' align='left'>
								{data.content1}
							</Text>
						) : (
							<></>
						)}
						<Text mt='xs' color='dimmed' size='sm' align='left'>
							{data.content2}
						</Text>
					</Card>
				</div>
			);
		} else {
			return <>get error</>;
		}
	});

	return <>{mapContents}</>;
}

export default MediaContents;
