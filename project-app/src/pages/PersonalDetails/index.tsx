
import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { Text, TextInput, Checkbox, Button, Group, Box , Center  } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
// import { useForm } from '@mantine/form';

interface HashtagData {
    id: number,
    name: string
}
interface TeamData {
    id: number | null,
    name: string | null
}

function Details() {

    const { data: userInfo } = useFetch<any>(`users/getSettingInfo`, 'GET', '');

    // console.log(userInfo.data)


    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    // const [uuid, setUUID] = useState<string>();
    // const [id, setId] = useState<number>();
    const [icon, setIcon] = useState<string | null>();
    const [userName, setUserName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [identity, setIdentity] = useState<string>();
    const [yearsOfExp, setYearsOfExp] = useState<number>();
    const [birthday, setBirthday] = useState<Date>();
    const [contactNumber, setContactNumber] = useState<number | null>();
    const [gender, setGender] = useState<string>();
    const [name, setName] = useState<string | null>();
    const [description, setDescription] = useState<string | null>();
    const [facebookUrl, setFacebookUrl] = useState<string | null>();
    const [twitterUrl, setTwitterUrl] = useState<string | null>();
    const [youtubeUrl, setYoutubeUrl] = useState<string | null>();
    const [igUrl, setIgUrl] = useState<string | null>();
    const [hashtags, setHashtags] = useState<HashtagData[] | null>();
    const [teams, setTeams] = useState<TeamData[] | null>();



    const edit = () => {
        console.log("edit Now !")
        setIsEdit(true)
    }
    const complete = () => {
        console.log("complete!! / summit !!")
        setIsEdit(false)
    }
    const exit = () => {
        console.log("exit Now !")
        setIsEdit(false)
    }



    useEffect(() => {
        setIsLoading(false)
        if (userInfo) {
            setIcon(userInfo.userInfo.icon)
            setUserName(userInfo.userInfo.username)
            setEmail(userInfo.userInfo.email)
            setIdentity(userInfo.userInfo.identity)
            setYearsOfExp(userInfo.userInfo.performers[0].years_of_exp)
            setBirthday(userInfo.userInfo.performers[0].birthday)
            setContactNumber(userInfo.userInfo.performers[0].contactNumber)
            setGender(userInfo.userInfo.performers[0].gender)
            setName(userInfo.userInfo.performers[0].name)
            setDescription(userInfo.userInfo.performers[0].description)
            setFacebookUrl(userInfo.userInfo.performers[0].facebook_url)
            setTwitterUrl(userInfo.userInfo.performers[0].twitter_url)
            setYoutubeUrl(userInfo.userInfo.performers[0].youtube_url)
            setIgUrl(userInfo.userInfo.performers[0].ig_url)
        }
    }, [userInfo])

    //// use this https://mantine.dev/core/text-input/
    return (
        <>

            {isLoading && <div>Loading....</div>}
            {!isLoading && !isEdit &&
                <>
                    <div>PersonalDetails</div>
                    <button onClick={edit}>To Edit</button>
                    <br></br>
                    <Text >icon: {icon}</Text>
                    <Text >userName:{userName} </Text>
                    <Text>email: {email}</Text>
                    <Text>identity: {identity}</Text>
                    <Text>yearsOfExp: {yearsOfExp}</Text>
                    <Center >

                    <DatePicker placeholder="Pick date" label="birthday" value={new Date(birthday!)} variant="unstyled" readOnly />
                    </Center>

                    <Text>contactNumber: {contactNumber}</Text>
                    <Text>gender: {gender}</Text>
                    <Text>name: {name}</Text>
                    <Text>description: {description}</Text>
                    <Text>facebookUrl: {facebookUrl}</Text>
                    <Text>twitterUrl: {twitterUrl}</Text>
                    <Text>youtubeUrl: {youtubeUrl}</Text>
                    <Text>igUrl: {igUrl}</Text>
                </>
            }
            {!isLoading && isEdit &&
                <>
                    <div>PersonalDetails</div>
                    <button onClick={complete}>Complete</button><button onClick={exit}>Exit</button>
                </>

            }



        </>

    )
}

export default Details