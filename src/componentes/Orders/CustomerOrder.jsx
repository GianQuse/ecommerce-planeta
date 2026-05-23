import { useApiOrders } from '../../hooks/useApi';

import { agruparPorCategoria } from '../../utils/pedidos/agruparCategoria';

import styles from './CustomerOrder.module.css';


export const CustomerOrder = () => {

    const checkPedido = localStorage.getItem('orderId');

    const { items, loading } = useApiOrders();

    // Buscar pedido actual
    const miPedido = items.find(

        (pedido) => pedido._id === checkPedido

    );

    if (loading) {

        return <p>Cargando Pedidos...</p>;

    }

    return (

        <div>

            <h2 className={styles.titulo}>
                Mi pedido
            </h2>

            {

                miPedido ? (

                    <div className={styles.pedidoCard}>

                        <div className={styles.container}>

                            {/* Datos cliente */}
                            <div className={styles.datos}>

                                <p>

                                    <strong>Nombre:</strong>

                                    {" "}

                                    {miPedido.cliente.nombre}

                                </p>

                                <p>

                                    <strong>Apellido:</strong>

                                    {" "}

                                    {miPedido.cliente.apellido}

                                </p>

                                <p>

                                    <strong>Teléfono:</strong>

                                    {" "}

                                    {miPedido.cliente.telefono}

                                </p>

                                <p>

                                    <strong>Dirección:</strong>

                                    {" "}

                                    {miPedido.cliente.direccion}

                                </p>

                                <p>

                                    <strong>Total:</strong>

                                    {" "}

                                    ${miPedido.total}

                                </p>

                            </div>

                            {/* Productos */}
                            <div className={styles.productos}>

                                {

                                    Object.entries(

                                        agruparPorCategoria(
                                            miPedido.productos
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

                            {/* Estado pedido */}
                            <div className={styles.estado}>

                                <span className={styles.estadoTitulo}>

                                    Estado del Pedido:

                                </span>

                                <span

                                    className={`

                                        ${styles.estadoActual}

                                        ${styles[
                                        miPedido.estado
                                            .toUpperCase()
                                            .replace(" ", "_")
                                        ]}

                                    `}

                                >

                                    {miPedido.estado}

                                </span>

                            </div>

                        </div>

                    </div>

                ) : (

                    <p>No se encontró el pedido.</p>

                )

            }

        </div>

    );

};