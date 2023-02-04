import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { Link, useNavigate } from 'react-router-dom';
import {
  PerformersSettingValue,
  IndividualClientsSettingValue,
  CorporateClientsSettingValue,
  Role,
  RespType,
} from '../../utils/userInfoType';
import PerformersDisplay from './Performers/PerformersDisplay';
import PerformersEdit from './Performers/PerformersEdit';
import IndividualClientsDisplay from './IndividualClients/IndividualClientsDisplay';
import IndividualClientsEdit from './IndividualClients/IndividualClientsEdit';
import CorporateClientsDisplay from './CorporateClients/CorporateClientsDisplay';
import CorporateClientsEdit from './CorporateClients/CorporateClientsEdit';

function Details() {
  const navigate = useNavigate();
  const {
    data: resp,
    isLoading,
    error,
  } = useFetch<RespType | null>(`users/getSettingInfo`, 'GET', null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const edit = () => {
    console.log('edit Now !');
    setIsEdit(true);
  };

  // const complete = () => {
  //   console.log('complete!! / summit !!');
  //   setIsEdit(false);
  // };

  const exitEdit = () => {
    console.log('exit Now !');
    setIsEdit(false);
  };

  const goBack = () => {
    console.log('goBack Now !');
    navigate(-1);
  };

  let role: Role = Role.Performer;
  if (resp?.userInfo && resp.userInfo.identity === 'client') {
    const userInfo = resp.userInfo as IndividualClientsSettingValue | CorporateClientsSettingValue;
    role = userInfo.client_type === 'individual' ? Role.Individual : Role.Corporate;
  }

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>get error</div>;
  }

  if (resp && !isEdit && role === Role.Performer) {
    const userInfo = resp.userInfo as PerformersSettingValue;
    console.log('userInfo ', userInfo);
    return (
      <>
        <PerformersDisplay info={userInfo} goBack={goBack} edit={edit} />

        <br></br>
      </>
    );
  }

  if (resp && !isEdit && role === Role.Individual) {
    const userInfo = resp.userInfo as IndividualClientsSettingValue;
    console.log('userInfo ', userInfo);
    return (
      <>
        <IndividualClientsDisplay info={userInfo} goBack={goBack} edit={edit} />
        <br></br>
      </>
    );
  }

  if (resp && !isEdit && role === Role.Corporate) {
    const userInfo = resp.userInfo as CorporateClientsSettingValue;
    console.log('userInfo ', userInfo);
    return (
      <>
        <CorporateClientsDisplay info={userInfo} goBack={goBack} edit={edit} />
        <br></br>
      </>
    );
  }

  if (resp && isEdit && role === Role.Performer) {
    const userInfo = resp.userInfo as PerformersSettingValue;
    console.log('userInfo ', userInfo);
    return <PerformersEdit info={userInfo} exitEdit={exitEdit} />;
  }
  if (resp && isEdit && role === Role.Individual) {
    const userInfo = resp.userInfo as IndividualClientsSettingValue;
    console.log('userInfo ', userInfo);
    return <IndividualClientsEdit info={userInfo} exitEdit={exitEdit} />;
  }
  if (resp && isEdit && role === Role.Corporate) {
    const userInfo = resp.userInfo as CorporateClientsSettingValue;
    console.log('userInfo ', userInfo);
    return <CorporateClientsEdit info={userInfo} exitEdit={exitEdit} />;
  }

  return <div>get error</div>;
}

export default Details;
