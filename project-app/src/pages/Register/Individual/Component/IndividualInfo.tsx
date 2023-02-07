import { Select, TextInput, Text } from '@mantine/core';
import { IconCircleLetterG, IconCircleLetterN, IconMail, IconPhone } from '@tabler/icons';
// enum Gender {
//   Male = "male",
//   Female = "female",
//   Other = "other"
// }

export type PerformData = {
	firstName: string;
	lastName: string;
	gender: string;
	contact: string;
	contactEmail: string;
};

type UserFormProps = PerformData & {
	updateFields: (fields: Partial<PerformData>) => void;
};

function IndividualInfo({
	firstName,
	lastName,
	contact,
	gender,
	contactEmail,
	updateFields,
}: UserFormProps) {
	return (
		<div>
			<Text style={{ fontSize: 25, marginBottom: 20 }}>Detail Information</Text>
			<TextInput
			icon={<IconCircleLetterN size={20} />}
				size='lg'
				placeholder='Enter Your First Name'
				className='register-input'
				label='First Name'
				autoFocus
				required
				type='text'
				value={firstName}
				onChange={(e) => updateFields({ firstName: e.target.value })}
			/>
			<TextInput
			icon={<IconCircleLetterN size={20} />}
				size='lg'
				placeholder='Enter Your Last Name'
				className='register-input'
				label='Last Name'
				required
				type='text'
				value={lastName}
				onChange={(e) => updateFields({ lastName: e.target.value })}
			/>
			<TextInput
			icon={<IconPhone size={20} />}
				size='lg'
				className='register-input'
				label='Contact Number'
				required
				min={1}
				max={99999999}
				type='tel'
				minLength={8}
				maxLength={8}
				value={contact}
				onChange={(e) => updateFields({ contact: e.target.value })}
			/>
			<TextInput
			icon={<IconMail size={20} />}
				size='lg'
				className='register-input'
				label='Contact Email'
				type='email'
				value={contactEmail}
				onChange={(e) => updateFields({ contactEmail: e.target.value })}
			/>
			<Select
			icon={<IconCircleLetterG size={20} />}
				size='lg'
				className='register-input'
				required
				label='Gender'
				data={[
					{ value: 'male', label: 'Male' },
					{ value: 'female', label: 'Female' },
					{ value: 'other', label: 'Other' },
				]}
				onChange={(e) => {
					gender = e!;
					updateFields({ gender: e! });
				}}
			/>
		</div>
	);
}

export default IndividualInfo;
