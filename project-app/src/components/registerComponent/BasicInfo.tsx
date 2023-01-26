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
import { useState } from "react";


type BasicData = {
  icon: string
  email: string
  password: string
  password2: string
  username: string
}

type UserFormProps = BasicData & {
  updateFields: (fields: Partial<BasicData>) => void
}

function BasicInfo({
  email,
  password,
  password2,
  username, updateFields }: UserFormProps) {

  const [images, setImages] = useState([]);
  const maxNumber = 1;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };


  return (
    <FormWrapper title="User Details">
      <label>Upload Icon</label>
      <div className="App">
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <button
                style={isDragging ? { color: 'red' } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Click to add icon
              </button>
              &nbsp;
              {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image['data_url']} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <button onClick={() => onImageUpdate(index)}>Update</button>
                    <button onClick={() => onImageRemove(index)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
      </div>
      <label>Email</label>
      <input autoFocus required type="text" value={email} onChange={e => updateFields({ email: e.target.value })} />
      <label>Password</label>
      <input required type="text" value={password} onChange={e => updateFields({ password: e.target.value })} />
      <label>Re-Enter Password</label>
      <input required type="text" value={password2} onChange={e => updateFields({ password2: e.target.value })} />
      <label>Username</label>
      <input required type="text" value={username} onChange={e => updateFields({ username: e.target.value })} />
    </FormWrapper>
  )
}

export default BasicInfo