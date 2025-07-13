import "./Footer.css"

export function Footer(){

    return (
        <div className="footer">
            <div className="contenido_footer">
                <div className="separacion"></div>
                <hr />
                <div className="footer_seccion1">
                    <img src="" alt="" />
                    <img className="img_footer" src="https://store.akamai.steamstatic.com/public/images/footerLogo_valve_new.png" alt=""/>
                    <p>© 2025 Valve Corporation. Todos los derechos reservados. Todas las marcas registradas pertenecen a sus respectivos dueños en EE. UU. y otros países.Todos los precios incluyen IVA (donde sea aplicable).
                    <button className="buttonFooter"> Política de Privacidad </button> | 
                    <button className="buttonFooter"> Información legal </button> | 
                    <button className="buttonFooter"> Acuerdo de Suscriptor a Steam</button> | 
                    <button className="buttonFooter"> Reembolsos</button> | 
                    <button className="buttonFooter">Cookies</button>
                    </p>
                </div>
                <hr />
                <div className="footer_seccion2">
                    <p>
                        <button className="buttonFooter">Acerca de Valve</button> | 
                        <button className="buttonFooter">Empleo</button> | 
                        <button className="buttonFooter">Steamworks</button> | 
                        <button className="buttonFooter">Distribución de Steam</button> | 
                        <button className="buttonFooter">Soporte</button> | 
                        <button className="buttonFooter">Tarjetas regalo</button> | 
                        <img src="https://store.akamai.steamstatic.com/public/images/ico/ico_facebook.png" alt=""/> | 
                        <img src="https://store.akamai.steamstatic.com/public/images/ico/ico_twitter.png" alt=""/> | 
                        <img src="https://store.akamai.steamstatic.com/public/images/ico/ico_bsky.png" alt=""/>
                    </p>
                </div>
            </div>
        </div>
    );
}