import { useApiOrders } from "../../hooks/useApi";
import { CheckEstados } from "../Admin/CheckEstados";
import styles from './DeliveryUser.module.css';

export const DeliveryUser = () => {
    const { items, loading } = useApiOrders();

    const pedidoAsignado = !loading ? items.filter(item => item.delivery === "GCje4tsme7bihrye7LC0") : [];

    return (
        <div className={styles.deliveryContainer}>
            <h2>Pedidos Asignados</h2>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                pedidoAsignado.length > 0 ? (
                    pedidoAsignado.map((pedido) => (
                        <div key={pedido.id} className={styles.pedidoCard}>
                            <div className={styles.pedidoInfo}>
                                <p><strong>Nombre:</strong> {pedido.comprador.nombre}</p>
                                <p><strong>Apellido:</strong> {pedido.comprador.apellido}</p>
                                <p><strong>Dirección:</strong> {pedido.comprador.direccion}</p>
                                <p><strong>Teléfono:</strong> {pedido.comprador.telefono}</p>
                                <p><strong>Total:</strong> ${pedido.total}</p>
                            </div>
                            <CheckEstados estado={pedido.estado} id={pedido.id} />
                        </div>
                    ))
                ) : (
                    <p>No hay pedidos asignados.</p>
                )
            )}
        </div>
    )
}