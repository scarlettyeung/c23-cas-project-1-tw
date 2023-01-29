// import React, { useState, useEffect } from 'react'
import { HashtagData } from '../index'
type HashTagsProps = {
    tags: HashtagData[] | null
    // setHashtags: void =>{}
}
function HashTags(info: HashTagsProps) {
    const tags = info.tags!

    return (
        <>
            {
                tags.map(tag => <div key={tag.hashtag_details.id}>
                    {tag.hashtag_details.name}
                </div>)
            }
        </>)

}

export default HashTags