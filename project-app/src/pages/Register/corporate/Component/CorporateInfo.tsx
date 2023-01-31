import { FormWrapper } from "../../registerComponent/FormWrapper";

export type PerformData = {
  companyName: string
  contactNumber: string
  contactEmail: string
  businessAddress: string
  bRNumber: string
  website: string
  description: string

}

type UserFormProps = PerformData & {
  updateFields: (fields: Partial<PerformData>) => void
}

function CorporateInfo({ companyName, contactNumber, contactEmail, businessAddress, bRNumber, website, description, updateFields }: UserFormProps) {
  return (
    <FormWrapper title="User Details">
      <label>Company Name</label>
      <input autoFocus required type="text" value={companyName} onChange={e => updateFields({ companyName: e.target.value })} />
      <label>Contact Number</label>
      <input required type="text" value={contactNumber} onChange={e => updateFields({ contactNumber: e.target.value })} />
      <label>Contact Email</label>
      <input required min={1} type="tel" value={contactEmail} onChange={e => updateFields({ contactEmail: e.target.value })} />
      <label>Business Address</label>
      <input required min={1} type="text" value={businessAddress} onChange={e => updateFields({ businessAddress: e.target.value })} />
      <label>BR Number</label>
      <input required min={1} type="text" value={bRNumber} onChange={e => updateFields({ bRNumber: e.target.value })} />
      <label>Website</label>
      <input required min={1} type="text" value={website} onChange={e => updateFields({ website: e.target.value })} />
      <label>Description</label>
      <input required min={1} type="text" value={description} onChange={e => updateFields({ description: e.target.value })} />
    </FormWrapper>
  )
}

export default CorporateInfo
