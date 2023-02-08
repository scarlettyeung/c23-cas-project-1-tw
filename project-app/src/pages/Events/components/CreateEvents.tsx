import React, { useEffect, useRef, useState } from 'react';
import {
  Paper,
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  SimpleGrid,
  createStyles,
  NumberInput,
  Checkbox,
} from '@mantine/core';
import { TimeInput, DatePicker } from '@mantine/dates';
import { useForm } from 'react-hook-form';
import '../../../styles/event.css';
import { useNavigate } from 'react-router-dom';
import logger from 'redux-logger';

const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.fn.smallerThan('sm');

  return {
    wrapper: {
      display: 'flex',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      borderRadius: theme.radius.lg,
      padding: 4,
      border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]
        }`,

      [BREAKPOINT]: {
        flexDirection: 'column',
      },
    },

    form: {
      boxSizing: 'border-box',
      flex: 1,
      padding: theme.spacing.xl,
      paddingLeft: theme.spacing.xl * 2,
      borderLeft: 0,

      [BREAKPOINT]: {
        padding: theme.spacing.md,
        paddingLeft: theme.spacing.md,
      },
    },

    fields: {
      marginTop: -12,
    },

    fieldInput: {
      flex: 1,

      '& + &': {
        marginLeft: theme.spacing.md,

        [BREAKPOINT]: {
          marginLeft: 0,
          marginTop: theme.spacing.md,
        },
      },
    },

    fieldsGroup: {
      display: 'flex',

      [BREAKPOINT]: {
        flexDirection: 'column',
      },
    },

    contacts: {
      boxSizing: 'border-box',
      position: 'relative',
      borderRadius: theme.radius.lg - 2,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      border: '1px solid transparent',
      padding: theme.spacing.xl,
      flex: '0 0 280px',

      [BREAKPOINT]: {
        marginBottom: theme.spacing.sm,
        paddingLeft: theme.spacing.md,
      },
    },

    title: {
      marginBottom: theme.spacing.xl * 1.5,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.xl,
      },
    },

    control: {
      [BREAKPOINT]: {
        flex: 1,
      },
    },
  };
});

export function CreateEvents() {
  const { classes } = useStyles();
  const { register, handleSubmit } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [value, setValue] = useState(0);
  const [checked, setChecked] = useState(false);
  const [cardImage, setCardImage] = useState<File | undefined>();
  const [preview, setPreview] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (cardImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(cardImage);
    } else {
      setPreview(undefined);
    }
  }, [cardImage]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(async (data) => {
          const formData = new FormData();
          const path = process.env.REACT_APP_API_BASE;
          const jwt = localStorage.getItem('token');

          formData.append('title', data.title);
          formData.append('location', data.location);
          formData.append('wage_offer', value.toString());
          formData.append('start_date', startDate.toString());
          formData.append('end_date', endDate.toString());
          formData.append('start_time', startTime.toString());
          formData.append('end_time', endTime.toString());
          formData.append('description', data.description);
          formData.append('rehearsal_needed', data.rehearsal_needed);
          formData.append('cardImage', cardImage! as Blob);
          if (!cardImage || cardImage === undefined) {
            alert("PLEASE UPLOAD IMAGE!!")
          } else {
            const resp = await fetch(`${path}/events/createEvents`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
              body: formData,
            });
            const result = await resp.json();
            logger(result);
            console.log(result);
            alert('Create Event successfully!');
            navigate('/events');
          }



        })}
      >
        <Paper shadow='md' radius='lg'>
          <div className={classes.wrapper}>
            <Text size='lg' weight={700} className={classes.title}>
              Add Your Event Details
            </Text>
            <div className={classes.fields}>
              <div>
                {preview ? (
                  <img
                    alt='Upload cardImage'
                    src={preview}
                    width='300'
                    style={{ objectFit: 'cover' }}
                    onClick={() => {
                      setCardImage(undefined);
                    }}
                  />
                ) : (
                  <Button
                    className='events_createEvent_SubmitBtn'
                    onClick={(event) => {
                      event.preventDefault();
                      fileInputRef.current?.click();
                    }}
                  >
                    ADD IMAGE
                  </Button>
                )}
                <input
                  placeholder='Upload cardImage'
                  alt='Upload cardImage'
                  type='file'
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  accept='image/*'
                  onChange={(event: any) => {
                    const file = event.target.files[0];
                    if (file && file.type.substr(0, 5) === 'image') {
                      setCardImage(file);
                    } else {
                      setCardImage(undefined);
                    }
                  }}
                />
              </div>

              <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <TextInput
                  label='Event Title'
                  placeholder='Event Title'
                  required
                  {...register('title')}
                />
                <TextInput label='Location' placeholder='TST' required {...register('location')} />
                <NumberInput
                  label='Wage Offer'
                  defaultValue={1500}
                  required
                  value={value}
                  onChange={(val) => setValue(val!)}
                />
                <DatePicker
                  placeholder='Pick date'
                  label='Start date'
                  inputFormat='MM/DD/YYYY'
                  labelFormat='MM/YYYY'
                  required
                  defaultValue={new Date()}
                  value={startDate}
                  onChange={(e) => setStartDate(e!)}
                />
                <DatePicker
                  placeholder='Pick date'
                  label='End date'
                  inputFormat='MM/DD/YYYY'
                  labelFormat='MM/YYYY'
                  required
                  defaultValue={new Date()}
                  value={endDate}
                  onChange={(e) => setEndDate(e!)}
                />
                <TimeInput
                  label='Start time'
                  format='12'
                  defaultValue={new Date()}
                  value={startTime}
                  onChange={(e) => setStartTime(e!)}
                />
                <TimeInput
                  label='End time'
                  format='12'
                  defaultValue={new Date()}
                  value={endTime}
                  onChange={(e) => setEndTime(e!)}
                />
              </SimpleGrid>

              <Checkbox
                checked={checked}
                {...register('rehearsal_needed')}
                onChange={(event) => setChecked(event.currentTarget.checked)}
                label='Rehearsal need?'
              />

              <Textarea
                mt='md'
                label='Description '
                placeholder='Please include all information'
                minRows={3}
                {...register('description')}
              />

              <Group position='center' mt='md'>

                <Button
                  type='submit' className={((classes.control), 'events_createEvent_SubmitBtn')}>
                  Submit
                </Button>
              </Group>
            </div>
          </div>
        </Paper>
      </form>
    </div>
  );
}

export default CreateEvents;
