import { useApiMenu } from '../hooks/useApi';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Recomendado({currentID}) {
    const { items: menu, loading } = useApiMenu();
    const [recomendados, setRecomendados] = useState([]);

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
        <div className="recomendado-contenedor">
            <h3>Recomendado para ti</h3>
            <div className="recomendado-grid">
                {recomendados.map((plato) => (
                    <Link to={`/detail/${plato.ID}`} key={plato.ID}>
                    <div className="recomendado-item">
                        <img src={plato.imagen} alt={plato.nombre} />
                        <p>{plato.nombre}</p>
                        <p><strong>${plato.precio}</strong></p>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
