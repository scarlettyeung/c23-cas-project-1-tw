import React, { FormEvent } from 'react';
import { IndividualClientsSettingValue } from '../../../utils/userInfoType';
import { TextInput, Button, Group, Box, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
type individualClientsInfo = {
  info: IndividualClientsSettingValue;

  exitEdit: () => void;
};

function IndividualClientsEdit(props: individualClientsInfo) {
  const form = useForm({
    initialValues: {
      username: props.info.username,
      email: props.info.email,
      contact_email: props.info.contact_email,
      gender: props.info.gender,
      identity: props.info.identity,
      avg_score: props.info.avg_score || 0,
      sum_of_even: props.info.sum_of_even || 0,
      contact_number: props.info.contact_number,
      name: props.info.name || '',
      description: props.info.description || '',
      events: props.info.events,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 300 }} mx='auto'>
      <form
        onSubmit={form.onSubmit((values, e: FormEvent) => {
          e.preventDefault();

          async function fetchData() {
            const path = process.env.REACT_APP_API_BASE;
            const jwt = localStorage.getItem('token');
            await fetch(`${path}/users/editInfo`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
              },
              body: JSON.stringify(values),
            });
          }
          fetchData();
          navigate(-1);
        })}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className='Title' style={{ padding: 0, paddingBottom: "3vh" }}>Individual Client Edit</div></div>
        <TextInput disabled readOnly {...form.getInputProps('email')} label='email: ' />
        <TextInput {...form.getInputProps('contact_email')} label='contact email:' type='email' />
        <TextInput
          required
          {...form.getInputProps('contact_number')}
          label='contact number:'
          minLength={8}
          maxLength={8}
        />
        <TextInput required {...form.getInputProps('username')} label='username:' />
        <TextInput disabled readOnly {...form.getInputProps('gender')} label='gender: ' />
        <TextInput disabled readOnly {...form.getInputProps('identity')} label='identity: ' />
        <NumberInput disabled readOnly {...form.getInputProps('avg_score')} label='AvgScore: ' />
        <TextInput disabled readOnly {...form.getInputProps('sum_of_even')} label='SumOfEven: ' />
        <TextInput disabled readOnly {...form.getInputProps('name')} label='name: ' />
        <TextInput label='description:' {...form.getInputProps('description')} />
        <Group className='EditButtonGroup' position='right' mt='md'>
          <Button className='Client-EditButtonGroup'
            type='button' onClick={props.exitEdit}>
            Exit
          </Button>
          <Button className='Client-EditButtonGroup'
            type='submit'>Complete</Button>
        </Group>
      </form>
    </Box>
  );
}

export default IndividualClientsEdit;
