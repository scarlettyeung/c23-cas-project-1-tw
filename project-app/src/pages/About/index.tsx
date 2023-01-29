// import UserCardImage from './components/Profile';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex, Avatar, Text } from '@mantine/core';
import useFetch from '../../hooks/useFetch';
import PersonalInfo from "./components/PersonalInfo "
import EventInfo from "./components/EventInfo"
import { useRootSelector } from '../../redux/store';

export interface PersonalData {
    userIcon: string;
    userName: string;
    gender: string;
    expYear: number;
    avgScore: number;
    sumOfEvent: number;
}

export interface TeamData {
    id: number | null,
    name: string | null
}

export interface HashtagData {
    [x: string]: any;

    id: number,
    name: string
}

export interface EventData {
    title: string;
}
export interface MediaURL {
    facebook: string | null,
    twitter: string | null,
    youtube: string | null,
    ig: string | null
}

function About() {
    const navigate = useNavigate();
    const { uuid } = useParams<string>()
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [userIconPath, setUserIconPath] = useState<string>('');
    const [userName, setUserName] = useState<string>('userName');
    const [gender, setGender] = useState<string>('gender');
    const [expYear, setExpYear] = useState<number>(0);
    const [userAvgScore, setUserAvgScore] = useState<number>(0);
    const [userSumOfEvent, setUserSumOfEvent] = useState<number>(0);

    const [facebookUrl, setFacebookUrl] = useState<string>('facebookUrl');
    const [twitterUrl, setTwitterUrl] = useState<string>('twitterUrl');
    const [youtubeUrl, setYoutubeUrl] = useState<string>('youtubeUrl');
    const [igUrl, setIgUrl] = useState<string>('igUrl');

    const [hashtags, setHashtags] = useState<HashtagData[] | null>(null);
    const [events, setEvents] = useState<EventData[] | null>(null);
    const [teams, setTeams] = useState<TeamData[] | null>(null);



    const personalDataToProp: PersonalData = {
        userIcon: userIconPath,
        userName: userName,
        expYear: expYear,
        gender: gender,
        avgScore: userAvgScore,
        sumOfEvent: userSumOfEvent

    }
    const hashtagsDataToProp: HashtagData[] | null[] | null = hashtags

    const mediaURLDataToProp: MediaURL = {
        facebook: facebookUrl,
        twitter: twitterUrl,
        youtube: youtubeUrl,
        ig: igUrl
    }

    const teamsDataToProp: TeamData[] | null[] | null = teams


    const eventInfoDataToProp: EventData[] | null[] | null = events


    const { data: UserInfo } = useFetch<any>(`users/getInfo/${uuid}`, 'GET', '');

    useEffect(() => {
        console.log("get data!!!")
        console.log(UserInfo.message)
        if (UserInfo.message === "can't find user") {
            setIsLoading(false)
            // navigate(-1)

        }
        if (UserInfo.message === "get user info") {
            setIsLoading(false)

            //// part of user personal info 
            setUserIconPath(UserInfo.data.icon);
            setUserName(UserInfo.data.username)
            setExpYear(UserInfo.data.performers[0].years_of_exp)
            setGender(UserInfo.data.performers[0].gender)
            setUserAvgScore(UserInfo.data.performers[0].avgScore)
            setUserSumOfEvent(UserInfo.data.performers[0].sumOfEvent)

            /// part of user media URL
            setFacebookUrl(UserInfo.data.performers[0].facebook_url)
            setTwitterUrl(UserInfo.data.performers[0].twitter_url)
            setYoutubeUrl(UserInfo.data.performers[0].youtube_url)
            setIgUrl(UserInfo.data.performers[0].ig_url)


            /// part of user action?  info
            // console.dir(UserInfo.data.performers[0].performers_hashtags)
            // console.dir(UserInfo.data.performers[0].events)
            // console.dir(UserInfo.data.performers[0].teams_performers)
            setHashtags(UserInfo.data.performers[0].performers_hashtags)
            setEvents(UserInfo.data.performers[0].events)
            setTeams(UserInfo.data.performers[0].teams_performers)
        }



    }, [UserInfo]);



    const uuidFromState = useRootSelector((state) => state.auth.uuid);

    //set the information info
    //maybe add a new components (edit btn)

    return (
        <>

            {isLoading && <div>isLoading...</div>}
            {UserInfo.message === "can't find user" && <div>Who are You go back</div>}
            {!isLoading && UserInfo.message === "get user info" && <div>
                {uuid === uuidFromState &&
                    <button onClick={() => navigate('/about')}>
                        setting btn
                    </button>

                }
                <PersonalInfo
                    pageUUID={uuid}
                    personalData={personalDataToProp}
                    hashtagsData={hashtagsDataToProp}
                    mediaURLData={mediaURLDataToProp}
                    teamsData={teamsDataToProp}
                />
                <br></br>
                <EventInfo eventInfoData={eventInfoDataToProp} />
            </div>}



        </>
    );
}

export default About;