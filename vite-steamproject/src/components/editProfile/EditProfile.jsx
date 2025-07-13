import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getProfile, updateProfile } from "../../api/profiles.api";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./EditProfile.css";
import { toast } from 'react-toastify';


export function EditProfile() {
    const { id } = useParams();
    const navigate = useNavigate();

    const perfilId = parseInt(id);
    const userId = parseInt(localStorage.getItem("user_id"));
    const rol = localStorage.getItem("rol");

    const [validandoPermisos, setValidandoPermisos] = useState(true);
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    // Validar permisos (antes de cargar el perfil)
    useEffect(() => {
        if (rol !== "admin" && perfilId !== userId) {
            navigate(`/profile/edit/${userId}`, { replace: true });
            return;
        }
        setValidandoPermisos(false);
    }, [rol, perfilId, userId, navigate]);

    // Cargar el perfil si los permisos son válidos
    useEffect(() => {
        async function loadProfile() {
            setLoading(true);
            try {
                const res = await getProfile(perfilId);
                setProfileData(res.data);
            } catch (error) {
                console.error("Error al cargar perfil:", error);
            } finally {
                setLoading(false);
            }
        }

        if (!validandoPermisos) {
            loadProfile();
        }
    }, [perfilId, validandoPermisos]);

    // Resetear el formulario cuando cambian los datos
    useEffect(() => {
        if (profileData) {
            reset(profileData);
        }
    }, [profileData, reset]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            await updateProfile(perfilId, data);
            navigate("/profile/" + perfilId);
            toast.success("Perfil actualizado con éxito");
        } catch (error) {
            toast.error("Error al actualizar perfil");
        }
    });

    // Mostrar pantalla negra si está validando permisos o cargando
    if (validandoPermisos || loading) {
        return <div style={{ width: "100%", height: "100%", backgroundColor: "black" }}></div>;
    }

    
    return (
        <div>
            <div className="bodyeditProfile">
                <div className="contenedoreditProfile">
                    <Link to={`/profile/${userId}`} className="back-link">Regresar a tu perfil</Link>
                    <h1>Edición de tu perfil</h1>
                    <p className="Descripción-perfil">
                        Configura el nombre y detalles personales de tu perfil. Procura llenar todos los campos para tener un perfil más llamativo e impresionar a la comunidad.
                    </p>

                    <h2 className="section-title">Editar Perfil</h2>

                    <form className="editForm" onSubmit={onSubmit}>
                        <label htmlFor="NAME">Nombre de perfil</label>
                        <input type="text" className="inputeditText" id="NAME" maxLength={50} {...register("nombre_perfil", { required: true })}/>
                        {errors.nombre_perfil && <span>Campo requerido</span>}

                        <label htmlFor="AGE">Edad</label>
                        <input type="number" className="inputeditNumber" id="AGE" {...register("edad")}/>

                        <label htmlFor="SEX">Sexo</label>
                        <input type="text" className="inputeditText" id="SEX" maxLength={10} {...register("sexo")}/>

                        <label htmlFor="DESCRIPCION">Descripción</label>
                        <textarea id="DESCRIPCION" className="textareaEdit" rows={5} cols={100} {...register("descripcion")}></textarea>

                        <label htmlFor="URL1">Avatar</label>
                        <input type="url" className="inputeditUrl" id="URL1" {...register("avatar", { required: true })}/>
                        {errors.avatar && <span>Campo requerido</span>}

                        <label htmlFor="URL2">Background</label>
                        <input type="url" className="inputeditUrl" id="URL2" {...register("background", { required: true })}/>
                        {errors.background && <span>Campo requerido</span>}

                        <br />
                        <button type="submit" className="Boton">Guardar Cambios</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
