
import { useState } from "react";
import { PasswordInput, TextInput, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import "../../../styles/register.css"


export type BasicData = {
  email: string
  password: string
  password2: string
  username: string
}

type UserFormProps = Omit<BasicData, "password2"> & {
  updateFields: (fields: Partial<Omit<BasicData, "password2">>) => void
}

function BasicInfo({
  email,
  password,
  username, updateFields }: UserFormProps) {

  const [visible, { toggle }] = useDisclosure(false);
  const [psw, setPsw] = useState("");
  const [psw2, setPsw2] = useState("");
  const [errStatement, setErrStatement] = useState("");

  return (
    <>
      <div className="register-basicInfo-outerDiv">
        <Text style={{ fontSize: 25, marginBottom: 20 }}>Basic Information</Text>
        <TextInput size="lg" className="register-input" label='Email' autoFocus required type="email" value={email} onChange={e => updateFields({ email: e.target.value })} />
        <PasswordInput
          size="lg"
          className="register-input"
          label='Password'
          required
          minLength={8}
          maxLength={16}
          value={psw}
          onVisibilityChange={toggle}
          onChange={(e) => { setPsw(e.target.value) }}
        />
        <label></label>
        <PasswordInput
          size="lg"
          className="register-input"
          label='Confirm Password'
          required
          minLength={8}
          maxLength={16}
          error={errStatement}
          value={psw2}
          onVisibilityChange={toggle}
          onChange={(e) => {
            setPsw2(e.target.value)

            console.log("in", psw, e.target.value);
            if (psw === e.target.value) {
              console.log("Ok")
              password = e.target.value
              updateFields({ password: password })
              setErrStatement("")
            } else {
              setErrStatement("Invalid Password")
              updateFields({ password: '' })
            }
          }}
        />
        <TextInput size="lg" className="register-input" label='Username' required type="text" value={username} onChange={e => updateFields({ username: e.target.value })} />
      </div>
    </>
  )
}

export default BasicInfo