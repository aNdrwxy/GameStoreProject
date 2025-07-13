import {useEffect, useState} from "react";
import { getAllProfiles } from "../../api/profiles.api";
import { ProfilesCard } from './ProfilesCard'

export function ProfileList(){

    const [profiles, setProfiles]= useState([]);


    useEffect(() =>{
        async function LoadProfiles() {
            const res =  await getAllProfiles();
            setProfiles(res.data);
        }

        LoadProfiles();
    },[])

    return <div className="cardsGrid">
        {profiles.map(profile => (
            <ProfilesCard key={profile.id} profile={profile}/>
        ))}
    </div>;
}