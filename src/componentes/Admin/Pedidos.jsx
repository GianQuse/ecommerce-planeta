import { useApiMenu } from "../../hooks/useApi";
import { CheckEstados } from "./CheckEstados";
import styles from './Pedidos.module.css';

export const Pedidos = () => {
    const { items, loading } = useApiMenu('orders');

    const formatDate = (timestamp) => {
        if (timestamp && timestamp.toDate) {
            const fecha = timestamp.toDate();
            const opciones = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return new Intl.DateTimeFormat('es-AR', opciones).format(fecha);
        }
        return 'Fecha no disponible';
    };

    const agruparPorCategoria = (productos) => {
        return productos.reduce((acumulador, producto) => {
            const { categoria } = producto;
            if (!acumulador[categoria]) {
                acumulador[categoria] = [];
            }
            acumulador[categoria].push(producto);
            return acumulador;
        }, {});
    };

    if (items.length === 0 && !loading) {
        return <p>No hay pedidos disponibles.</p>;
    }

    return (
        <div>
            <h2 className={styles.titulo}>Pedidos</h2>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                items.map((item) => (
                    <div key={item.id} className={styles.container}>
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
                        <CheckEstados estado={item.estado} />
                    </div>
                ))
            )}
        </div>
    );
};
