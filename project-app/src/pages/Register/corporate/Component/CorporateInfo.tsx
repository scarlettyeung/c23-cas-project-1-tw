import { Select, TextInput } from '@mantine/core';
import { IconBuildingSkyscraper, IconPhone, IconMail, IconMap2, Icon123, IconWorldWww, IconListDetails, IconCircleLetterG } from '@tabler/icons';
import '../../../../styles/register.css';

export type PerformData = {
	companyName: string;
	contact: string;
	// contactEmail: string
	businessAddress: string;
	bRNumber: string;
	website: string;
	description: string;
	gender: string;
	contactEmail: string;
};

type UserFormProps = PerformData & {
	updateFields: (fields: Partial<PerformData>) => void;
};

function CorporateInfo({
	companyName,
	contact,
	businessAddress,
	bRNumber,
	gender,
	website,
	description,
	contactEmail,
	updateFields,
}: UserFormProps) {
	return (
		<div>
			{/* <label>Company Name</label>
      <input autoFocus required type="text" value={companyName} onChange={e => updateFields({ companyName: e.target.value })} /> */}
			<TextInput
			icon={<IconBuildingSkyscraper size={20} />}
				size='lg'
				label='Company Name'
				className='register__input'
				autoFocus
				required
				type='text'
				value={companyName}
				onChange={(e) => updateFields({ companyName: e.target.value })}
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
			icon={<IconMap2 size={20} />}
			
				size='lg'
				className='register__input'
				label='Business Address'
				required
				min={1}
				type='text'
				value={businessAddress}
				onChange={(e) => updateFields({ businessAddress: e.target.value })}
			/>
			<TextInput
			icon={<Icon123 size={20} />}
				size='lg'
				className='register__input'
				label='BR Number'
				required
				min={1}
				type='text'
				value={bRNumber}
				onChange={(e) => updateFields({ bRNumber: e.target.value })}
			/>
			<TextInput
			icon={<IconWorldWww size={20} />}
				size='lg'
				className='register__input'
				label='Website'
				min={1}
				type='text'
				value={website}
				onChange={(e) => updateFields({ website: e.target.value })}
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
		</div>
	);
}

export default CorporateInfo;
