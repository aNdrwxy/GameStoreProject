import {useEffect, useState} from "react";
import { getProfile } from "../api/profiles.api";
import { useParams } from "react-router-dom";
import { ProfileLayout } from './ProfileLayout'

export function Profile(){

    const { id } = useParams();
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await getProfile(id);
                setProfile(res.data);
            } catch (error) {
                console.error("Error al cargar el perfil:", error);
            }
        }
    
        fetchProfile();
    }, [id]);

    return (
    <div className="perfilDetalle">
        <ProfileLayout  profile={profile}/>
    </div>
    );
}