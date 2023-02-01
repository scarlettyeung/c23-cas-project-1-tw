import { FormEvent, useState } from "react"
import BasicInfo from "../registerComponent/BasicInfo"
import { useMultiStepForm } from "../../../models/useMultistepForm"
import CorporateInfo from "./Component/CorporateInfo"
import { useNavigate } from "react-router-dom"
import { useRootDispatch, useRootSelector } from "../../../redux/store"
import { checkPswValidation } from "../../../redux/auth/slice"

// import { UserForm } from "./UserForm"

type FormData = {
  email: string
  password: string
  password2: string
  username: string
  companyName: string
  contact: string
  // contactEmail: string
  businessAddress: string
  bRNumber: string
  website: string
  description: string
  gender: string
}


const INITIAL_DATA: FormData = {

  email: '',
  password: '',
  password2: '',
  username: '',
  companyName: '',
  contact: '',
  businessAddress: '',
  bRNumber: '',
  website: '',
  description: '',
  gender: '',
}

function Corporate() {
  const navigate = useNavigate()
  const dispatch = useRootDispatch()
  const typeOfAccount = useRootSelector((state) => state.auth.accountType);
  console.log('typeeeeeeeeeeeee', typeOfAccount);

  const [data, setData] = useState(INITIAL_DATA)
  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }
  let fetchAccType: string
  if (typeOfAccount === 'corporate') {
    fetchAccType = 'client'
  }
  else {
    fetchAccType = ''
  }
  const fetchData = {
    identitySelect: fetchAccType,
    clientType: typeOfAccount,
    email: data.email,
    password: data.password,
    username: data.username,
    name: data.companyName,
    contactNumber: Number(data.contact),
    contactEmail: data.email,
    businessBRNo: data.bRNumber,
    businessWebsiteUrl: data.website,
    description: data.description,
    gender: data.gender,
    businessAddress: data.businessAddress
  }
  dispatch(checkPswValidation(data.password))
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultiStepForm([<BasicInfo {...data} updateFields={updateFields} />, <CorporateInfo{...data} updateFields={updateFields} />])
  // [<CorporateInfo{...data} updateFields={updateFields} />]
  // [<BasicInfo {...data} updateFields={updateFields} />]
  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isLastStep) return next()
    const path = process.env.REACT_APP_API_BASE;
    await fetch(`${path}users/createUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fetchData),
    })
    navigate('/')
  }

  return (
    <div style={{
      position: "relative",
      background: "white",
      border: "1px solid black",
      padding: "2rem",
      margin: "1rem",
      borderRadius: ".5rem",
      fontFamily: "Arial",
      maxWidth: "max-content",
    }}>
      <form onSubmit={onSubmit} >
        <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div style={{
          marginTop: "1rem",
          display: "flex",
          gap: ".5rem",
          justifyContent: "flex-end",
        }}>
          {!isFirstStep && <button type="button" onClick={back}>Back</button>}
          <button type="submit">{isLastStep ? "Submit" : "Next"}</button>
        </div>
      </form>
    </div>
  )
}

export default Corporate

