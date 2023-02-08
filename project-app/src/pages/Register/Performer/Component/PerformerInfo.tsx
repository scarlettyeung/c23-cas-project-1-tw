import '../../../../styles/register.css';
import { Select, TextInput, Text, NumberInput } from '@mantine/core';
import { IconCircleLetterN, IconPhone, Icon123, IconMail, IconCircleLetterG,IconListDetails, IconBrandMeta, IconBrandYoutube, IconBrandTwitter, IconBrandInstagram } from '@tabler/icons';

export type PerformData = {
	firstName: string;
	lastName: string;
	experience: string;
	contact: string;
	birthday: string;
	description: string;
	gender: string;
	facebookURL: string;
	twitterURL: string;
	youtubeURL: string;
	igURL: string;
	contactEmail: string;
};

type UserFormProps = PerformData & {
	updateFields: (fields: Partial<PerformData>) => void;
};

function PerformerInfo({
	firstName,
	lastName,
	experience,
	contact,
	birthday,
	description,
	gender,
	facebookURL,
	twitterURL,
	youtubeURL,
	igURL,
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
				className='register__input'
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
				className='register__input'
				label='Last Name'
				required
				type='text'
				value={lastName}
				onChange={(e) => updateFields({ lastName: e.target.value })}
			/>
			<NumberInput
				icon={<Icon123 size={20} />}
				size='lg'
				placeholder='Enter Number of Years'
				className='register__input'
				label='Experience'
				required
				min={0}
				max={99}
				type='number'
				value={Number(experience)}
				onChange={(e) => updateFields({ experience: e!.toString() })}
			/>
			<TextInput
				icon={<IconPhone size={20} />}
				size='lg'
				className='register__input'
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
				className='register__input'
				label='Contact Email'
				type='email'
				value={contactEmail}
				onChange={(e) => updateFields({ contactEmail: e.target.value })}
			/>
			<TextInput
				size='lg'
				className='register__input'
				label='Birthday'
				required
				min={1}
				type='date'
				value={birthday}
				onChange={(e) =>
					updateFields({
						birthday: e.target.value,
					})
				}
			/>
			<Select
			icon={<IconCircleLetterG size={20} />}
				size='lg'
				className='register__input'
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
			<TextInput
			icon={<IconListDetails size={20}/>}
				size='lg'
				className='register__input'
				label='Description'
				aria-colcount={3}
				type='text'
				value={description}
				onChange={(e) => updateFields({ description: e.target.value })}
			/>
			<TextInput
			icon={<IconBrandMeta size={20}/>}
				size='lg'
				className='register__input'
				label='FaceBook Link'
				min={1}
				type='url'
				value={facebookURL}
				onChange={(e) => updateFields({ facebookURL: e.target.value })}
			/>
			<TextInput
			icon={<IconBrandTwitter size={20}/>}
				size='lg'
				className='register__input'
				label='Twitter Link'
				min={1}
				type='url'
				value={twitterURL}
				onChange={(e) => updateFields({ twitterURL: e.target.value })}
			/>
			<TextInput
			icon={<IconBrandYoutube size={20}/>}
				size='lg'
				className='register__input'
				label='YouTube Link'
				min={1}
				type='url'
				value={youtubeURL}
				onChange={(e) => updateFields({ youtubeURL: e.target.value })}
			/>
			<TextInput
			icon={<IconBrandInstagram size={20}/>}
				size='lg'
				className='register__input'
				label='Instagram Link'
				min={1}
				type='url'
				value={igURL}
				onChange={(e) => updateFields({ igURL: e.target.value })}
			/>
		</div>
	);
}

export default PerformerInfo;
