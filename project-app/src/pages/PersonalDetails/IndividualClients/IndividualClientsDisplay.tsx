import React from 'react';
import { IndividualClientsSettingValue } from '../../../utils/userInfoType';
import { Text, Button, Title, Card } from '@mantine/core';
import '../../../styles/userEdit.css';
type individualClientsInfo = {
	info: IndividualClientsSettingValue;
	goBack: () => void;
	edit: () => void;
};

function IndividualClientsDisplay(props: individualClientsInfo) {
	const userInfo = props.info;
	return (
		<div className='Body'>
			<Card classNames={'IdCard'} withBorder p='xl' radius='md'>
				<Card.Section sx={{ height: 20 }} />
				<Title order={2}>Individual Clients Display</Title>

				<div>
					<div className='Indiv-Client'>
						<Text fw={700} ta='left' tt='uppercase'>
							userName:
						</Text>
						<Text c='dimmed'>{userInfo.username} </Text>
					</div>

					<div className='Indiv-Client'>
						<Text fw={700} ta='left' tt='uppercase'>
							email:
						</Text>
						<Text c='dimmed'>{userInfo.email} </Text>
					</div>

					<div className='Indiv-Client'>
						<Text fw={700} ta='left' tt='uppercase'>
							contact email:
						</Text>
						<Text c='dimmed'>{userInfo.contact_email} </Text>
					</div>

					<div className='Indiv-Client'>
						<Text fw={700} ta='left' tt='uppercase'>
							gender:
						</Text>
						<Text c='dimmed'>{userInfo.gender} </Text>
					</div>

					<div className='Indiv-Client'>
						<Text fw={700} ta='left' tt='uppercase'>
							identity:
						</Text>
						<Text c='dimmed'>{userInfo.identity}</Text>
					</div>

					<div className='Indiv-Client'>
						<Text fw={700} ta='left' tt='uppercase'>
							AvgScore:
						</Text>
						<Text c='dimmed'>{userInfo.avg_score}</Text>
					</div>

					<div className='Indiv-Client'>
						<Text fw={700} ta='left' tt='uppercase'>
							SumOfEven:
						</Text>
						<Text c='dimmed'>{userInfo.sum_of_even}</Text>
					</div>

					<div className='Indiv-Client'>
						<Text fw={700} ta='left' tt='uppercase'>
							contactNumber:
						</Text>
						<Text c='dimmed'>{userInfo.contact_number}</Text>
					</div>

					<div className='Indiv-Client'>
						<Text fw={700} ta='left' tt='uppercase'>
							name:
						</Text>
						<Text c='dimmed'>{userInfo.name ? userInfo.name : <>No name</>}</Text>
					</div>

					<div className='Indiv-Client'>
						<Text fw={700} ta='left' tt='uppercase'>
							description:
						</Text>
						<Text c='dimmed'>
							{userInfo.description ? userInfo.description : <>No description</>}
						</Text>
					</div>
				</div>
			</Card>

			<div className='User-ButtonGroup'>
				<Button className='User-EditButtonGroup' onClick={props.goBack}>
					Go back
				</Button>
				<Button className='User-EditButtonGroup' onClick={props.edit}>
					To Edit
				</Button>
			</div>
		</div>
	);
}

export default IndividualClientsDisplay;
