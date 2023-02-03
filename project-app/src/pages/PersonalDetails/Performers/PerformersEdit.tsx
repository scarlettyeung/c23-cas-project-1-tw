import React, { FormEvent, useState } from 'react';
import { PerformersSettingValue } from '../../../utils/userInfoType';
import useFetch from '../../../hooks/useFetch';
import { Text, TextInput, Button, Group, Box, Center, NumberInput, Indicator } from '@mantine/core';
import { useForm, isInRange, matches } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons';


type PerformerInfo = {
  info: PerformersSettingValue;
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
      username: props.info.username,
      email: props.info.email,
      contactEmail: props.info.contact_email,
      gender: props.info.gender,
      identity: props.info.identity,
      avgScore: props.info.avg_score || 0,
      sumOfEven: props.info.sum_of_even || 0,
      years_of_exp: props.info.years_of_exp,
      birthday: props.info.birthday,
      icon: props.info.icon,
      contactNumber: props.info.contact_number,
      name: props.info.name || "",
      description: props.info.description || "",
      facebook_url: props.info.facebook_url || "",
      twitter_url: props.info.twitter_url || "",
      youtube_url: props.info.youtube_url || "",
      ig_url: props.info.ig_url || "",
      performers_hashtags: props.info.performers_hashtags,
      // events: props.info.events,
      // tag_options: props.info.performers_hashtags,
      // avg_score: props.info.avg_score,
      // sum_of_even: props.info.sum_of_even
    },



    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  // form.validate();
  const hashArray = props.info.performers_hashtags?.map((tag) => tag.name)


  // console.log("check birthday", props.info.birthday!.getDate());
  const [submittedValues, setSubmittedValues] = useState('');
  async function fetchData() {
    const path = process.env.REACT_APP_API_BASE;
    const jwt = localStorage.getItem('token');
    await fetch(`${path}users/editInfo`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      },
      body: submittedValues,
    });
  }
  fetchData();
  console.log("TRYTRY", submittedValues);

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values, e: FormEvent) => {
        e.preventDefault();

        console.dir('get the values!!!!!')
        console.dir(values)

        setSubmittedValues(JSON.stringify(values, null, 2));
      }
        //   async (values, e: FormEvent) => {
        //   e.preventDefault();
        //   const path = process.env.REACT_APP_API_BASE;
        //   const jwt = localStorage.getItem('token');
        //   await fetch(`${path}users/editInfo`, {
        //     method: 'PUT',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       Authorization: `Bearer ${jwt}`
        //     },
        //     body: JSON.stringify(values),

        //   })

        // }
      )}>
        <div>Performers Edit</div>
        <TextInput required {...form.getInputProps('username')} label='username:' />
        <TextInput readOnly {...form.getInputProps('email')} label='email: (read only)' />
        <TextInput {...form.getInputProps('contact_email')} label='contact email:  ' />
        <TextInput readOnly {...form.getInputProps('gender')} label='gender: (read only)' />
        <TextInput readOnly {...form.getInputProps('identity')} label='identity: (read only)' />
        <NumberInput readOnly {...form.getInputProps('avg_score')} label='AvgScore: (read only)' />
        <TextInput readOnly {...form.getInputProps('sumOfEven')} label='SumOfEven: (read only)' />
        <NumberInput {...form.getInputProps('years_of_exp')} label='yearsOfExp:' min={0} max={99} />
        <Center>
          <DatePicker
            styles={{ root: { width: 700 } }}
            placeholder="Pick date"
            readOnly
            label="birthday: (read only)"
            inputFormat="MM/DD/YYYY"
            labelFormat="MM/YYYY"
            defaultValue={new Date(props.info.birthday!)}
          />
        </Center>
        <TextInput required {...form.getInputProps('contact_number')} label='contact number:' />
        <TextInput readOnly {...form.getInputProps('name')} label='name: (read only)' />
        <TextInput label='description:' {...form.getInputProps('description')} />
        <TextInput {...form.getInputProps('facebook_url')} label='facebookUrl:' />
        <TextInput {...form.getInputProps('twitter_url')} label='twitterUrl:' />
        <TextInput {...form.getInputProps('youtube_url')} label='youtubeUrl:' />
        <TextInput {...form.getInputProps('ig_url')} label='igUrl:' />
        <TextInput readOnly value={hashArray} label="hash tag: (read only)" />
        <Group position="right" mt="md">
          <Button type='button' onClick={props.exitEdit}>Exit</Button>
          <Button type='submit'>Complete</Button>
        </Group>
      </form>
    </Box>
  );
}

export default PerformersEdit;
