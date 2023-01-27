import { FormEvent, useState } from "react"
import { useRootDispatch } from "../redux/store"
import BasicInfo from "../components/registerComponent/BasicInfo"
// import { AddressForm } from "./AddressForm"
import { useMultiStepForm } from "../models/useMultistepForm"
import PerformerHash from "../components/registerComponent/PerformerHash"
import PerformerInfo from "../components/registerComponent/PerformerInfo"
// import { UserForm } from "./UserForm"

type FormData = {
  icon: string
  email: string
  password: string
  password2: string
  username: string
  tagId: number | null
  // firstName: string
  // lastName: string
  // age: string
  // experience: string
  // contact: string
  // team: string
  // birthday: string
  // description: string
  // gender: string
  // faceBookURL: string
  // twitterURL: string
  // youtubeURL: string
}


const INITIAL_DATA: FormData = {

  icon: '',
  email: '',
  password: '',
  password2: '',
  username: '',
  tagId: null,
  // firstName: '',
  // lastName: '',
  // age: '',
  // experience: '',
  // contact: '',
  // team: '',
  // birthday: '',
  // description: '',
  // gender: '',
  // faceBookURL: '',
  // twitterURL: '',
  // youtubeURL: ''

}

function Performer() {
  const dispatch = useRootDispatch
  const [data, setData] = useState(INITIAL_DATA)
  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultiStepForm([<BasicInfo {...data} updateFields={updateFields} />])
  // [<PerformerInfo{...data} updateFields={updateFields} />]
  // [<BasicInfo {...data} updateFields={updateFields} />]
  // [<PerformerHash {...data} updateFields={updateFields} />]
  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isLastStep) return next()
    // dispatch

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
      <form onSubmit={onSubmit}>
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
          <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
        </div>
      </form>
    </div>
  )
}

export default Performer

