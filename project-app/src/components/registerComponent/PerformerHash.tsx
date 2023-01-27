// import { Badge } from '@mantine/core';
// import { useState } from 'react';
// import { performerP2 } from '../../redux/auth';
// import { useRootDispatch } from '../../redux/store';
// import "../../styles/register.css"
// function PerformerHash() {
//   const dispatch = useRootDispatch();
//   const tags = ["Singer", "DJ", "Musician", "Juggling", "Dancer", "Mime", "Emcee (MC)", "Comedian", "Clowning", "Magician", "Fire Dancer / Fire Breather", "Aerial and Acrobatic Performer", "Burlesque", "Drawer", "Balloon Twister", "Performance Artist", "Sketchers", "Graffiti Artist", "Acapella", "Beatboxer", "Puppetry", "Rapper", "Lion Dance", "Others"];
//   const [isActive, setIsActive] = useState(false)
//   const [tagId, setTagId] = useState<number>()
//   const clicked = () => {
//     setIsActive(current => !current)
//     setTagId(tags.length)
//     dispatch(performerP2(tags.length))
//   }
//   return (
//     <>
//       {tags.map((tag, tagId) => (console.log(tagId),
//         (<div key={tagId}>
//           <Badge className={isActive ? 'tagStyle2' : 'tagStyle'} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} onClick={clicked}>{tag}</Badge>
//         </div>)
//       ))
//       }
//     </>)
// }

// export default PerformerHash

import { FormWrapper } from "./FormWrapper";
import { Badge } from '@mantine/core';
import { useState } from "react";

type PerformerHashData = {
  tagId: number
}

type UserFormProps = PerformerHashData & {
  updateFields: (fields: Partial<PerformerHashData>) => void
}

function PerformerHash({ tagId, updateFields }: UserFormProps) {
  const tags = ["Singer", "DJ", "Musician", "Juggling", "Dancer", "Mime", "Emcee (MC)", "Comedian", "Clowning", "Magician", "Fire Dancer / Fire Breather", "Aerial and Acrobatic Performer", "Burlesque", "Drawer", "Balloon Twister", "Performance Artist", "Sketchers", "Graffiti Artist", "Acapella", "Beatboxer", "Puppetry", "Rapper", "Lion Dance", "Others"];
  const [isActive, setIsActive] = useState(false)
  // const [tagIds, setTagIds] = useState<('')>
  const clicked = () => {
    setIsActive(current => !current)
    // setTagIds(tags.length)
    // dispatch(performerP2(tags.length))
    updateFields({ tagId })
  }

  return (
    <FormWrapper title="User Details">
      <label>Choose upto 5 hashtags</label>
      {tags.map((tag, tagId) => (console.log(tagId),
        (<div key={tagId}>
          <Badge className={isActive ? 'tagStyle2' : 'tagStyle'} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} onClick={clicked}>{tag}</Badge>
        </div>)
      ))
      }
    </FormWrapper>
  )
}

export default PerformerHash