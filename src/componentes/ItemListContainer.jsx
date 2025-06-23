import { useParams, Link } from 'react-router-dom';
import { useApiList } from '../hooks/useApi';
import { useContext } from 'react';
import { cartContext } from './Cart/CartContext';
import Skeleton from './Skeleton';

export function ItemListContainer() {
    const { categoria } = useParams();

    const { formatAsPesoArgentino } = useContext(cartContext);

    const { items, loading } = useApiList(categoria);

    const skeletonVariants = {
        width: '90%',
        height: '95px',
        borderRadius: '12px',
        marginBottom: '20px',
    }

    return (
        <div className="todos-platos-lista">
            {loading ? (
                <Skeleton
                    count={8}
                    variants={[
                        { width: '35%', height: '32px', borderRadius: '12px', marginBottom: '30px' },
                        ...Array(7).fill(skeletonVariants)
                    ]}
                    marginTop={15}
                />
            ) : (
                <>
                    <h2 className="menu-title">{categoria}</h2>
                    {items.map((plato, index) => (
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
                </>
            )}
        </div>
    );
}