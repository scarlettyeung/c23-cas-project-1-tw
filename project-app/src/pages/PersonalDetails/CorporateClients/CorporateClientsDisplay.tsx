import React from 'react';
import { CorporateClientsSettingValue } from '../../../utils/userInfoType';
import { Text, Button, Title, Card } from '@mantine/core';
import '../../../styles/userEdit.css';

type CorporateInfo = {
  info: CorporateClientsSettingValue;
  goBack: () => void;
  edit: () => void;
};

function CorporateClientsDisplay(props: CorporateInfo) {
  const userInfo = props.info;
  return (
    <div className='Body'>
      <Card classNames={'IdCard'} withBorder p='xl' radius='md'>
        <Card.Section sx={{ height: 20 }} />
        <Title order={2}>Corporate Clients Details</Title>

        <div>
          <div className='Client'>
            <Text fw={700} ta='left' tt='uppercase'>
              userName:
            </Text>
            <Text c='dimmed'>{userInfo.username} </Text>
          </div>

          <div className='Client'>
            <Text fw={700} ta='left' tt='uppercase'>
              email:
            </Text>
            <Text c='dimmed'>{userInfo.email}</Text>
          </div>

          <div className='Client'>
            <Text fw={700} ta='left' tt='uppercase'>
              contact email:
            </Text>
            <Text c='dimmed'> {userInfo.contact_email}</Text>
          </div>

          <div className='Client'>
            <Text fw={700} ta='left' tt='uppercase'>
              gender:
            </Text>
            <Text c='dimmed'> {userInfo.gender}</Text>
          </div>

          <div className='Client'>
            <Text fw={700} ta='left' tt='uppercase'>
              identity:
            </Text>
            <Text c='dimmed'>{userInfo.identity}</Text>
          </div>

          <div className='Client'>
            <Text fw={700} ta='left' tt='uppercase'>
              AvgScore:
            </Text>
            <Text c='dimmed'>{userInfo.avg_score}</Text>
          </div>

          <div className='Client'>
            <Text fw={700} ta='left' tt='uppercase'>
              SumOfEven:
            </Text>
            <Text c='dimmed'>{userInfo.sum_of_even}</Text>
          </div>

          <div className='Client'>
            <Text fw={700} ta='left' tt='uppercase'>
              contactNumber:
            </Text>
            <Text c='dimmed'>{userInfo.contact_number}</Text>
          </div>

          <div className='Client'>
            <Text fw={700} ta='left' tt='uppercase'>
              name:
            </Text>
            <Text c='dimmed'>{userInfo.name ? userInfo.name : <>No name</>}</Text>
          </div>

          <div className='Client'>
            <Text fw={700} ta='left' tt='uppercase'>
              description:
            </Text>
            <Text c='dimmed'>
              {userInfo.description ? userInfo.description : <>No description</>}
            </Text>
          </div>

          <div className='Client'>
            <Text fw={700} ta='left' tt='uppercase'>
              Business Address:
            </Text>
            <Text c='dimmed'> {userInfo.business_address}</Text>
          </div>

          <div className='Client'>
            <Text fw={700} ta='left' tt='uppercase'>
              Business BR No:
            </Text>
            <Text c='dimmed'>{userInfo.business_BR_no}</Text>
          </div>

          <div className='Client'>
            <Text fw={700} ta='left' tt='uppercase'>
              Business Website:
            </Text>
            <Text c='dimmed'>
              {userInfo.business_website_url ? userInfo.business_website_url : <>No website</>}
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

export default CorporateClientsDisplay;
