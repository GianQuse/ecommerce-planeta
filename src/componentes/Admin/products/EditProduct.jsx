import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { API_URL } from '../../../config/api';

export default function EditProduct() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [form, setForm] = useState({
        imagen: '',
        categoria: '',
        nombre: '',
        descripcion: '',
        precio: ''
    });

    const [loading, setLoading] = useState(true);

    // Obtener producto
    useEffect(() => {

        fetch(`${API_URL}/products/${id}`)

            .then((response) => response.json())

            .then((data) => {

                setForm({
                    imagen: data.product.imagen || '',
                    categoria: data.product.categoria || '',
                    nombre: data.product.nombre || '',
                    descripcion: data.product.descripcion || '',
                    precio: data.product.precio || ''
                });

            })

            .catch((error) => {

                console.log(error);

                alert('Error al cargar producto');

            })

            .finally(() => {

                setLoading(false);

            });

    }, [id]);

    // Cambios inputs
    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    // Guardar cambios
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(

                `${API_URL}/products/${id}`,

                {
                    method: 'PATCH',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        ...form,
                        precio: Number(form.precio)
                    })
                }

            );

            const data = await response.json();

            if (!response.ok) {

                throw new Error(data.message);

            }

            alert('Producto actualizado');

            navigate('/admin/products');

        } catch (error) {

            console.log(error);

            alert(error.message);

        }

    };

    if (loading) {

        return <h2>Cargando producto...</h2>;

    }

    return (

        <div className="create-product-container">

            <h2>Editar producto</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="imagen"
                    placeholder="Imagen"
                    value={form.imagen}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="categoria"
                    placeholder="Categoría"
                    value={form.categoria}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={form.nombre}
                    onChange={handleChange}
                />

                <textarea
                    name="descripcion"
                    placeholder="Descripción"
                    value={form.descripcion}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="precio"
                    placeholder="Precio"
                    value={form.precio}
                    onChange={handleChange}
                />

                <button type="submit">

                    Guardar cambios

                </button>

            </form>

        </div>
    );
}