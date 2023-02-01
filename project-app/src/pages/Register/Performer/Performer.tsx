import { FormEvent, useState } from "react"

import BasicInfo from "../registerComponent/BasicInfo"
import { useMultiStepForm } from "../../../models/useMultistepForm"
import PerformerHash from "./Component/PerformerHash"
import PerformerInfo from "./Component/PerformerInfo"
import { useRootDispatch, useRootSelector } from "../../../redux/store"

import { useNavigate } from "react-router-dom"
import { checkHashValidation, checkPswValidation } from "../../../redux/auth/slice"



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
  igURL: ''

}

function Performer() {
  const navigate = useNavigate()
  const dispatch = useRootDispatch()
  const typeOfAccount = useRootSelector((state) => state.auth.accountType);
  console.log("I got you", typeOfAccount);

  const [data, setData] = useState(INITIAL_DATA)

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
    contactEmail: data.email,
    birthday: (new Date(data.birthday)),
    description: data.description,
    gender: data.gender,
    facebookURL: data.facebookURL,
    twitterURL: data.twitterURL,
    youtubeURL: data.youtubeURL,
    igURL: data.igURL
  }




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
          <button type="submit" >{isLastStep ? "Submit" : "Next"}</button>
        </div>
      </form>
    </div>
  )
}

export default Performer

