import { useState } from 'react';
// import { Stepper, Button, Group } from '@mantine/core';
// import BasicInfo from '../components/registerComponent/BasicInfo';
// import PerformerHash from '../components/registerComponent/PerformerHash';
// import PerformerInfo from '../components/registerComponent/PerformerInfo';



function Performer_old() {
  // const [active, setActive] = useState(0);
  // const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  // const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      {/* <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step label="Basic Information">
          <BasicInfo />
        </Stepper.Step>
        <Stepper.Step label="Choose Hashtag(s)" >
          <PerformerHash />
        </Stepper.Step>
        <Stepper.Step label="Final step" >
          <PerformerInfo />
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group> */}
    </>
  );
}


export default Performer_old

