import React, { FormEvent } from 'react';
import { IndividualClientsSettingValue } from '../../../utils/userInfoType';
import { Text, TextInput, Checkbox, Button, Group, Box, Center, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
type individualClientsInfo = {
  info: IndividualClientsSettingValue;
  complete: () => void;
  exitEdit: () => void;
};

function IndividualClientsEdit(props: individualClientsInfo) {
  const form = useForm({
    initialValues: {
      username: props.info.username,
      email: props.info.email,
      gender: props.info.gender,
      identity: props.info.identity,
      avg_score: props.info.avg_score,
      sum_of_even: props.info.sum_of_even,
      contact_number: props.info.contact_number,
      name: props.info.name || "",
      description: props.info.description || "",
      events: props.info.events,
      icon: props.info.icon,
    },



    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit(async (values, e: FormEvent) => {
        e.preventDefault();
        const path = process.env.REACT_APP_API_BASE;
        const jwt = localStorage.getItem('token');
        await fetch(`${path}users/editInfo`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
          },
          body: JSON.stringify(values),

        })
      }
      )}>
        <div>Individual Clients EDIT</div>
        <TextInput required {...form.getInputProps('username')} label='username:' />
        <TextInput {...form.getInputProps('email')} label='contact email:' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$" />
        <TextInput readOnly {...form.getInputProps('gender')} label='gender: (read only)' />
        <TextInput readOnly {...form.getInputProps('identity')} label='identity: (read only)' />
        <NumberInput readOnly {...form.getInputProps('avg_score')} label='AvgScore: (read only)' />
        <TextInput readOnly {...form.getInputProps('sumOfEven')} label='SumOfEven: (read only)' />
        <TextInput required {...form.getInputProps('contact_number')} label='contact number:' />
        <TextInput readOnly {...form.getInputProps('name')} label='name: (read only)' />
        <TextInput label='description:' {...form.getInputProps('description')} />
        <Group position="right" mt="md">
          <Button type='button' onClick={props.exitEdit}>Exit</Button>
          <Button type='submit' onClick={props.complete}>Complete</Button>
        </Group>
      </form>
    </Box>
  );
}

export default IndividualClientsEdit;
