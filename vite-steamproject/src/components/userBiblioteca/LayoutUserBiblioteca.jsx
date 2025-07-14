import { useEffect, useState } from 'react';
import { getGamerForId } from '../../api/biblioteca.api'; // ajusta si la ruta es diferente
import { JuegosCarts } from './juegosCarts';
import './layoutUserBiblioteca.css';

export function LayoutUserBiblioteca() {
    const [juegos, setJuegos] = useState([]);
    const user_id = localStorage.getItem('user_id');
    const [busqueda, setBusqueda] = useState("");
    const [juegosFiltrados, setJuegosFiltrados] = useState(juegos);

    useEffect(() => {
        async function fetchBiblioteca() {
            try {
                const res = await getGamerForId(user_id);
                setJuegos(res.data.juegos); // res.data.juegos es el array completo
            } catch (error) {
                console.error("Error al cargar biblioteca:", error);
            }
        }

        fetchBiblioteca();
    }, [user_id]);

    useEffect(() => {
        const filtro = juegos.filter((juego) =>
            juego.nombre.toLowerCase().includes(busqueda.toLowerCase())
        );
        setJuegosFiltrados(filtro);
    }, [busqueda, juegos]);

    return (
        <div className="biblioteca-container">
            <h2 className="titulo-biblioteca">Mi Biblioteca</h2>
            <div className="inputContainer">
                <input type="text" placeholder="Buscar juego..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="buscador-input"/>
            </div>
            <div className="juegos-grid">
            {juegosFiltrados.length === 0 ? (
                <p>No se encontraron juegos.</p>
            ) : (
                juegosFiltrados.map((juego) => (
                    <JuegosCarts key={juego.id} juego={juego} />
                ))
            )}
            </div>
        </div>
    );
}
