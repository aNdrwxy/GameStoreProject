// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { toast } from 'react-toastify';

export function Login() {
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("access");
        const user_id = localStorage.getItem("user_id");
        if (token && user_id) {
            navigate("/profile/" + user_id);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/accounts/api/token/", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ nickname, password }),
        });

        const data = await response.json();

        if (response.ok) {
        // Guardar tokens
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            localStorage.setItem("user_id", data.user_id);
            localStorage.setItem("nickname", data.nickname);
            localStorage.setItem("rol", data.rol);
            window.dispatchEvent(new Event("storage"));
            navigate("/profile/" +  data.user_id); // redirigir al home o a donde quieras
        } else {
            setError(data.detail || "Credenciales incorrectas");
        }
        } catch (err) {
            setError("Ocurrió un error al intentar iniciar sesión");
        }
    };

    return (
        <div>
            <div className="body">
                <div className="login">
                    <div>
                        <div>
                            <div>
                                <form onSubmit={handleLogin}>
                                <div className="fontIniciar">
                                    INICIO DE SESION
                                </div>
                                    <div>
                                        <p>INICIA CON TU NOMBRE DE CUENTA</p>
                                        <input type="text" className="input_login" placeholder="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
                                    </div>
                                    <div>
                                        <p>CONTRASEÑA</p>
                                        <input type="password" className="input_login" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                    <div className="box_inicio">
                                        <button className="buutonInicio" type="submit">Ingresar</button>
                                    </div>
                                </form>
                                {error && <p style={{ color: "red" }}>{error}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="box_QR">
                        <strong>o bien con un codigo QR</strong>
                        <img className="login_QR" src="../../public/frame.png" alt=""/>
                        <strong>Usa la aplicación Steam Mobile para iniciar sesión con un código QR</strong>
                    </div>
                </div>
            </div>
            <div className="footer">
                <div className="box_footer">
                    <div className="footer_text2">
                        <p>Es gratis y muy fácil. Descubre miles de juegos para jugar con millones de amigos nuevos. Más información acerca de Steam</p>
                    </div>
                    <div className="footer_text1">
                        <p>¿Tu primera vez en Steam?</p>
                        <button><Link to="/register">Crear Cuenta</Link></button>
                    </div>
                </div>
            </div>
        </div>)
    }
