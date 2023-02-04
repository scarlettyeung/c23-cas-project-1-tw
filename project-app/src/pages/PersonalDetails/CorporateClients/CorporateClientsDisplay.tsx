import React from 'react';
import { CorporateClientsSettingValue } from '../../../utils/userInfoType';
import { Text, TextInput, Checkbox, Button, Group, Box, Center } from '@mantine/core';
import { ButtonGroup } from '@mantine/core/lib/Button/ButtonGroup/ButtonGroup';

type CorporateInfo = {
  info: CorporateClientsSettingValue;
  goBack: () => void;
  edit: () => void;
};

function CorporateClientsDisplay(props: CorporateInfo) {
  const userInfo = props.info;
  return (
    <>
      <div>
        <div>Corporate Clients Display</div>

        <div>Corporate Clients Details</div>

      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Text>userName:{userInfo.username} </Text>
        <Text>email: {userInfo.email}</Text>
        <Text>contact email: {userInfo.contact_email}</Text>
        <Text>gender: {userInfo.gender}</Text>
        <Text>identity:{userInfo.identity}</Text>

        <Text>AvgScore: {userInfo.avg_score}</Text>
        <Text>SumOfEven: {userInfo.sum_of_even}</Text>

        <Text>contactNumber: {userInfo.contact_number}</Text>
        <Text>name: {userInfo.name ? userInfo.name : <>No name</>}</Text>
        <Text>
          description: {userInfo.description ? userInfo.description : <>No description</>}
        </Text>
        <Text>Business Address: {userInfo.business_address}</Text>
        <Text>Business BR No: {userInfo.business_BR_no}</Text>
        <Text>Business Website: {userInfo.business_website_url ? userInfo.business_website_url : <>No website</>}</Text>
      </div>
      <Group style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Button onClick={props.edit}>To Edit</Button>
        <Button onClick={props.goBack}>Go back</Button>
      </Group>
    </>
  );
}

export default CorporateClientsDisplay;
