// import React, { useState } from "react";
// import { allUsersP1 } from "../../redux/auth";
// import { useRootDispatch } from '../../redux/store';

// function BasicInfo() {

//   const dispatch = useRootDispatch()
//   const [regEmail, setRegEmail] = useState('');
//   const [regPassword, setRegPassword] = useState('');
//   const [regPassword2, setRegPassword2] = useState('');
//   const [regUsername, setRegUsername] = useState('');

//   const handleInput = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     dispatch(allUsersP1({ regEmail, regPassword, regPassword2, regUsername }));
//   }

//   return (

//     <>
//       <div>
//         <img></img>
//       </div>
//       <form onChange={handleInput}>
//         <div>
//           <div><label>Email</label></div>
//           <input
//             className='reg-email'
//             id='reg-userEmail'
//             type='text'
//             value={regEmail}
//             onChange={(e) => setRegEmail(() => e.target.value)} />
//         </div>
//         <div>
//           <div><label>Password</label></div>
//           <input
//             className='reg-password'
//             id='reg-userPassword'
//             type='text'
//             value={regPassword}
//             onChange={(e) => setRegPassword(() => e.target.value)} />
//         </div>
//         <div>
//           <div><label>Confirm Password</label></div>
//           <input
//             className='reg-confirmPassword'
//             id='reg-userConfirmPassword'
//             type='text'
//             value={regPassword2}
//             onChange={(e) => setRegPassword2(() => e.target.value)} />
//         </div>
//         <div>
//           <div><label>Username</label></div>
//           <input
//             className='reg-username'
//             id='reg-username'
//             type='text'
//             value={regUsername}
//             onChange={(e) => setRegUsername(() => e.target.value)} />
//         </div>
//       </form>
//     </>
//   )
// }
// export default BasicInfo
import { FormWrapper } from "./FormWrapper";
import ImageUploading, { ImageListType } from "react-images-uploading";
import React, { useState } from "react";
import { PasswordInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";


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

  // const [images, setImages] = useState([]);
  // const maxNumber = 1;

  // const onChange = (
  //   imageList: ImageListType,
  //   addUpdateIndex: number[] | undefined
  // ) => {
  //   // data for submit
  //   console.log(imageList, addUpdateIndex);
  //   setImages(imageList as never[]);
  // };
  const [visible, { toggle }] = useDisclosure(false);
  const [psw, setPsw] = useState("");
  const [psw2, setPsw2] = useState("");
  const [errStatement, setErrStatement] = useState("");
  // const [isValid, setIsValid] = useState<boolean>()
  // console.log("out", psw);
  // if (psw === psw2) {
  //   setIsValid(true)
  // }
  return (
    <>
      <FormWrapper title="">
        <label>Email</label>
        <input autoFocus required type="text" value={email} onChange={e => updateFields({ email: e.target.value })} />
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
              updateFields({ password: e.target.value })
              setErrStatement("")
            } else {
              setErrStatement("Invalid Password")
            }


            // console.log(psw);
            // console.log(psw2);


            // if (psw === e.target.value) {
            //   updateFields({ password: e.target.value });
            // }
            // } else {
            //    error = "Invalid Password"
            // }
          }}
        />
        <label>Password</label>
        <input required type="text" value={password} onChange={e => updateFields({ password: e.target.value })} />
        <label>Re-Enter Password</label>
        <input required type="text" />
        <label>Username</label>
        <input required type="text" value={username} onChange={e => updateFields({ username: e.target.value })} />
      </FormWrapper>
    </>
  )
}

export default BasicInfo