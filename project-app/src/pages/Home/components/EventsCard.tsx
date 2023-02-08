import { useEffect } from 'react';
import {
  createStyles,
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
  Group,
  Badge,
} from '@mantine/core';
import { getAllDataThunk } from '../../../redux/home';
import { useRootDispatch, useRootSelector } from '../../../redux/store';
import { PacmanLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
const { REACT_APP_IMAGE_BASE } = process.env;

const useStyles = createStyles((theme) => ({
  card: {
    transition: 'transform 150ms ease, box-shadow 150ms ease',

    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
}));

export function EventsCard() {
  const { classes } = useStyles();
  const dispatch = useRootDispatch();
  const loading = useRootSelector((state) => state.home.loading);
  const eventArr = useRootSelector((state) => state.home.eventArr);
  console.log(eventArr);

  useEffect(() => {
    dispatch(getAllDataThunk());
  }, [dispatch]);

  const cards =
    eventArr &&
    eventArr.map((event) => {
      return (
        <Link to={`/events/${event.id}`} key={`event-${event.id}`}>
          <Card shadow='sm' p='lg' radius='md' withBorder className={classes.card}>
            <AspectRatio ratio={1920 / 1080}>
              <Image src={`${REACT_APP_IMAGE_BASE}/${event.image}`} />
            </AspectRatio>
            <Group position='apart' mt='md' mb='xs'>
              <Text tt="uppercase" fz="xl" className={classes.title} mt={5}>
                {event.title}
              </Text>
              {event.hashtag_details && (
                <Badge color='pink' variant='light'>
                  {event.hashtag_details}
                </Badge>
              )}

              <Text color='dimmed' transform='uppercase' size='sm' weight={700} mt='md'>
                {event.description}
              </Text>
            </Group>
          </Card>
        </Link>
      );
    });
  return (
    <>
      {loading === 'pending' ? (
        <PacmanLoader />
      ) : (
        <Container py='xl'>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            {cards}
          </SimpleGrid>
        </Container>
      )}
    </>
  );
}
