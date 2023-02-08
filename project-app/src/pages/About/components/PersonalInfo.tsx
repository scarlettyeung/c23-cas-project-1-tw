import HashTags from './HashTags';
import EventInfo from './EventInfo';
import {
  PerformanceInfo,
  CorporateClientsInfo,
  IndividualClientsInfo,
} from '../../../utils/userInfoType';
import { Rating, Group, Card, Title, Avatar, Text, ActionIcon, createStyles } from '@mantine/core';
import {
  IconBrandInstagram,
  IconBrandMeta,
  IconBrandTwitter,
  IconBrandYoutube,
} from '@tabler/icons';
import '../../../styles/about.css';
import UserBtnGroup from './UserBtnGroup';

const useStyles = createStyles((theme) => ({
  myCustomButton: {
    ...theme.fn.focusStyles(),
    radius: 'xl',
    color: 'green',
    size: 'xl',
    variant: 'subtle',
  },
}));
type UserInfoProps = {
  pageUUID: string;
  performanceInfo?: PerformanceInfo;
  corporateClientsInfo?: CorporateClientsInfo;
  individualClientsInfo?: IndividualClientsInfo;
};

function PersonalInfo(props: UserInfoProps) {
  const { REACT_APP_IMAGE_BASE } = process.env;
  const { classes } = useStyles();
  const performanceInfo = props.performanceInfo;
  const corporateClientsInfo = props.corporateClientsInfo;
  const individualClientsInfo = props.individualClientsInfo;
  const openURL = (url: string) => {
    window.location.assign(`https://${url}`);
  };

  if (performanceInfo) {
    const fb = performanceInfo.facebook_url;
    const ig = performanceInfo.ig_url;
    const twitter = performanceInfo.twitter_url;
    const youtube = performanceInfo.youtube_url;

    return (
      <Card withBorder p='xl' radius='md'>
        <Card.Section sx={{ height: 20 }} />
        <Title order={2}>Personal Info</Title>
        <Avatar size={150} radius={80} mx='auto' style={{ marginBottom: '1vh' }}>
          {performanceInfo.icon ? (
            <img
              src={`${REACT_APP_IMAGE_BASE}/${performanceInfo.icon}`}
              alt={performanceInfo.icon}
            />
          ) : (
            <img src={`${REACT_APP_IMAGE_BASE}/defaultImage.jpg`} alt={'defaultImage.jpg'} />
          )}
        </Avatar>
        <UserBtnGroup />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text align='left' size='lg' weight={500} mt='sm'>
            USER NAME : {performanceInfo.username}
          </Text>
          <Text align='left' size='lg' weight={500} mt='sm'>
            GENDER : {performanceInfo.gender}
          </Text>
          <Text align='left' size='lg' weight={500} mt='sm'>
            USER NAME : {performanceInfo.username}
          </Text>
          <Text align='left' size='lg' weight={500} mt='sm'>
            EXPERIENCE : {performanceInfo.years_of_exp}
          </Text>
          <Text align='left' size='lg' weight={500} mt='sm'>
            SCORE (EVENTS) :{' '}
            <Group align='center'>
              <Rating defaultValue={performanceInfo.avg_score} readOnly />
              <div> ({performanceInfo.sum_of_even}) </div>
            </Group>
          </Text>
          <Text style={{ display: 'flex', justifyContent: 'center' }}>
            {performanceInfo.performers_hashtags && (
              <HashTags tags={performanceInfo.performers_hashtags} />
            )}
          </Text>
        </div>

        <div className='about__personalInfo__iconGroup'>
          {fb ? (
            <ActionIcon
              className={classes.myCustomButton}
              key={'fb_btn'}
              onClick={() => {
                openURL(fb);
              }}
            >
              <IconBrandMeta size={34} />
            </ActionIcon>
          ) : (
            <ActionIcon className={classes.myCustomButton} key={'fb_btn_disabled'} disabled>
              <IconBrandMeta size={34} />
            </ActionIcon>
          )}
          {ig ? (
            <ActionIcon
              className={classes.myCustomButton}
              key={'ig_btn'}
              onClick={() => {
                openURL(ig);
              }}
            >
              <IconBrandInstagram size={34} />
            </ActionIcon>
          ) : (
            <ActionIcon className={classes.myCustomButton} key={'ig_btn_disabled'} disabled>
              <IconBrandInstagram size={34} />
            </ActionIcon>
          )}
          {twitter ? (
            <ActionIcon
              className={classes.myCustomButton}
              key={'twitter_btn'}
              onClick={() => {
                openURL(twitter);
              }}
            >
              <IconBrandTwitter size={34} />
            </ActionIcon>
          ) : (
            <ActionIcon className={classes.myCustomButton} key={'twitter_btn_disabled'} disabled>
              <IconBrandTwitter size={34} />
            </ActionIcon>
          )}
          {youtube ? (
            <ActionIcon className={classes.myCustomButton} key={'youtube_btn'}>
              <IconBrandYoutube
                size={34}
                onClick={() => {
                  openURL(youtube);
                }}
              />
            </ActionIcon>
          ) : (
            <ActionIcon className={classes.myCustomButton} key={'youtube_btn_disabled'} disabled>
              <IconBrandYoutube size={34} />
            </ActionIcon>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <Text size='sm' weight={500}>
            {performanceInfo.events && performanceInfo.events?.length !== 0 ? (
              <EventInfo info={performanceInfo.events} />
            ) : (
              <div>No Event History</div>
            )}
          </Text>
        </div>
      </Card>
    );
  }

  if (corporateClientsInfo) {
    return (
      <Card withBorder p='xl' radius='md'>
        <Card.Section sx={{ height: 20 }} />
        <Title order={2}>Corporate Clients Info</Title>
        <Avatar size={150} radius={80} mx='auto'>
          <div style={{ marginTop: '2vh' }}></div>
          {corporateClientsInfo.icon ? (
            <img
              src={`${REACT_APP_IMAGE_BASE}/${corporateClientsInfo.icon}`}
              alt={corporateClientsInfo.icon}
            />
          ) : (
            <img src={`${REACT_APP_IMAGE_BASE}/defaultImage.jpg`} alt={'defaultImage.jpg'} />
          )}
        </Avatar>
        <div style={{ marginTop: '2vh' }}></div>
        <UserBtnGroup />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: '',
            alignItems: 'center',
          }}
        >
          <Text align='left' size='lg' weight={500} mt='sm'>
            USER NAME : {corporateClientsInfo.username}
          </Text>
          <Text align='left' size='lg' weight={500} mt='sm'>
            BR NO. : {corporateClientsInfo.business_BR_no}
          </Text>
          <Text align='left' size='lg' weight={500} mt='sm'>
            BUSINESS ADDRESS : {corporateClientsInfo.business_address}
          </Text>
          <Text align='left' size='lg' weight={500} mt='sm'>
            WEBSITE :
            {corporateClientsInfo.business_website_url ? (
              <>business website:{corporateClientsInfo.business_website_url} </>
            ) : (
              <></>
            )}
          </Text>
          <Text align='left' size='lg' weight={500} mt='sm'>
            SCORE (EVENTS) :{' '}
            <Group position='left'>
              <Rating defaultValue={corporateClientsInfo.avg_score} readOnly />
              <> ({corporateClientsInfo.sum_of_even}) </>
            </Group>
          </Text>

          <div style={{ flex: 1 }}>
            <Text size='sm' weight={500}>
              {corporateClientsInfo.events && corporateClientsInfo.events?.length !== 0 ? (
                <EventInfo info={corporateClientsInfo.events} />
              ) : (
                <div>No Event</div>
              )}
            </Text>
          </div>
        </div>
      </Card>
    );
  }

  if (individualClientsInfo) {
    console.log(individualClientsInfo.events);
    return (
      <Card withBorder p='xl' radius='md'>
        <Card.Section sx={{ height: 20 }} />
        <Title order={2}>Clients Info</Title>
        <Avatar size={150} radius={80} mx='auto'>
          {individualClientsInfo.icon ? (
            <img
              src={`${REACT_APP_IMAGE_BASE}/${individualClientsInfo.icon}`}
              alt={individualClientsInfo.icon}
            />
          ) : (
            <img src={`${REACT_APP_IMAGE_BASE}/defaultImage.jpg`} alt={'defaultImage.jpg'} />
          )}
        </Avatar>
        <div style={{ marginTop: '2vh' }}></div>
        <UserBtnGroup />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text align='left' size='lg' weight={500} mt='sm'>
            USER NAME : {individualClientsInfo.username}
          </Text>
          <Text align='left' size='lg' weight={500} mt='sm'>
            SCORE (EVENTS) :{' '}
            <Group position='left'>
              <Rating defaultValue={individualClientsInfo.avg_score} readOnly />
              <> ({individualClientsInfo.avg_score}) </>
            </Group>
          </Text>

          <div style={{ flex: 1 }}>
            <Text size='sm' weight={500}>
              {individualClientsInfo.events && individualClientsInfo.events?.length !== 0 ? (
                <EventInfo info={individualClientsInfo.events} />
              ) : (
                <div>No Event</div>
              )}
            </Text>
          </div>
        </div>
      </Card>
    );
  }
  return <>missing data</>;
}

export default PersonalInfo;
