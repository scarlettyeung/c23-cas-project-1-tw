import { FormWrapper } from "../../registerComponent/FormWrapper";
import "../../../../styles/register.css"


enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}



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
    <FormWrapper title="User Details">
      <label>First Name</label>
      <input autoFocus required type="text" value={firstName} onChange={e => updateFields({ firstName: e.target.value })} />
      <label>Last Name</label>
      <input required type="text" value={lastName} onChange={e => updateFields({ lastName: e.target.value })} />
      <label>Experience</label>
      <input required min={1} type="number" value={experience} onChange={e => updateFields({ experience: e.target.value })} />
      <label>Contact Number</label>
      <input required min={1} type="number" minLength={8} maxLength={8} value={contact} onChange={e => updateFields({ contact: e.target.value })} />
      <label>Contact Email</label>
      <input required type="email" value={contactEmail} onChange={e => updateFields({ contactEmail: e.target.value })} />
      <label>Birthday</label>
      <input required min={1} type="date" value={birthday} onChange={e => updateFields({ birthday: e.target.value })} />
      <label>Description</label>
      <input aria-colcount={3} type="text" value={description} onChange={e => updateFields({ description: e.target.value })} />
      <label>Gender</label>
      <select className="select" onChange={(e) => {
        gender = e.target.value;
        updateFields({ gender: e.target.value })
      }}>
        <option value={Gender.Male}>Male</option>
        <option value={Gender.Female}>Female</option>
        <option value={Gender.Other}>Other</option>
      </select>
      <label>Facebook Link</label>
      <input min={1} type="url" value={facebookURL} onChange={e => updateFields({ facebookURL: e.target.value })} />
      <label>Twitter Link</label>
      <input min={1} type="url" value={twitterURL} onChange={e => updateFields({ twitterURL: e.target.value })} />
      <label>YouTube Link</label>
      <input min={1} type="url" value={youtubeURL} onChange={e => updateFields({ youtubeURL: e.target.value })} />
      <label>Instagram Link</label>
      <input min={1} type="url" value={igURL} onChange={e => updateFields({ igURL: e.target.value })} />
    </FormWrapper>
  )
}

export default PerformerInfo


