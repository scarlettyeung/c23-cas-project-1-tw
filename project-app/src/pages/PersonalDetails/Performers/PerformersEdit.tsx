import React, { useState, useEffect } from 'react';
import { PerformersSettingValue } from '../../../utils/userInfoType';
import useFetch from '../../../hooks/useFetch';
import { Text, TextInput, Checkbox, Button, Group, Box, Center, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import { isUnparsedTextLike, updateUnionTypeNode } from 'typescript';

type PerformerInfo = {
  info: PerformersSettingValue;
  complete: () => void;
  exitEdit: () => void;
};

interface hashtags {
  name: string;
  id: number;
}

function PerformersEdit(props: PerformerInfo) {
  const {
    data: tagOptions,
    isLoading,
    error,
  } = useFetch<hashtags[] | null>(`users/getAllTag`, 'GET', null);

  const form = useForm({
    initialValues: {
      identity: props.info.identity,
      icon: props.info.icon,
      email: props.info.email,
      username: props.info.username,
      name: props.info.name,
      contact_number: props.info.contact_number,
      performers_hashtags: props.info.performers_hashtags,
      gender: props.info.gender,
      years_of_exp: props.info.years_of_exp,
      avgScore: props.info.avg_score,
      sumOfEven: props.info.sum_of_even,
      birthday: props.info.birthday,
      description: props.info.description,
      facebook_url: props.info.facebook_url,
      twitter_url: props.info.twitter_url,
      youtube_url: props.info.youtube_url,
      ig_url: props.info.ig_url,
      events: props.info.events,
      tag_options: tagOptions,
      // avg_score:props.info
      // sum_of_even:props.info
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  const init = {
    username: props.info.username,
    email: props.info.email,
    years_of_exp: props.info.years_of_exp,
    birthday: props.info.birthday,
    contact_number: (props.info.contact_number)?.toString(),
    description: props.info.description,
    facebook_url: props.info.facebook_url,
    twitter_url: props.info.twitter_url,
    youtube_url: props.info.youtube_url,
    ig_url: props.info.ig_url,

  }
  const [update, setUpdate] = useState(init)
  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <div>Performers Edit</div>
        <TextInput value={update.username} label='username:'>{props.info.username}</TextInput>
        <TextInput value={update.email} label='email:'>{props.info.email}</TextInput>
        <Text>gender: {props.info.gender}</Text>
        <Text>identity:{props.info.identity}</Text>
        <Text>AvgScore: {props.info.avg_score}</Text>
        <Text>SumOfEven: {props.info.sum_of_even}</Text>
        <TextInput value={update.years_of_exp} label='yearsOfExp:'>{props.info.years_of_exp}</TextInput>
        <Center>
          <DatePicker
            placeholder='Pick date'
            label='birthday'
            value={new Date(update.birthday!)}
            variant='unstyled'
          />
        </Center>
        <TextInput value={update.contact_number} label='contactNumber:'>{props.info.contact_number}</TextInput>
        <Text>name: {props.info.name ? props.info.name : <>No name</>}</Text>
        <TextInput value={update.description} label='description:'>
          {props.info.description ? props.info.description : <>No description</>}
        </TextInput>
        <TextInput value={update.facebook_url} label='facebookUrl:'>{props.info.facebook_url ? props.info.facebook_url : <>No URL</>}</TextInput>
        <TextInput value={update.twitter_url} label='twitterUrl:'> {props.info.twitter_url ? props.info.twitter_url : <>No URL</>}</TextInput>
        <TextInput value={update.youtube_url} label='youtubeUrl:'>{props.info.youtube_url ? props.info.youtube_url : <>No URL</>}</TextInput>
        <TextInput value={update.ig_url} label='igUrl:'>{props.info.ig_url ? props.info.ig_url : <>No URL</>}</TextInput>
        <Text>
          hashTag: {!props.info.performers_hashtags && <div>No hashTag</div>}
        </Text>
        <Group position="right" mt="md">
          <Button type='button' onClick={props.exitEdit}>Exit</Button>
          <Button type='submit' onClick={props.complete}>Complete</Button>
        </Group>

      </form>
    </Box>
  );
}

export default PerformersEdit;
