import { useEffect, useState } from "react";
import { getProfile } from "../../api/profiles.api";
import { useParams, useNavigate } from "react-router-dom";
import { ProfileLayout } from './ProfileLayout';

export function Profile() {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const userId = localStorage.getItem("user_id");
    const navigate = useNavigate();

    useEffect(() => {
        if (isNaN(parseInt(id))) {
            setNotFound(true);
            return;
        }

        async function fetchProfile() {
            try {
                const res = await getProfile(id);
                setProfile(res.data);
            } catch (error) {
                console.error("Error al cargar el perfil:", error);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, [id]);

    useEffect(() => {
        if (notFound) {
            // Redirige y recarga luego de un breve tiempo
            setTimeout(() => {
                navigate(`/profile/${userId}`);
                window.location.reload();
            }, 1);
        }
    }, [notFound, navigate, userId]);

    if (loading) {
        return true;
    }

    if (notFound) {
        return true;
    }

    return (
        <div className="perfilDetalle">
            <ProfileLayout profile={profile} />
        </div>
    );
}
