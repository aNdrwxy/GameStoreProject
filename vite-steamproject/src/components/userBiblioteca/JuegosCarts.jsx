import './juegosCarts.css';

export function JuegosCarts({juego}){
    return (
        <div>
            <div className="juego-card">
                <div className="juego-img-container">
                    <img className="juego-imagen"  src={juego.imagen} alt="imagen" />
                    <div className="overlay">
                        <div className="juego-info">
                            <h3>{juego.nombre}</h3>
                            <p>{juego.descripcion}</p>
                            <p><strong>Desarrollador: </strong>{juego.desarrollador}</p>
                            <p><strong>Fecha de Lanzamiento: </strong>{juego.fecha_lanzamiento}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );}