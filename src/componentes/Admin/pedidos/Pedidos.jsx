import { useApiOrders } from '../../../hooks/useApi';
import { useNavigate } from "react-router-dom";
import CheckEstados from './CheckEstados';
import { useState } from "react";
import { agruparPorCategoria } from '../../../utils/pedidos/agruparCategoria';
import styles from './Pedidos.module.css';

export const Pedidos = () => {

    const { items, loading } = useApiOrders();

    const [filtroEstado, setFiltroEstado] = useState("TODOS");

    const navigate = useNavigate();

    // Formatear fecha MongoDB
    const formatDate = (fecha) => {

        if (!fecha) {

            return "Fecha no disponible";

        }

        return new Intl.DateTimeFormat(

            "es-AR",

            {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
            }

        ).format(new Date(fecha));

    };

    // Estados válidos
    const estadosDisponibles = [

        "TODOS",

        "Generado",

        "En cocina",

        "En camino",

        "Entregado",

        "Cancelado"

    ];

    // Filtrar pedidos
    const pedidosFiltrados =

        filtroEstado === "TODOS"

            ? items

            : items.filter(

                (item) => item.estado === filtroEstado

            );

    if (loading) {

        return <p>Cargando...</p>;

    }

    return (

        <div>

            <h2 className={styles.titulo}>
                Pedidos
            </h2>

            {/* Navegación estados */}
            <div className={styles.navEstados}>

                {

                    estadosDisponibles.map((estado) => (

                        <button

                            key={estado}

                            className={`

                                ${styles.estadoBotonNav}

                                ${filtroEstado === estado
                                    ? styles.activo
                                    : ""
                                }

                            `}

                            onClick={() => setFiltroEstado(estado)}

                        >

                            {estado}

                        </button>

                    ))

                }

            </div>

            {

                pedidosFiltrados.length === 0 ? (

                    <p>

                        No hay pedidos {filtroEstado}

                    </p>

                ) : (

                    pedidosFiltrados.map((item) => (

                        <div

                            key={item._id}

                            className={styles.pedidoCard}

                        >

                            <div className={styles.container}>

                                {/* Datos cliente */}
                                <div className={styles.datos}>

                                    <h3>
                                        DATOS:
                                    </h3>

                                    <p>

                                        <strong>Nombre:</strong>

                                        {" "}

                                        {item.cliente.nombre}

                                    </p>

                                    <p>

                                        <strong>Apellido:</strong>

                                        {" "}

                                        {item.cliente.apellido}

                                    </p>

                                    <p>

                                        <strong>Dirección:</strong>

                                        {" "}

                                        {item.cliente.direccion}

                                    </p>

                                    <p>

                                        <strong>Teléfono:</strong>

                                        {" "}

                                        {item.cliente.telefono}

                                    </p>

                                    <p>

                                        <strong>Fecha:</strong>

                                        {" "}

                                        {formatDate(item.fecha)}

                                    </p>

                                    <p>

                                        <strong>Total:</strong>

                                        {" "}

                                        ${item.total}

                                    </p>

                                </div>

                                {/* Productos */}
                                <div className={styles.productos}>

                                    <h3>
                                        PRODUCTOS:
                                    </h3>

                                    {

                                        Object.entries(

                                            agruparPorCategoria(
                                                item.productos
                                            )

                                        ).map(

                                            ([categoria, productos]) => (

                                                <div key={categoria}>

                                                    <h4>

                                                        {categoria}

                                                    </h4>

                                                    <ul>

                                                        {

                                                            productos.map(

                                                                (
                                                                    producto,
                                                                    index
                                                                ) => (

                                                                    <li key={index}>

                                                                        <strong>

                                                                            {
                                                                                producto.nombre
                                                                            }

                                                                            {" x "}

                                                                            {
                                                                                producto.cantidad
                                                                            }

                                                                        </strong>

                                                                        {" "}

                                                                        <span>

                                                                            $
                                                                            {
                                                                                producto.precio
                                                                            }

                                                                        </span>

                                                                    </li>

                                                                )

                                                            )

                                                        }

                                                    </ul>

                                                </div>

                                            )

                                        )

                                    }

                                </div>

                                {/* Estados */}
                                <CheckEstados

                                    estadoActual={item.estado}

                                    id={item._id}

                                />

                            </div>

                        </div>

                    ))

                )

            }

            {/* Botones admin */}
            <button

                className={styles.adminCreateButton}

                onClick={() => navigate('/admin/create-product')}

            >

                Crear producto

            </button>

            <button

                className={styles.adminCreateButton}

                onClick={() => navigate('/admin/products')}

            >

                Ver productos

            </button>

        </div>

    );

};