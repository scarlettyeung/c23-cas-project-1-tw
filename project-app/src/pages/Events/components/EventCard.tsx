import { useEffect } from 'react';
import { Card, Image, Text, Group, Badge, Button } from '@mantine/core';
import { getAllDataThunk } from '../../../redux/home';
import { useRootDispatch, useRootSelector } from '../../../redux/store';
import { PacmanLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

const { REACT_APP_IMAGE_BASE } = process.env;

interface BadgeCardProps {
  image: string;
  title: string;
  country: string;
  description: string;
  badges: {
    emoji: string;
    label: string;
  }[];
}

export function BadgeCard({ image, title, description, country, badges }: BadgeCardProps) {
  const dispatch = useRootDispatch();
  const loading = useRootSelector((state) => state.home.loading);
  const eventArr = useRootSelector((state) => state.home.eventArr);

  useEffect(() => {
    dispatch(getAllDataThunk());
  }, [dispatch]);

  return (
    <>
      {loading === 'pending' ? (
        <PacmanLoader />
      ) : (
        <div>
          {eventArr &&
            eventArr.map((event) => (
              <div key={`event-${event.id}`}>
                <Card withBorder radius='md' p='md' className='Card'>
                  <Card.Section>
                    <Image
                      src={`${REACT_APP_IMAGE_BASE}/${event.image}`}
                      alt={title}
                      height={180}
                    />
                  </Card.Section>

                  <Card.Section className='Card' mt='md'>
                    <Group position='apart' style={{ marginLeft: '5vw', marginRight: '5vw' }}>
                      <Text tt="uppercase" fz="xl" fw={700}>
                        {event.title}
                      </Text>
                      <Badge size='sm'>{event.location}</Badge>
                    </Group>

                    <Card.Section className='Card'>
                      <Group
                        spacing={7}
                        mt={5}
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <Text ta="left" mt='md' className='Card' color='dimmed'>
                          {event.description}
                        </Text>
                      </Group>
                    </Card.Section>

                    <Group
                      mt='xs'
                      style={{ display: 'flex', justifyContent: 'center', marginBottom: '3vh' }}
                    >
                      <Link to={`/events/${event.id}`}>
                        <Button className='Event_create_event_btn' btn-id={event.id} uppercase>
                          Show details
                        </Button>
                      </Link>
                    </Group>
                  </Card.Section>
                </Card>
              </div>
            ))}
        </div>
      )}
    </>
  );
}
