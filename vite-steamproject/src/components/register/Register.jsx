import { useForm } from "react-hook-form";
import { createUser } from "../../api/profiles.api";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Register.css";
import { toast } from 'react-toastify';

export function Register() {
    const navigate = useNavigate();
    const [customError, setCustomError] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    useEffect(() => {
            const token = localStorage.getItem("access");
            const user_id = localStorage.getItem("user_id");
            if (token && user_id) {
                navigate("/profile/" + user_id);
            }
        }, []);

    const onSubmit = async (data) => {
        const password = data.password;
        const confirmPassword = data.confirmPassword;
        const accepted = data.terms;

        // Validaciones personalizadas
        if (password !== confirmPassword) {
            setCustomError("Las contraseñas no coinciden.");
            return;
        }

        if (!accepted) {
            setCustomError("Debes aceptar los términos y condiciones.");
            return;
        }

        setCustomError(""); // limpiar errores previos

        try {
            await createUser({
                nickname: data.nickname,
                password: data.password
            });
            navigate("/login");
            toast.success("Creacion de cuenta éxitosa");
        } catch (error) {
            setCustomError("Ocurrió un error al crear tu cuenta.");
        }
    };

    return (
        <div className="AllBox">
            <div className="degradado">
                <div className="registerBox">
                    <h3>CREAR TU CUENTA</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="input_register">
                            <p>Crea tu usuario</p>
                            <input className="square" type="text" {...register("nickname", { required: true })}/>
                            {errors.nickname && <span>Este campo es requerido</span>}
                        </div>

                        <div className="input_register">
                            <p>Crea una clave</p>
                            <input className="square" type="password" {...register("password", { required: true })}/>
                            {errors.password && <span>Este campo es requerido</span>}
                        </div>

                        <div className="input_register">
                            <p>Confirma la clave</p>
                            <input className="square" type="password" {...register("confirmPassword", { required: true })}/>
                            {errors.confirmPassword && <span>Este campo es requerido</span>}
                        </div>

                        <div className="conditionsBox">
                            <p>
                                <input type="checkbox" {...register("terms")}/>{" "}
                                Tengo 13 años o más y acepto los términos del Acuerdo de Suscriptor a Steam y la Política de Privacidad de Valve.
                            </p>
                        </div>

                        {customError && <p style={{ color: "red" }}>{customError}</p>}

                        <div className="zoneButton">
                            <button type="submit" className="butoonReady">Continuar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
