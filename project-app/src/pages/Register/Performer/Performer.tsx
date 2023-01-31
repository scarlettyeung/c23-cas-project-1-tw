import { FormEvent, useState } from "react"

import BasicInfo, { BasicData } from "../registerComponent/BasicInfo"
// import { AddressForm } from "./AddressForm"
import { useMultiStepForm } from "../../../models/useMultistepForm"
import PerformerHash from "./Component/PerformerHash"
import PerformerInfo from "./Component/PerformerInfo"
import { useRootDispatch } from "../../../redux/store"
import { performerThunk } from "../../../redux/auth/thunk"
// import { UserForm } from "./UserForm"
enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

type FormData = {
  email: string
  password: string
  // password2: string
  username: string
  tagId: number[] | null
  firstName: string
  lastName: string
  age: string
  experience: string
  contact: string
  team: string
  birthday: string
  description: string
  gender: Gender | null
  facebookURL: string
  twitterURL: string
  youtubeURL: string
  igURL: string
}


const INITIAL_DATA: FormData = {
  email: '',
  password: '',
  // password2: '',
  username: '',
  tagId: null,
  firstName: '',
  lastName: '',
  age: '',
  experience: '',
  contact: '',
  team: '',
  birthday: '',
  description: '',
  gender: null,
  facebookURL: '',
  twitterURL: '',
  youtubeURL: '',
  igURL: ''

}

function Performer() {
  const dispatch = useRootDispatch
  const [data, setData] = useState(INITIAL_DATA)
  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultiStepForm([<BasicInfo {...data} updateFields={updateFields} />, <PerformerHash {...data} updateFields={updateFields} />, <PerformerInfo {...data} updateFields={updateFields} />])
  // [<PerformerInfo{...data} updateFields={updateFields} />]
  // [<BasicInfo {...data} updateFields={updateFields} />]
  // [<PerformerHash {...data} updateFields={updateFields} />]
  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isLastStep) return next();
    // if ((data.password = data.password2) && data.tagId !== null) {
    //   // dispatch(performerThunk({ data }))
    // }

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

export default Performer

