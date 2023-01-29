import React from 'react'
import { EventData } from '../index'

type EventInfoProps = {
    eventInfoData: EventData[] | null
}

function EventInfo(info: EventInfoProps) {

    const EventArr = info.eventInfoData!

    return (
        <>
            <div>EventInfo</div>

            {EventArr.length < 1 && <div>No Event</div>}

            {EventArr.length > 1 && EventArr.map((e) => {

                return (
                    <div key={`event_key_${e.title}`}>
                        {e.title}
                    </div>)

            })}
        </>
    )
}

export default EventInfo