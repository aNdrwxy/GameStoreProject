import './ProfilesCard.css';
import {Link} from 'react-router-dom' 

export function ProfilesCard({profile}){
    return (
        <div className="main-content">
            <div className="cardsGrid">
                <div className="contenedor">
                    <div className="background" style={{ backgroundImage: `url(${profile.background})` }}>
                        <div className="profileInfoList">   
                            <Link to={`/profile/${profile.id}`}>
                                <img src={profile.avatar} alt="avatar" className="avatar" />
                            </Link>
                            <div className="backgroundText">
                                <p>{profile.nombre_perfil}</p>
                            </div>
                        </div>
                    </div>
                    <div className="description">
                        <p>{profile.descripcion}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}