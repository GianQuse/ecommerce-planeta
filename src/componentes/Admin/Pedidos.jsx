import { useApiOrders } from "../../hooks/useApi";
import { CheckEstados } from "./CheckEstados";
import { useState } from "react";
import { agruparPorCategoria } from "../../utils/pedidos/agruparCategoria";
import styles from './Pedidos.module.css';

export const Pedidos = () => {
    const { items, loading } = useApiOrders();
    const [filtroEstado, setFiltroEstado] = useState("TODOS");

    const formatDate = (timestamp) => {
        if (timestamp && timestamp.toDate) {
            const fecha = timestamp.toDate();
            const opciones = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return new Intl.DateTimeFormat('es-AR', opciones).format(fecha);
        }
        return 'Fecha no disponible';
    };

    const estadosDisponibles = ["TODOS", "GENERADO", "EN COCINA", "EN CAMINO", "ENTREGADO", "CANCELADO"];

    const pedidosFiltrados = filtroEstado === "TODOS"
        ? items
        : items.filter(item => item.estado === filtroEstado);

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <div>
            <h2 className={styles.titulo}>Pedidos</h2>

            <div className={styles.navEstados}>
                {estadosDisponibles.map((estado) => (
                    <button
                        key={estado}
                        className={`${styles.estadoBotonNav} ${filtroEstado === estado ? styles.activo : ''}`}
                        onClick={() => setFiltroEstado(estado)}
                    >
                        {estado}
                    </button>
                ))}
            </div>

            {pedidosFiltrados.length === 0 ? (
                <p>No hay pedido {filtroEstado} disponible.</p>
            ) : (
                pedidosFiltrados.map((item) => (
                    <div key={item.id} className={styles.pedidoCard}>
                        <div className={styles.container}>
                            <div className={styles.datos}>
                                <h3>DATOS:</h3>
                                <p><strong>Nombre:</strong> {item.comprador.nombre}</p>
                                <p><strong>Apellido:</strong> {item.comprador.apellido}</p>
                                <p><strong>Dirección:</strong> {item.comprador.direccion}</p>
                                <p><strong>Teléfono:</strong> {item.comprador.telefono}</p>
                                <p><strong>Fecha:</strong> {formatDate(item.fecha)}</p>
                                <p><strong>Total:</strong> ${item.total}</p>
                            </div>
                            <div className={styles.productos}>
                                <h3>PRODUCTOS:</h3>
                                {Object.entries(agruparPorCategoria(item.productos)).map(([categoria, productos]) => (
                                    <div key={categoria}>
                                        <h4>{categoria}</h4>
                                        <ul>
                                            {productos.map((producto, index) => (
                                                <li key={index}>
                                                    <strong>{producto.nombre} x {producto.cantidad}</strong> <span>{producto.precio}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            <CheckEstados estado={item.estado} id={item.id} delivery={item.delivery} />
                        </div>
                    </div>
                )))}
        </div>
    );
};
