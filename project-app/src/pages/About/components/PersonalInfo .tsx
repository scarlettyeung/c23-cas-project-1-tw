import React, { useState, useEffect } from 'react'

import { MediaURL, PersonalData, TeamData, HashtagData } from '../index'
import HashTags from './HashTags'
import { useRootSelector } from '../../../redux/store'
import { Rating, Group } from '@mantine/core';

type UserInfoProps = {
    pageUUID?: string
    personalData: PersonalData | null
    hashtagsData: HashtagData[] | null
    mediaURLData: MediaURL | null
    teamsData: TeamData[] | null
}

function PersonalInfo(info: UserInfoProps) {
    const [userIcon, setUserIcon] = useState<string>('userIcon')
    const [userName, setUserName] = useState<string>('userName')
    const [gender, setGender] = useState<string>('gender')
    const [expYear, setExpYear] = useState<number>(0)
    const [userAvgScore, setUserAvgScore] = useState<number>(0)
    const [userSumOfEvent, setUserSumOfEvent] = useState<number>(0)
    const [hashtagsArr, setHashtagsArr] = useState<HashtagData[]>()
    const [facebook, SetFacebook] = useState<string>('No Data')
    const [twitter, SetTwitter] = useState<string>('No Data')
    const [youtube, SetYoutube] = useState<string>('No Data')
    const [ig, SetIg] = useState<string>('No Data')

    const uuidFromState = useRootSelector((state) => state.auth.uuid);
    const uuidInPage = info.pageUUID

    // let hashtags

    useEffect(() => {
        const iconData = info.personalData?.userIcon!
        const nameData = info.personalData?.userName!
        const genderData = info.personalData?.gender!
        const expYearData = info.personalData?.expYear!
        const avgScoreData = info.personalData?.avgScore!
        const sumOfEventData = info.personalData?.sumOfEvent!
        const hashtagsArrData = info.hashtagsData!

        const fbData = info.mediaURLData?.facebook
        const twitterData = info.mediaURLData?.twitter
        const igData = info.mediaURLData?.ig
        const youtubeData = info.mediaURLData?.youtube

        setUserIcon(iconData)
        setUserName(nameData)
        setGender(genderData)
        setExpYear(expYearData)
        setUserAvgScore(avgScoreData)
        setUserSumOfEvent(sumOfEventData)
        setHashtagsArr(hashtagsArrData)

        if (fbData) {
            SetFacebook(fbData)
        }

        if (twitterData) {
            SetTwitter(twitterData)
        }

        if (youtubeData) {
            SetYoutube(youtubeData)
        }

        if (igData) {
            SetIg(igData)
        }


    }, [info, hashtagsArr])



    return (
        <>
            <div>===PersonalInfo===</div>
            <br></br>
            <div>user Icon:{userIcon}</div>
            <div>userName:{userName} </div>
            <div>gender:{gender} </div>
            <br></br>
            <div>Avg score (sum of the event) </div>
            <Group position="center">
                <Rating defaultValue={userAvgScore} readOnly />
                <div> SUM: {userSumOfEvent} </div>
            </Group>

            <div>expYear: {expYear} </div>
            {uuidFromState !== uuidInPage && <button>ToChatRoom</button>}
            <div>=========</div>

            <br></br>
            <div>===hashtags=== </div>
            <div>
                {!hashtagsArr &&
                    <>No hashtags</>
                }
                {hashtagsArr &&
                    <HashTags tags={info.hashtagsData!} />
                }
            </div>

            <div>=========</div>
            <br></br>
            <div>===URL===</div>
            <br></br>
            <div>FB:{facebook}</div>
            <div>IG:{ig}</div>
            <div>Twitter:{twitter}</div>
            <div>Youtube:{youtube} </div>
            <div>=========</div>
        </>
    )
}

export default PersonalInfo 