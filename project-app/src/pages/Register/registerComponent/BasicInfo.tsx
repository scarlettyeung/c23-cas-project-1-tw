import { FormWrapper } from "./FormWrapper";
import React, { useState } from "react";
import { PasswordInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { setDefaultResultOrder } from "dns";


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
      <FormWrapper title="">
        <label>Email</label>
        <input autoFocus required type="email" value={email} onChange={e => updateFields({ email: e.target.value })} />
        <label>Password</label>
        <PasswordInput
          required
          minLength={8}
          maxLength={16}
          value={psw}
          onVisibilityChange={toggle}
          onChange={(e) => { setPsw(e.target.value) }}
        />
        <label>Confirm Password</label>
        <PasswordInput
          required
          minLength={8}
          maxLength={16}
          error={errStatement}
          value={psw2}
          onVisibilityChange={toggle}
          onChange={(e) => {
            setPsw2(e.target.value)
            // console.log(isValid);
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
        <label>Username</label>
        <input required type="text" value={username} onChange={e => updateFields({ username: e.target.value })} />
      </FormWrapper>
    </>
  )
}

export default BasicInfo