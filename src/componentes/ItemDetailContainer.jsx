import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useApiDetail } from '../hooks/useApi';
import { useContext, useEffect } from 'react';
import { cartContext } from './Cart/CartContext';
import Recomendados from './Recomendados';
import Skeleton from './Skeleton';
import Counter from './Contador';

export function ItemDetailContainer() {

    const { id } = useParams();

    const navigate = useNavigate();

    const { formatAsPesoArgentino } = useContext(cartContext);

    const { items, loading } = useApiDetail(id);

    useEffect(() => {

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    }, [id]);

    return (

        loading ? (

            <Skeleton
                count={2}
                variants={[
                    {
                        width: '85%',
                        maxWidth: '370px',
                        height: '500px',
                        borderRadius: '6px'
                    },
                    {
                        width: '30%',
                        maxWidth: '120px',
                        height: '32px',
                        margin: '30px 0 0 0',
                        borderRadius: '8px'
                    }
                ]}
                marginTop={20}
            />

        ) : (

            <div className='contenedor-plato'>

                <div className='contenedorPlatoImg'>

                    <img
                        src={items.imagen}
                        alt={items.nombre}
                        className="plato-img"
                    />

                    <button
                        className='plato-button'
                        onClick={() => navigate(-1)}
                    >

                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15 6L9 12L15 18"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                    </button>

                </div>

                <div className="plato-info">

                    <h3 className="plato-nombre">
                        {items.nombre}
                    </h3>

                    <h4 className="plato-descripcion">
                        {items.descripcion}
                    </h4>

                    <p className="plato-precio">
                        {formatAsPesoArgentino(items.precio)}
                    </p>

                </div>

                <Counter product={items} />

                <Recomendados currentID={id} />

            </div>

        )
    );
}