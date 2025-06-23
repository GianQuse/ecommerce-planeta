import { useNavigate, useLocation } from "react-router-dom"

export const BotonPrincipal = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const buttomText = location.pathname === '/' ? 'Bienvenido/a' : 'Volver a Inicio';

    const isHomePage = location.pathname === '/';
    
    return (
        <div className="contenedorBotonCarta">
            <button onClick={()=> navigate('/')} className="botonCarta" disabled={isHomePage}>{buttomText}</button>
        </div>
    )
}