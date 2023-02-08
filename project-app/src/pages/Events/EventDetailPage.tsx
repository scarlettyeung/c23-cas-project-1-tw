import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Image, Text, Group, Badge, Button } from '@mantine/core';
import logger from 'redux-logger';
import '../../styles/event.css'

interface EventDetailType {
  id: number;
  title: string;
  wage_offer: number;
  start_date?: any;
  end_date?: any;
  rehearsal_needed: boolean;
  start_time?: any;
  end_time?: any;
  image: string;
  venue_image_name?: string;
  description: string;
  location: string;
  status: string;
  properties: string;
  is_shown: boolean;
  date_published: Date;
}

function EventDetail() {
  let eventId = useParams();
  const [event, setEvent] = useState<EventDetailType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function loadData() {
      const path = process.env.REACT_APP_API_BASE;
      const jwt = localStorage.getItem('token');
      const res = await fetch(`${path}/events/${eventId.eventsId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const json = await res.json();
      setEvent(json);
    }
    loadData();
    setIsLoading(false);
  }, [eventId.eventsId]);

  if (isLoading) return <>isLoading</>;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          paddingBottom: '1.5vh',
          fontWeight: 'bold',
          fontSize: 25,
        }}
      >
        <div>EVENT DETAIL</div>
      </div>

      <Card withBorder radius='md' p='md'>
        <Card.Section>
          <Image src={`${process.env.REACT_APP_IMAGE_BASE}/${event?.image}`} alt='' height={180} />
        </Card.Section>

        <Card.Section className={event?.title} mt='md'>

          <div className='event__detailPage__titleDescription'>
            <div className='event-title-tag'>
              <Text size='lg' weight={500}>
                {event?.title}
              </Text>
              <Badge size='sm'>{event?.location}</Badge>
            </div>
            <div>
              <Text size='sm' mt='xs'>
                <Text fw={700} ta='left' tt='uppercase'>description :</Text>
                {event?.description}
              </Text>
            </div>
          </div>

          <Group spacing={7} mt={5} className="event__detailPage__dateTime">
            <Text size='sm' mt='xs'>
              <div>START DATE :</div>
              {new Date(event?.start_date).getFullYear() +
                '-' +
                (new Date(event?.start_date).getMonth() + 1) +
                '-' +
                new Date(event?.start_date).getDate()}
            </Text>

            <Text className='detail-Time' size='sm' mt='xs'>
              <Text fw={700} ta='left' tt='uppercase'>
                END DATE :
              </Text>
              {new Date(event?.end_date).getFullYear() +
                '-' +
                (new Date(event?.end_date).getMonth() + 1) +
                '-' +
                new Date(event?.end_date).getDate()}{' '}
            </Text>

            <Text className='detail-Time' size='sm' mt='xs'>
              <Text fw={700} ta='left' tt='uppercase'>
                START TIME :
              </Text>
              {new Date(event?.start_time).getHours() +
                ':' +
                new Date(event?.start_time).getMinutes() +
                ':' +
                new Date(event?.start_time).getSeconds()}
            </Text>

            <Text className='detail-Time' size='sm' mt='xs'>
              <Text fw={700} ta='left' tt='uppercase'>
                END TIME :
              </Text>
              {new Date(event?.end_time).getHours() +
                ':' +
                new Date(event?.end_time).getMinutes() +
                ':' +
                new Date(event?.end_time).getSeconds()}
            </Text>
          </Group>
        </Card.Section>
      </Card>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2vh' }}>
        <Button className='eventDetailPage__Apply__btn'
          onClick={async () => {
            const path = process.env.REACT_APP_API_BASE;
            const jwt = localStorage.getItem('token');
            const resp = await fetch(`${path}/events/${eventId.eventsId}`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            });
            const result = await resp.json();
            logger(result);
            alert('Application successfully');
            navigate('/events');
          }}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
export default EventDetail;
