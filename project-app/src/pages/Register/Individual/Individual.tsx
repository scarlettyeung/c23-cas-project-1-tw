import { FormEvent, useState } from "react"
import BasicInfo from "../registerComponent/BasicInfo"
// import { AddressForm } from "./AddressForm"
import { useMultiStepForm } from "../../../models/useMultistepForm"
import IndividualInfo from "./Component/IndividualInfo"

// import { UserForm } from "./UserForm"

type FormData = {
  email: string
  password: string
  password2: string
  username: string
  firstName: string
  lastName: string
  contact: string
  gender: Gender | null

}
enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

const INITIAL_DATA: FormData = {

  email: '',
  password: '',
  password2: '',
  username: '',
  firstName: '',
  lastName: '',
  contact: '',
  gender: null,
}

function Individual() {
  const [data, setData] = useState(INITIAL_DATA)
  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultiStepForm([<BasicInfo {...data} updateFields={updateFields} />, <IndividualInfo{...data} updateFields={updateFields} />])
  // [<IndividualInfo{...data} updateFields={updateFields} />]
  // [<BasicInfo {...data} updateFields={updateFields} />]
  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isLastStep) return next()

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

export default Individual

