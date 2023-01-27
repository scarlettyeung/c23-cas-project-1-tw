import React, { useState } from "react";
// import { registerThunk } from "../redux/auth";
import { useRootDispatch } from '../redux/store';
import { AccountType } from "../redux/auth";
import { useNavigate } from "react-router-dom";
import { chooseType } from '../redux/auth';

// enum AccountType {
//   Performer = "performer",
//   Client = "individual",
//   CorporateClient = "corporate"
// }

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useRootDispatch();

  const [performer, setPerformer] = useState<AccountType>(AccountType.Performer);
  const [client, setClient] = useState<AccountType>(AccountType.Client);
  const [corporateClient, setCorporateClient] = useState<AccountType>(AccountType.CorporateClient);

  const handlePerformer = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPerformer(event.currentTarget.value as AccountType);
    console.log(event.currentTarget.value as AccountType);
    dispatch(chooseType({ accountType: AccountType.Performer }))
    navigate('/register/performer');
  };
  const handleClient = (event: React.MouseEvent<HTMLButtonElement>) => {
    setClient(event.currentTarget.value as AccountType);
    console.log(event.currentTarget.value as AccountType);
    dispatch(chooseType({ accountType: AccountType.Client }))
    navigate('/register/individual');
  };

  const handleCorporateClient = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCorporateClient(event.currentTarget.value as AccountType);
    console.log(event.currentTarget.value as AccountType);
    dispatch(chooseType({ accountType: AccountType.CorporateClient }))
    navigate('/register/corporate');
  };

  return (
    <>
      <div>
        <div>
          Welcome to JOASIS!
        </div>
        <div>
          Which type of account do you like to create?
        </div>
      </div>
      <div>
        <button id="performer" value={performer} onClick={handlePerformer} >Performer</button>
        <button id="client" value={client} onClick={handleClient}>Client</button>
        <button id="corporate" value={corporateClient} onClick={handleCorporateClient}>Corporate Client</button>
      </div>
    </>
  )
}
