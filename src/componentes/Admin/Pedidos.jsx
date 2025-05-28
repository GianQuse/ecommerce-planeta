import { useApiMenu } from "../../hooks/useApi";
import styles from './Pedidos.module.css';

export const Pedidos = () => {
    const { items, loading } = useApiMenu('orders');

    console.log(items)

    const formatDate = (timestamp) => {
        if (timestamp && timestamp.toDate) {
            const fecha = timestamp.toDate();
            const opciones = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return new Intl.DateTimeFormat('es-AR', opciones).format(fecha);
        }
        return 'Fecha no disponible';
    };

    function agruparPorCategoria(productos) {
        return productos.reduce((acumulador, producto) => {
            const { categoria } = producto;
            if (!acumulador[categoria]) {
                acumulador[categoria] = [];
            }
            acumulador[categoria].push(producto);
            return acumulador;
        }, {});
    }

    if (items.length === 0 && !loading) {
        return <p className={styles.noPedidos}>No hay pedidos disponibles.</p>;
    }

    return (
        <div className={styles.pedidosContainer}>
            <h2 className={styles.titulo}>Pedidos</h2>
            {loading ? (
                <p className={styles.loading}>Cargando...</p>
            ) : (
                <div className={styles.pedidosGrid}>
                    {items.map((item) => (
                        <div key={item.id} className={styles.pedidoItem}>
                            <h3>DATOS:</h3>
                            <p><strong>Nombre:</strong> {item.comprador.nombre}</p>
                            <p><strong>Apellido:</strong> {item.comprador.apellido}</p>
                            <p><strong>Dirección:</strong> {item.comprador.direccion}</p>
                            <p><strong>Teléfono:</strong> {item.comprador.telefono}</p>
                            <p><strong>Fecha:</strong> {formatDate(item.fecha)}</p>
                            <p className={styles.total}>
                                <strong>Total:</strong> <span className={styles.totalNumber}>${item.total}</span>
                            </p>
                            <h3>PRODUCTOS:</h3>
                            {Object.entries(agruparPorCategoria(item.productos)).map(([categoria, items]) => (
                                <div key={categoria}>
                                    <h2>{categoria}</h2>
                                    {items.map((producto, index) => (
                                        <p key={index}>{producto.nombre}</p>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>

    );
};