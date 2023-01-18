import React from "react";
// import { Button } from '@mantine/core';
// import { useToggle } from '@mantine/hooks';
import { useCallback, useState } from 'react';


const useToggle = (initialState: boolean = false): [boolean, any] => {
  const [state, setState] = useState<boolean>(initialState);
  const toggle = useCallback((): void => setState(state => !state), []);
  return [state, toggle]
}


function BasicInfo() {
  const [isToggled, setIsToggle] = useToggle();
  console.log(isToggled)
  return (

    <>
      <div>
        <img></img>
      </div>

      <div>
        <div><label>Email</label></div>
        <input
          className='reg-email'
          id='reg-userEmail'
          type='text' />
      </div>
      <div>
        <div><label>Password</label></div>
        <input
          className='reg-password'
          id='reg-userPassword'
          type='text' />
      </div>
      <div>
        <div><label>Confirm Password</label></div>
        <input
          className='reg-confirmPassword'
          id='reg-userConfirmPassword'
          type='text' />
      </div>
      <div>
        <div><label>Username</label></div>
        <input
          className='reg-username'
          id='reg-username'
          type='text' />
      </div>
      <div>
        <div className="reg-fullName">
          <div><label>First Name</label></div>
          <input
            className='reg-firstName'
            id='reg-firstName'
            type='text' />
        </div>
        <div>
          <div><label>Last Name</label></div>
          <input
            className='reg-lastName'
            id='reg-lastName'
            type='text' />
        </div>
      </div>
      <div>
        {/* <Button onClick={setIsToggle()}>
          {isToggled ? "Male" : "Female"}
        </Button> */}
      </div>

    </>

  )
}
export default BasicInfo