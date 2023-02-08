import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, ActionIcon, Group } from '@mantine/core';
import { IconBrandWhatsapp } from '@tabler/icons';
import { useRootSelector } from '../../../redux/store';
function UserBtnGroup() {
  const uuidFromState = useRootSelector((state) => state.auth.uuid);
  const { uuid } = useParams<string>()!;
  const navigate = useNavigate();
  const openURL = (url: string) => {
    window.location.href = url;
  };
  const [wsLink, setWsLink] = useState<string>('');
  useEffect(() => {
    async function getNumber() {
      const jwt = localStorage.getItem('token');
      const path = process.env.REACT_APP_API_BASE;
      let data = await fetch(`${path}/users/contact/${uuid}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      let result = await data.json();
      if (result.contactData.performers[0]?.contact_number) {
        const userPhoneNumber: number = result.contactData.performers[0].contact_number;
        setWsLink(`https://wa.me/852${userPhoneNumber}`);
      }
    }
    getNumber();
  }, [uuid]);

  return (
    <>
      <Group position='center' spacing='xl'>
        {uuidFromState !== uuid && (
          <ActionIcon
            key={1}
            onClick={() => {
              openURL(wsLink);
            }}
          >
            <IconBrandWhatsapp size={34} />
          </ActionIcon>
        )}
        {uuidFromState === uuid && (
          <Button className='UserBtnGroup_BtnGp' onClick={() => navigate('/about')}>
            Edit
          </Button>
        )}
        <Button className='UserBtnGroup_BtnGp'
          onClick={() => navigate(`/eProfile/uuid/${uuidFromState}/get`)}
        >
          E-Profile
        </Button>
      </Group>
    </>
  );
}

export default UserBtnGroup;
