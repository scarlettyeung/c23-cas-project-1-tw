import { FormEvent, useState } from "react"
// import { useRootDispatch } from "../../redux/store"
// import { AccountForm } from "./AccountForm"
// import { AddressForm } from "./AddressForm"
// import { useMultiStepForm } from "./useMultistepForm"
// import { UserForm } from "./UserForm"

// type FormData = {
//   // firstName: string
//   // lastName: string
//   // age: string
//   // street: string
//   // city: string
//   // state: string
//   // zip: string
//   // email: string
//   // password: string
//   email: string
//   password: string
//   password2: string
//   username: string
//   tagId: string
//   firstName: string
//   lastName: string
//   experience: string
// }


// const INITIAL_DATA: FormData = {
//   // firstName: "",
//   // lastName: "",
//   // age: "",
//   // street: "",
//   // city: "",
//   // state: "",
//   // zip: "",
//   // email: "",
//   // password: "",
//   icon:'',
//   email: '',
//   password: '',
//   password2: '',
//   username: '',
//   tagId: '',
//   firstName: '',
//   lastName: '',
//   experience: '',
//   contact: '',
//   team: '',
//   birthday: '',
//   description: '',
//   gender: '',
//   faceBookURL: '',
//   twitterURL: '',

// }

// function Performer() {
//   const dispatch = useRootDispatch
//   const [data, setData] = useState(INITIAL_DATA)
//   function updateFields(fields: Partial<FormData>) {
//     setData(prev => {
//       return { ...prev, ...fields }
//     })
//   }

//   const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultiStepForm([<UserForm {...data} updateFields={updateFields} />, <AddressForm {...data} updateFields={updateFields} />, <AccountForm {...data} updateFields={updateFields} />])

//   function onSubmit(e: FormEvent) {
//     e.preventDefault()
//     if (!isLastStep) return next()
//     // dispatch

//   }

//   return <div style={{
//     position: "relative",
//     background: "white",
//     border: "1px solid black",
//     padding: "2rem",
//     margin: "1rem",
//     borderRadius: ".5rem",
//     fontFamily: "Arial",
//     maxWidth: "max-content",
//   }}>
//     <form onSubmit={onSubmit}>
//       <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
//         {currentStepIndex + 1} / {steps.length}
//       </div>
//       {step}
//       <div style={{
//         marginTop: "1rem",
//         display: "flex",
//         gap: ".5rem",
//         justifyContent: "flex-end",
//       }}>
//         {!isFirstStep && <button type="button" onClick={back}>Back</button>}
//         <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
//       </div>
//     </form>
//   </div>
// }

// export default Performer