import { useApiMenu } from '../../hooks/useApi';
import { Link } from 'react-router-dom';

export default function AdminProducts() {

    const { items, loading } = useApiMenu();

    const handleDelete = async (id) => {

        const confirmDelete = confirm(
            '¿Eliminar producto?'
        );

        if (!confirmDelete) return;

        try {

            const response = await fetch(
                `http://localhost:3000/products/${id}`,
                {
                    method: 'DELETE'
                }
            );

            const data = await response.json();

            alert(data.message);

            window.location.reload();

        } catch (error) {

            console.log(error);

            alert('Error al eliminar');

        }

    };

    if (loading) {
        return <h2>Cargando...</h2>;
    }

    return (

        <div>

            <h2>Administrar productos</h2>

            {items.map((product) => (

                <div
                    key={product._id}
                    style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        marginBottom: '10px'
                    }}
                >

                    <img
                        src={product.imagen}
                        alt={product.nombre}
                        width="120"
                    />

                    <h3>{product.nombre}</h3>

                    <p>{product.categoria}</p>

                    <p>${product.precio}</p>

                    <Link to={`/admin/edit-product/${product._id}`}>
                        <button>
                            Editar
                        </button>
                    </Link>

                    <button
                        onClick={() => handleDelete(product._id)}
                    >
                        Eliminar
                    </button>

                </div>

            ))}

        </div>
    );
}