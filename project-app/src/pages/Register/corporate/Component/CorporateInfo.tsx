import { FormWrapper } from "../../registerComponent/FormWrapper";
enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}
export type PerformData = {
  companyName: string
  contact: string
  // contactEmail: string
  businessAddress: string
  bRNumber: string
  website: string
  description: string
  gender: string
  contactEmail: string
}

type UserFormProps = PerformData & {
  updateFields: (fields: Partial<PerformData>) => void
}

function CorporateInfo({ companyName, contact, businessAddress, bRNumber, gender, website, description, contactEmail, updateFields }: UserFormProps) {
  return (
    <FormWrapper title="User Details">
      <label>Company Name</label>
      <input autoFocus required type="text" value={companyName} onChange={e => updateFields({ companyName: e.target.value })} />
      <label>Contact Number</label>
      <input required type="text" value={contact} onChange={e => updateFields({ contact: e.target.value })} />
      <label>Contact Email</label>
      <input required type="email" value={contactEmail} onChange={e => updateFields({ contactEmail: e.target.value })} />
      <label>Business Address</label>
      <input required min={1} type="text" value={businessAddress} onChange={e => updateFields({ businessAddress: e.target.value })} />
      <label>BR Number</label>
      <input required min={1} type="text" value={bRNumber} onChange={e => updateFields({ bRNumber: e.target.value })} />
      <label>Website</label>
      <input min={1} type="text" value={website} onChange={e => updateFields({ website: e.target.value })} />
      <label>Description</label>
      <input min={1} type="text" value={description} onChange={e => updateFields({ description: e.target.value })} />
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

export default CorporateInfo
