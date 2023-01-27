// import React, { useState } from "react";
// import { Select } from '@mantine/core';
// import { useRootDispatch } from "../../redux/store";
// import { Gender } from "../../redux/auth/state"
// import { DayPicker } from 'react-day-picker';
// import 'react-day-picker/dist/style.css';
// import { format } from "date-fns";

// import { performerThunk } from "../../redux/auth";


// function PerformerInfo() {
//   const dispatch = useRootDispatch()
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   let [experience, setExperience] = useState(0);
//   const [contact, setContact] = useState();
//   const [team, setTeam] = useState('');
//   const [birthday, setBirthday] = useState<Date>();
//   const [description, setDescription] = useState('');
//   const [gender, setGender] = useState<Gender>()
//   const [socialMedia, setSocialMedia] = useState('')
//   let footer = <p>Please pick a day.</p>;
//   if (birthday) {
//     footer = <p>You picked {format(birthday, 'PP')}.</p>;
//   }

//   function add() {
//     experience = experience + 1
//     setExperience(experience)
//   }

//   function minus() {
//     experience = experience - 1
//     setExperience(experience)
//   }

//   const handleInput = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // dispatch(performerThunk({ firstName, lastName, experience, contact, team, birthday, description, gender, socialMedia }));
//   }
//   return (
//     <>
//       <form>
//         <div>
//           <div><label>First Name</label></div>
//           <input
//             className='reg-firstName'
//             id='reg-firstName'
//             value={firstName}
//             type='text' />
//         </div>
//         <div>
//           <div><label>Last Name</label></div>
//           <input
//             className='reg-lastName'
//             id='reg-lastName'
//             value={lastName}
//             type='text' />
//         </div>
//         <div>
//           <Select
//             label="Gender"
//             placeholder="Choose One"
//             data={[
//               { value: Gender.Male, label: 'Male' },
//               { value: Gender.Female, label: 'Female' },
//               { value: Gender.Other, label: 'Other' },
//             ]}
//           />
//         </div>
//         <div>
//           <button onClick={add}>+</button>
//           <div>{experience}</div>
//           <button onClick={minus} ></button>
//         </div>
//         <div>
//           <DayPicker
//             mode="single"
//             selected={birthday}
//             onSelect={setBirthday}
//             footer={footer}
//           />
//         </div>
//         <div>
//           <div><label>Contact</label></div>
//           <input
//             className='reg-contact'
//             id='reg-contact'
//             value={contact}
//             type='text' />
//         </div>
//         <div>
//           <div><label>Team</label></div>
//           <input
//             className='reg-team'
//             id='reg-team'
//             value={team}
//             type='text' />
//         </div>
//         <div>
//           <div><label>Description</label></div>
//           <input
//             className='reg-description'
//             id='reg-description'
//             value={description}
//             type='text' />
//         </div>
//         <div>
//           <div><label>Social Media</label></div>
//           <input
//             className='reg-social'
//             id='reg-social'
//             value={socialMedia}
//             type='text' />
//         </div>
//         <div>

//         </div>
//       </form>
//     </>
//   )
// }

// export default PerformerInfo

import { FormWrapper } from "./FormWrapper";

type PerformData = {
  firstName: string
  lastName: string
  age: string
  experience: string
  contact: string
  team: string
  birthday: string
  description: string
  gender: string
  facebookURL: string
  twitterURL: string
  youtubeURL: string
}

type UserFormProps = PerformData & {
  updateFields: (fields: Partial<PerformData>) => void
}

function PerformerInfo({ firstName, lastName, age, experience, contact, team, birthday, description, gender, facebookURL, twitterURL, youtubeURL, updateFields }: UserFormProps) {
  return (
    <FormWrapper title="User Details">
      <label>First Name</label>
      <input autoFocus required type="text" value={firstName} onChange={e => updateFields({ firstName: e.target.value })} />
      <label>Last Name</label>
      <input required type="text" value={lastName} onChange={e => updateFields({ lastName: e.target.value })} />
      <label>Age</label>
      <input required min={1} type="number" value={age} onChange={e => updateFields({ age: e.target.value })} />
      <label>Experience</label>
      <input required min={1} type="number" value={experience} onChange={e => updateFields({ experience: e.target.value })} />
      <label>Contact</label>
      <input required min={1} type="number" value={contact} onChange={e => updateFields({ contact: e.target.value })} />
      <label>Team</label>
      <input required min={1} type="text" value={team} onChange={e => updateFields({ team: e.target.value })} />
      <label>Birthday</label>
      <input required min={1} type="text" value={birthday} onChange={e => updateFields({ birthday: e.target.value })} />
      <label>Description</label>
      <input required min={1} type="text" value={description} onChange={e => updateFields({ description: e.target.value })} />
      <label>Gender</label>
      <input required min={1} type="text" value={gender} onChange={e => updateFields({ gender: e.target.value })} />
      <label>Facebook URL</label>
      <input required min={1} type="text" value={facebookURL} onChange={e => updateFields({ facebookURL: e.target.value })} />
      <label>Twitter URL</label>
      <input required min={1} type="text" value={twitterURL} onChange={e => updateFields({ twitterURL: e.target.value })} />
      <label>YouTube URL</label>
      <input required min={1} type="text" value={youtubeURL} onChange={e => updateFields({ youtubeURL: e.target.value })} />

    </FormWrapper>
  )
}

export default PerformerInfo


