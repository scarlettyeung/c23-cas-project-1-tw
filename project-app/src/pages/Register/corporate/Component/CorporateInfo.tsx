import { Select, TextInput } from "@mantine/core";
import "../../../../styles/register.css"
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
    <div>
      {/* <label>Company Name</label>
      <input autoFocus required type="text" value={companyName} onChange={e => updateFields({ companyName: e.target.value })} /> */}
      <TextInput size="lg" label='Company Name' placeholder="Enter Your Company Name" className="register-input" autoFocus required type="text" value={companyName} onChange={e => updateFields({ companyName: e.target.value })} />
      <TextInput size="lg" className="register-input" label='Contact Number' required min={1} max={99999999} type="tel" minLength={8} maxLength={8} value={contact} onChange={e => updateFields({ contact: e.target.value })} />
      <TextInput size="lg" className="register-input" label="Contact Email" type="email" value={contactEmail} onChange={e => updateFields({ contactEmail: e.target.value })} />
      <TextInput size="lg" className="register-input" label='Business Address' required min={1} type="text" value={businessAddress} onChange={e => updateFields({ businessAddress: e.target.value })} />
      <TextInput size="lg" className="register-input" label='BR Number' required min={1} type="text" value={bRNumber} onChange={e => updateFields({ bRNumber: e.target.value })} />
      <TextInput size="lg" className="register-input" label='Website' min={1} type="text" value={website} onChange={e => updateFields({ website: e.target.value })} />
      <TextInput size="lg" className="register-input" label='Description' aria-colcount={3} type="text" value={description} onChange={e => updateFields({ description: e.target.value })} />
      <Select
        size="lg"
        className="register-input"
        required
        label="Gender"
        placeholder="Choose Your Gender"
        data={[{ value: "male", label: "Male" }, { value: "female", label: "Female" }, { value: "other", label: "Other" }]}
        onChange={(e) => {
          gender = e!
          updateFields({ gender: e! })
        }} />
    </div>
  )
}

export default CorporateInfo
