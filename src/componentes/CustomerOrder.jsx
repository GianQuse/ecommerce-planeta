import { useApiOrders } from '../hooks/useApi';
import { agruparPorCategoria } from '../utils/pedidos/agruparCategoria';
import styles from './CustomerOrder.module.css';

export const CustomerOrder = () => {
    const checkPedido = localStorage.getItem('orderId');
    const { items, loading } = useApiOrders();

    const miPedido = items.find((pedido) => pedido.id === checkPedido);

    if (loading) {
        return <p>Cargando Pedidos...</p>;
    }

    return (
        <div>
            <h2 className={styles.titulo}>Mi pedido</h2>
            {miPedido ? (
                <div className={styles.pedidoCard}>
                    <div className={styles.container}>
                        <div className={styles.datos}>
                            <p><strong>Nombre:</strong> {miPedido.comprador.nombre}</p>
                            <p><strong>Apellido:</strong> {miPedido.comprador.apellido}</p>
                            <p><strong>Teléfono:</strong> {miPedido.comprador.telefono}</p>
                            <p><strong>Dirección:</strong> {miPedido.comprador.direccion}</p>
                            <p><strong>Total:</strong> ${miPedido.total}</p>
                        </div>

                        <div className={styles.productos}>
                            {Object.entries(agruparPorCategoria(miPedido.productos)).map(
                                ([categoria, productos]) => (
                                    <div key={categoria}>
                                        <h4>{categoria}</h4>
                                        <ul>
                                            {productos.map((producto, index) => (
                                                <li key={index}>
                                                    <strong>{producto.nombre} x {producto.cantidad}</strong>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            )}
                        </div>

                        <div className={styles.estado}>
                            <span className={styles.estadoTitulo}>Estado del Pedido: </span>
                            <span className={`${styles.estadoActual} ${styles[miPedido.estado.toUpperCase().replace(" ", "_")]}`}>
                                {miPedido.estado}
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No se encontró el pedido.</p>
            )}
        </div>
    );
};
