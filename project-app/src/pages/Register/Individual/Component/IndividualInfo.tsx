import { FormWrapper } from "../../registerComponent/FormWrapper";

enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export type PerformData = {
  firstName: string
  lastName: string
  gender: string
  contact: string
  contactEmail: string
}

type UserFormProps = PerformData & {
  updateFields: (fields: Partial<PerformData>) => void
}

function IndividualInfo({ firstName, lastName, contact, gender, contactEmail, updateFields }: UserFormProps) {
  return (
    <FormWrapper title="User Details">
      <label>First Name</label>
      <input autoFocus required type="text" value={firstName} onChange={e => updateFields({ firstName: e.target.value })} />
      <label>Last Name</label>
      <input required type="text" value={lastName} onChange={e => updateFields({ lastName: e.target.value })} />
      <label>Contact Number</label>
      <input required min={1} type="tel" value={contact} onChange={e => updateFields({ contact: e.target.value })} />
      <label>Contact Email</label>
      <input required type="email" value={contactEmail} onChange={e => updateFields({ contactEmail: e.target.value })} />
      <label>Gender</label>
      <select className="select" onChange={(e) => {
        gender = e.target.value;
        updateFields({ gender: e.target.value })
      }}>
        <option value={Gender.Male}>Male</option>
        <option value={Gender.Female}>Female</option>
        <option value={Gender.Other}>Other</option>
      </select>
    </FormWrapper>
  )
}

export default IndividualInfo
