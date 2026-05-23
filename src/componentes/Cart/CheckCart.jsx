import styles from './CheckCart.module.css';

import { cartContext } from '../../context/CartContext';

import { useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

import withReactContent from 'sweetalert2-react-content';


export const CheckCart = () => {

    const navigate = useNavigate();

    const MySwal = withReactContent(Swal);

    const {

        totalPrice,

        cart,

        clearCart,

    } = useContext(cartContext);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [values, setValues] = useState({

        nombre: "",

        apellido: "",

        direccion: "",

        telefono: "",

    });

    // Productos para enviar al backend
    const productosFiltrados = cart.map((item) => ({

        producto: item.product._id,

        categoria: item.product.categoria,

        nombre: item.product.nombre,

        cantidad: item.quantity,

        precio: item.product.precio

    }));

    // Inputs
    function onChange(e) {

        setValues({

            ...values,

            [e.target.name]: e.target.value,

        });

    }

    // Crear pedido
    const handleCreateOrder = async () => {

        try {

            const response = await fetch(

                'http://localhost:3000/orders',

                {

                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({

                        cliente: {

                            nombre: values.nombre.toUpperCase(),

                            apellido: values.apellido.toUpperCase(),

                            direccion: values.direccion.toUpperCase(),

                            telefono: values.telefono.toUpperCase(),

                        },

                        productos: productosFiltrados,

                        total: totalPrice()

                    })

                }

            );

            const data = await response.json();

            // Error backend
            if (!response.ok) {

                throw new Error(data.message);

            }

            // Guardar ID pedido
            localStorage.setItem(

                "orderId",

                data.order._id

            );

            // Success
            MySwal.fire({

                title: "Pedido creado con éxito",

                html: `Su orden: <strong>${data.order._id}</strong>`,

                icon: "success",

                showConfirmButton: true,

                confirmButtonText: "Aceptar",

            });

            clearCart();

            setTimeout(() => {

                navigate("/");

            }, 3000);

        } catch (error) {

            MySwal.fire({

                title: "Error al crear pedido",

                text: error.message,

                icon: "error",

                showConfirmButton: true,

                confirmButtonText: "Aceptar",

            });

        } finally {

            setIsSubmitting(false);

        }

    };

    // Submit form
    const handleSubmit = async (e) => {

        e.preventDefault();

        setIsSubmitting(true);

        await handleCreateOrder();

    };

    return (

        <div className={styles.container}>

            <form

                className={styles.form}

                onSubmit={handleSubmit}

            >

                <h2>Finalizar Compra</h2>

                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    className={styles.input}
                    onChange={onChange}
                    required
                />

                <input
                    type="text"
                    name="apellido"
                    placeholder="Apellido"
                    className={styles.input}
                    onChange={onChange}
                />

                <input
                    type="text"
                    name="direccion"
                    placeholder="Dirección"
                    className={styles.input}
                    onChange={onChange}
                    required
                />

                <input
                    type="tel"
                    name="telefono"
                    placeholder="Teléfono"
                    className={styles.input}
                    onChange={onChange}
                    required
                />

                <button
                    type="submit"
                    className={styles.button}
                    disabled={isSubmitting}
                >

                    {
                        isSubmitting
                            ? "Enviando..."
                            : "Enviar"
                    }

                </button>

            </form>

        </div>

    );

};