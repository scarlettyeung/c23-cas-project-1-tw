import React, { useRef, useState } from 'react';
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
// import { Dropzone } from '@mantine/dropzone';
import { TimeInput, DatePicker } from '@mantine/dates';
import { useForm } from 'react-hook-form';

const useStyles = createStyles((theme) => {
	const BREAKPOINT = theme.fn.smallerThan('sm');

	return {
		wrapper: {
			display: 'flex',
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
			borderRadius: theme.radius.lg,
			padding: 4,
			border: `1px solid ${
				theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]
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
	// const openRef = useRef<() => void>(null);

	return (
		<div>
			<form
				onSubmit={handleSubmit(async (data) => {
					const formData = new FormData();
					const path = process.env.REACT_APP_API_BASE;
					const jwt = localStorage.getItem('token');

					formData.append('title', data.title);
					formData.append('location', data.location);
					formData.append('wage_offer', data.wage_offer);
					formData.append('start_date', startDate.toString());
					formData.append('end_date', endDate.toString());
					formData.append('start_time', startTime.toString());
					formData.append('end_time', endTime.toString());
					formData.append('description', data.description);
					formData.append('rehearsal_needed', data.rehearsal_needed);

					console.log('========FORM DATA======', data.title);
					console.log('========FORM DATA======', data.location);
					console.log('========FORM DATA======', value.toString());
					console.log('========FORM DATA======', startDate.toString());
					console.log('========FORM DATA======', endDate.toString());
					console.log('========FORM DATA======', startTime.toString());
					console.log('========FORM DATA======', endTime.toString());
					console.log('========FORM DATA======', data.description);
					console.log('========FORM DATA======', checked);

					await fetch(`${path}events/createEvents`, {
						method: 'POST',
						headers: {
							Authorization: `Bearer ${jwt}`,
						},
						body: formData,
					});
				})}
			>
				<Paper shadow='md' radius='lg'>
					<div className={classes.wrapper}>
						{/* {image?.[0] && (
							<img
								className='avatar'
								width='100'
								alt='Upload Event Photo'
								src={URL.createObjectURL(image[0])}
							/>
						)} */}
						<Text size='lg' weight={700} className={classes.title}>
							Add Your Event Details
						</Text>

						<div className={classes.fields}>
							{/* <Dropzone
								className={classes.fields}
								openRef={openRef}
								onDrop={() => {}}
								activateOnClick={false}
								styles={{ inner: { pointerEvents: 'all' } }}
								{...register('image')}
							>
								<Group position='center'>
									<Button
										onClick={() => {
											const fn = openRef?.current;
											if (fn) fn();
										}}
									>
										Select files
									</Button>
								</Group>
							</Dropzone> */}

							{/* <input className={classes.fields} type='file' {...register('image')} /> */}

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

							<Group position='right' mt='md'>
								<Button type='submit' className={classes.control}>
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
