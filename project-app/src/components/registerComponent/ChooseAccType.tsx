import React from "react";
import CorporateP1 from "./CorporateP1";
import IndividualP1 from "./IndividualP1";
import PerformerP1 from "./PerformerP1";

function ChooseAccType() {
  // const cases = ["case1", "case2", "case3"]
  // switch(cases) {
  //   case 'case1': document.querySelector(".performer")
  //   case 'case2': document.querySelector(".client")
  // }
  // const handlePerformer = () => {
  //   return (<div><PerformerP1 /></div>)
  // }
  // const handleIndividual = () => {
  //   return (<div><IndividualP1 /></div>)
  // }
  // const handleCorporate = () => {
  //   return (<div><CorporateP1 /></div>)
  // }

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
        <button className="performer">Performer</button>
        <button className="client">Client</button>
        <button className="corporate">Corporate Client</button>
      </div>
    </>
  )
}

export default ChooseAccType