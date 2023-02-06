import React from 'react';
import { MediaPropsType, ItemType } from '../../../utils/EprofileType';
import { Timeline, Card, Image, Text, AspectRatio } from '@mantine/core';

function TimeLinePage(props: MediaPropsType) {
	const { REACT_APP_IMAGE_BASE } = process.env;
	const getYtId = (url: string) => {
		const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		const match = url.match(regExp);
		return match && match[2].length === 11 ? match[2] : null;
	};
	return (
		<Timeline active={props.contents.length} lineWidth={6} bulletSize={26}>
			{props.contents.map((item) => {
				if (item.type === ItemType.image) {
					return (
						<Timeline.Item title={item.content1} key={`TimeLine_${item.type}Obj_${item.id}`}>
							<Card style={{ width: '80%' }} shadow='sm' p='xs' radius='md' withBorder>
								<Card.Section>
									<Image
										src={`${REACT_APP_IMAGE_BASE}/${item.content3}`}
										height={160}
										alt='Norway'
									/>
								</Card.Section>
								<Text mt='xs' color='dimmed' size='sm' align='left'>
									{item.content2}
								</Text>
							</Card>
						</Timeline.Item>
					);
				} else if (item.type === ItemType.text) {
					return (
						<Timeline.Item title={item.content1} key={`TimeLine_${item.type}Obj_${item.id}`}>
							<Card style={{ width: '80%' }} shadow='sm' p='xs' radius='md' withBorder>
								<Text mt='xs' color='dimmed' size='sm' align='left'>
									{item.content2}
								</Text>
							</Card>
						</Timeline.Item>
					);
				} else if (item.type === ItemType.video) {
					const getYoutubeId = `https://www.youtube.com/embed/${getYtId(item.content3)}`;
					return (
						<Timeline.Item title={item.content1} key={`TimeLine_${item.type}Obj_${item.id}`}>
							<Card style={{ width: '80%' }} shadow='sm' p='xs' radius='md' withBorder>
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

								<Text mt='xs' color='dimmed' size='sm' align='left'>
									{item.content2}
								</Text>
							</Card>
						</Timeline.Item>
					);
				} else {
					return <>error ItemType</>;
				}
			})}
		</Timeline>
	);
}
export default TimeLinePage;
