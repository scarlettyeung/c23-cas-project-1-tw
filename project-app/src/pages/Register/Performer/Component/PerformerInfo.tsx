import "../../../../styles/register.css"
import { Select, TextInput, Text } from "@mantine/core";

export type PerformData = {
  firstName: string
  lastName: string
  experience: string
  contact: string
  birthday: string
  description: string
  gender: string
  facebookURL: string
  twitterURL: string
  youtubeURL: string
  igURL: string
  contactEmail: string
}

type UserFormProps = PerformData & {
  updateFields: (fields: Partial<PerformData>) => void
}

function PerformerInfo({ firstName, lastName, experience, contact, birthday, description, gender, facebookURL, twitterURL, youtubeURL, igURL, contactEmail, updateFields }: UserFormProps) {

  return (
    <div>
      <Text style={{ fontSize: 25, marginBottom: 20 }}>Detail Information</Text>
      <TextInput placeholder="Enter Your First Name" className="register-performerInfo-input" label='First Name' autoFocus required type="text" value={firstName} onChange={e => updateFields({ firstName: e.target.value })} />
      <TextInput placeholder="Enter Your Last Name" className="register-performerInfo-input" label='Last Name' required type="text" value={lastName} onChange={e => updateFields({ lastName: e.target.value })} />
      <TextInput placeholder="Enter Number of Years" className="register-performerInfo-input" label='Experience' required min={0} max={100} type="number" value={experience} onChange={e => updateFields({ experience: e.target.value })} />
      <TextInput className="register-performerInfo-input" label='Contact Number' required min={1} max={99999999} type="tel" minLength={8} maxLength={8} value={contact} onChange={e => updateFields({ contact: e.target.value })} />
      <TextInput className="register-performerInfo-input" label="Contact Email" type="email" value={contactEmail} onChange={e => updateFields({ contactEmail: e.target.value })} />
      <TextInput className="register-performerInfo-input" label='Birthday' required min={1} type="date" value={birthday} onChange={e => updateFields({ birthday: e.target.value })} />
      <Select
        className="register-performerInfo-input"
        required
        label="Gender"
        placeholder="Choose Your Gender"
        data={[{ value: "male", label: "Male" }, { value: "female", label: "Female" }, { value: "other", label: "Other" }]}
        onChange={(e) => {
          gender = e!
          // console.log(typeof e);
          updateFields({ gender: e! })
        }} />
      <TextInput className="register-performerInfo-input" label='Description' aria-colcount={3} type="text" value={description} onChange={e => updateFields({ description: e.target.value })} />
      {/* <label>Gender</label> */}
      {/* <select className="select" onChange={(e) => {
        gender = e.target.value;
        updateFields({ gender: e.target.value })
      }}>
        <option value={Gender.Male}>Male</option>
        <option value={Gender.Female}>Female</option>
        <option value={Gender.Other}>Other</option>
      </select> */}
      <TextInput className="register-performerInfo-input" label='FaceBook Link' min={1} type="url" value={facebookURL} onChange={e => updateFields({ facebookURL: e.target.value })} />
      <TextInput className="register-performerInfo-input" label='Twitter Link' min={1} type="url" value={twitterURL} onChange={e => updateFields({ twitterURL: e.target.value })} />
      <TextInput className="register-performerInfo-input" label='YouTube Link' min={1} type="url" value={youtubeURL} onChange={e => updateFields({ youtubeURL: e.target.value })} />
      <TextInput className="register-performerInfo-input" label='Instagram Link' min={1} type="url" value={igURL} onChange={e => updateFields({ igURL: e.target.value })} />
    </div>
  )
}

export default PerformerInfo


