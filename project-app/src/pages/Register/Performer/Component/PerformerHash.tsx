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

import { FormWrapper } from "../../registerComponent/FormWrapper";
import { Badge } from '@mantine/core';
import React, { FormEvent, useEffect, useState } from "react";
import "../../../../styles/register.css"
export type PerformerHashData = {
  tagId: number
  name: string
}
type IdProps = {
  tagId: number[] | null
}

type UserFormProps = Omit<IdProps, "name"> & {
  updateFields: (fields: Partial<Omit<IdProps, "name">>) => void
}


function PerformerHash({ tagId, updateFields }: UserFormProps) {

  const [tags, setTags] = useState<PerformerHashData[]>([])
  const [ids, setIds] = useState<number[]>([])

  useEffect(() => {
    async function getAllTags() {
      const path = process.env.REACT_APP_API_BASE;
      let data = await fetch(`${path}users/getPerformerHashtag`)
      let result = await data.json()
      console.log('check hashName', result)
      return (
        setTags(result.map((r: { name: string; id: number }) => ({ name: r.name, tagId: r.id })))
      )
    }
    getAllTags()
  }, [])

  return (
    <FormWrapper title="User Details">
      <label>Choose upto 5 hashtags</label>

      {tags.map((tag) => (
        <Badge key={tag.tagId} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}
          onClick={(e) => {
            console.log("check id", tag.tagId)
            let arr = [...ids]
            if (arr.includes(tag.tagId)) {
              arr = arr.filter(idd => idd !== tag.tagId)
            } else if (arr.length < 5) {
              arr.push(tag.tagId)
            }
            console.log("check duplicate", arr)
            setIds(arr)

            updateFields({ tagId: arr })
            tagId = arr
            // console.log("check ids", ids)
          }} className={tagId?.includes(tag.tagId) ? 'tagStyle2' : 'tagStyle'}>{tag.name}

        </Badge>
      ))
      }
    </FormWrapper>
  )
}

export default PerformerHash

