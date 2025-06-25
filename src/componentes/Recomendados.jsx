import { useApiMenu } from '../hooks/useApi';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cartContext } from './Cart/CartContext';


export default function Recomendado({ currentID }) {
    const { items: menu, loading } = useApiMenu();
    const [recomendados, setRecomendados] = useState([]);
    const { formatAsPesoArgentino } = useContext(cartContext);

    useEffect(() => {
        if (!loading && menu.length > 0) {
            // Extraer todos los platos de todas las categorías
            const todosLosPlatos = menu.flatMap(categoria =>
                categoria.platos.map(plato => ({
                    ...plato,
                    categoria: categoria.tipo
                }))
            );

            // Filtrar para evitar el plato actual
            const platosFiltrados = todosLosPlatos.filter(plato => plato.ID !== currentID);

            // Mezclar aleatoriamente
            const mezclado = platosFiltrados.sort(() => Math.random() - 0.5);

            // Tomar los primeros 4
            const seleccionados = mezclado.slice(0, 4);

            setRecomendados(seleccionados);
        }
    }, [loading, menu, currentID]);

    if (loading) return <p>Cargando recomendaciones...</p>;

    return (
        <div className="todos-platos-lista">
            <div className="recomendados-titulo-container">
                <h3 className="recomendados-titulo">Recomendados para ti</h3>
            </div>
            {recomendados.map((plato, index) => (
                <Link to={`/detail/${plato.ID}`} key={index} className="menu-principal-link">
                    <div className="plato-detalle">
                        <div className='plato-detalle-texto'>
                            <span className="nombre-plato">{plato.nombre}</span>
                            <span className="descripcion-plato">{plato.descripcion}</span>
                            <span className="precio-plato">{formatAsPesoArgentino(plato.precio)}</span>
                        </div>
                        <div className="plato-detalle-imagen">
                            <img src={plato.imagen} alt={plato.nombre} />
                            <div className="plato-boton">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                            </div>
                        </div>

                    </div>
                </Link>
            ))}
        </div>
    );
}
