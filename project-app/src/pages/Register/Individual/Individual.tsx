import { FormEvent, useState } from "react"
import BasicInfo from "../registerComponent/BasicInfo"
import { useMultiStepForm } from "../../../models/useMultistepForm"
import IndividualInfo from "./Component/IndividualInfo"
import { useNavigate } from "react-router-dom"
import { useRootDispatch, useRootSelector } from "../../../redux/store"
import { checkPswValidation } from "../../../redux/auth/slice"
import { Button } from "@mantine/core"


type FormData = {
  email: string;
  password: string;
  password2: string;
  username: string;
  firstName: string;
  lastName: string;
  contact: string;
  gender: string;
  contactEmail: string;
};

const INITIAL_DATA: FormData = {
  email: '',
  password: '',
  password2: '',
  username: '',
  firstName: '',
  lastName: '',
  contact: '',
  gender: '',
  contactEmail: '',
};

function Individual() {
  const navigate = useNavigate();
  const dispatch = useRootDispatch();
  const typeOfAccount = useRootSelector((state) => state.auth.accountType);
  const [data, setData] = useState(INITIAL_DATA);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  let fetchAccType: string;
  if (typeOfAccount === 'individual') {
    fetchAccType = 'client';
  } else {
    fetchAccType = '';
  }

  const fetchData = {
    identitySelect: fetchAccType,
    clientType: typeOfAccount,
    email: data.email,
    password: data.password,
    username: data.username,
    name: data.firstName + '/' + data.lastName,
    contactNumber: Number(data.contact),
    contactEmail: data.contactEmail,
    gender: data.gender,
  };
  dispatch(checkPswValidation(data.password));
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultiStepForm([
    <BasicInfo {...data} updateFields={updateFields} />,
    <IndividualInfo {...data} updateFields={updateFields} />,
  ]);
  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    const path = process.env.REACT_APP_API_BASE;
    await fetch(`${path}users/createUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fetchData),
    });
    navigate('/');
  }

  return (
    <div>
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
          {!isFirstStep && <Button type="button" onClick={back}>Back</Button>}
          <Button type="submit" >{isLastStep ? "Submit" : "Next"}</Button>
        </div>
      </form>
    </div>
  )
}

export default Individual;
