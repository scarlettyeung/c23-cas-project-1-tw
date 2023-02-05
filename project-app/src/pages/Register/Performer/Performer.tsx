import { FormEvent, useState } from "react"

import BasicInfo from "../registerComponent/BasicInfo"
import { useMultiStepForm } from "../../../models/useMultistepForm"
import PerformerHash from "./Component/PerformerHash"
import PerformerInfo from "./Component/PerformerInfo"
import { useRootDispatch, useRootSelector } from "../../../redux/store"

import { useNavigate } from "react-router-dom"
import { checkHashValidation, checkPswValidation } from "../../../redux/auth/slice"

import "../../../styles/register.css"


export type FormData = {
  email: string
  password: string
  username: string
  tagId: number[] | null
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


const INITIAL_DATA: FormData = {
  email: '',
  password: '',
  username: '',
  tagId: null,
  firstName: '',
  lastName: '',
  experience: '',
  contact: '',
  birthday: '',
  description: '',
  gender: '',
  facebookURL: '',
  twitterURL: '',
  youtubeURL: '',
  igURL: '',
  contactEmail: ''

}

function Performer() {
  const navigate = useNavigate()
  const dispatch = useRootDispatch()
  const typeOfAccount = useRootSelector((state) => state.auth.accountType);
  console.log("I got you", typeOfAccount);

  const [data, setData] = useState(INITIAL_DATA)
  console.log(data);

  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }
  let fetchAccType: string
  if (typeOfAccount === 'performer') {
    fetchAccType = 'performer'
  }
  else {
    fetchAccType = ''
  }

  // console.log('Got fetch', fetchAccType)
  const fetchData = {
    identitySelect: fetchAccType,
    email: data.email,
    password: data.password,
    username: data.username,
    hashtagArr: data.tagId,
    name: data.firstName + "/" + data.lastName,
    yearsOfExp: Number(data.experience),
    contactNumber: Number(data.contact),
    contactEmail: data.contactEmail,
    birthday: (new Date(data.birthday)),
    description: data.description,
    gender: data.gender,
    facebookURL: data.facebookURL,
    twitterURL: data.twitterURL,
    youtubeURL: data.youtubeURL,
    igURL: data.igURL

  }
  // console.log(fetchData);





  dispatch(checkPswValidation(data.password))
  dispatch(checkHashValidation(data.tagId))

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultiStepForm([<BasicInfo {...data} updateFields={updateFields} />, <PerformerHash {...data} updateFields={updateFields} />, <PerformerInfo {...data} updateFields={updateFields} />])


  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isLastStep) return next();
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
    <div>
      <form onSubmit={onSubmit} className="register-performer-outerDiv">

        <div style={{ marginTop: 70, fontSize: 30, fontWeight: "bold", marginBottom: 20 }}>Performer Registration</div>
        {step}
        <div style={{
          marginTop: "3vh",
          marginBottom: "10vh"
        }}>
          <div className="register-user-backPageSubmit">
            {!isFirstStep ? <button className="register-user-back" type="button" onClick={back}>Back</button> : <button className="register-back-none">Back</button>}
            <a className="register-performer-pageShow">
              {currentStepIndex + 1} / {steps.length}
            </a>
            <button className="register-user-nextAndSubmit" type="submit" >{isLastStep ? "Submit" : "Next"}</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Performer

