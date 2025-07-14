import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

export function Header() {
    const [perfil, setPerfil] = useState(null);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const menuRef = useRef(null); // <-- referencia al menú

    useEffect(() => {
        const token = localStorage.getItem("access");
        const user_id = localStorage.getItem("user_id");

        if (token && user_id) {
            fetch(`http://localhost:8000/accounts/api/v1/profile/${user_id}/`)
                .then(res => res.json())
                .then(data => setPerfil(data))
                .catch(() => setPerfil(null));
        } else {
            setPerfil(null);
        }
    }, [location.pathname]);

    // 🧠 Detecta clics fuera del menú
    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuAbierto(false);
            }
        }

        if (menuAbierto) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuAbierto]);

    const handleLogout = () => {
        localStorage.clear();
        setPerfil(null);
        navigate("/login");
    };

    const isActiveExact = (path) => location.pathname === path;

    return (
        <div className="header">
            <div>
                <Link to="/shop">
                    <img className="img_header" src="https://store.fastly.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016" alt="Logo Steam" />
                </Link>
            </div>

            <div className="links_navegacion">
                <Link to="/shop" className={`boton_header ${isActiveExact("/shop") ? "activo" : ""}`}>Tienda</Link>
                <Link to="/profiles" className={`boton_header ${isActiveExact("/profiles") ? "activo" : ""}`}>Comunidad</Link>
                <Link to="/tickets" className={`boton_header ${isActiveExact("/tickets") ? "activo" : ""}`}>Tickets</Link>
                {perfil ? (
                    <>
                        <Link to={`/profile/${perfil.id}`} className={`boton_header ${isActiveExact(`/profile/${perfil.id}`) ? "activo" : ""}`}>{perfil.nombre_perfil}</Link>
                        <Link to="/biblioteca" className={`boton_header ${isActiveExact("/biblioteca") ? "activo" : ""}`}>Biblioteca</Link>
                    </>
                ) : (
                        <Link to="/register" className={`boton_header ${isActiveExact("/register") ? "activo" : ""}`}>Registrarse</Link>
                )}
            </div>

            <div className="header_afterbox">
                {perfil ? (
                    <div className="menu-usuario" ref={menuRef}> {/* Ref aquí */}
                        <div className="menu-trigger" onClick={() => setMenuAbierto(!menuAbierto)}>
                            <span className="nombre_perfil">{perfil.nombre_perfil} <span className="flecha">▼</span></span>
                        </div>
                        <Link to={`/profile/${perfil.id}`}><img src={perfil.avatar} alt="avatar" className="avatar-cuadrado" /></Link>
                        {menuAbierto && (
                            <div className="menu-dropdown">
                                <div onClick={() => setMenuAbierto(false)}><Link to={`/profile/${perfil.id}`}>👤 Ver perfil</Link></div>
                                <div onClick={() => setMenuAbierto(false)}><Link to={`/profile/edit/${perfil.id}`}>✏️ Editar perfil</Link></div>
                                <div onClick={() => setMenuAbierto(false)}><Link to={`/biblioteca`}>🎮 Biblioteca de Juegos</Link></div>
                                <div><button onClick={handleLogout}>🚪 Cerrar sesión</button></div>
                            </div>
                        )}
                    </div>
                ) : (
                    <button className="boton_header2"><Link to="/login">Iniciar sesión</Link></button>
                )}
            </div>
        </div>  
    );
}
