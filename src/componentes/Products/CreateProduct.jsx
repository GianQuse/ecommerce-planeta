import { useState } from 'react';

export default function CreateProduct() {

    const [form, setForm] = useState({
        imagen: '',
        categoria: '',
        nombre: '',
        descripcion: '',
        precio: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response = await fetch(
                'http://localhost:3000/products',
                {
                    method: 'POST',

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

            console.log(data);

            // Si el backend devuelve error
            if (!response.ok) {

                throw new Error(data.message);

            }

            alert('Producto creado correctamente');

            // Limpiar formulario
            setForm({
                imagen: '',
                categoria: '',
                nombre: '',
                descripcion: '',
                precio: ''
            });

        } catch (error) {

            console.log(error);

            alert(error.message);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="create-product-container">

            <h2>Crear producto</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="imagen"
                    placeholder="URL imagen"
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

                    {
                        loading
                            ? 'Creando...'
                            : 'Crear producto'
                    }

                </button>

            </form>

        </div>
    );
}