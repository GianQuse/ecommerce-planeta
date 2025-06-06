import { useState } from "react";
import { useApiOrders } from "../../hooks/useApi";
import { CheckEstados } from "../Admin/CheckEstados";
import styles from './DeliveryUser.module.css';

export const DeliveryUser = () => {
    const { items, loading } = useApiOrders();

    const [filtroEstado, setFiltroEstado] = useState("EN CAMINO");

    const pedidoAsignado = !loading ? items.filter(item => item.delivery === "GCje4tsme7bihrye7LC0") : [];

    const pedidosFiltrados = pedidoAsignado.filter(item => item.estado === filtroEstado);

    const countPedidos = (estado) => {
        return pedidoAsignado.filter(item => item.estado === estado).length;
    }

    return (
        <div className={styles.deliveryContainer}>
            <h2 className={styles.titulo}>Pedidos Asignados</h2>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                pedidoAsignado.length > 0 ? (
                    <>
                        <div className={styles.botonesContainer}>
                            <button
                                className={filtroEstado === "EN CAMINO" ? styles.botonFiltro + " " + styles.activo : styles.botonFiltro}
                                onClick={() => setFiltroEstado("EN CAMINO")}
                            >
                                {`PENDIENTES (${countPedidos("EN CAMINO")})`}
                            </button>
                            <button
                                className={filtroEstado === "ENTREGADO" ? styles.botonFiltro + " " + styles.activo : styles.botonFiltro}
                                onClick={() => setFiltroEstado("ENTREGADO")}
                            >
                                {`ENTREGADOS (${countPedidos("ENTREGADO")})`}
                            </button>
                            {countPedidos("CANCELADO") > 0 ? (
                                <button
                                    className={filtroEstado === "CANCELADO" ? styles.botonFiltro + " " + styles.activo : styles.botonFiltro}
                                    onClick={() => setFiltroEstado("CANCELADO")}
                                >
                                    {`CANCELADOS (${countPedidos("CANCELADO")})`}
                                </button>) : null}
                        </div>
                        {pedidosFiltrados.length > 0 ? (
                            pedidosFiltrados.map((pedido) => (
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
                            <p>No hay pedidos con el estado seleccionado.</p>
                        )}
                    </>
                ) : (
                    <p>No hay pedidos asignados.</p>
                )
            )}
        </div>
    )
}