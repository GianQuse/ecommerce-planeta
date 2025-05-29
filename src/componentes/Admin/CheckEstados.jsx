import { useState } from 'react';
import styles from './Pedidos.module.css';

export const CheckEstados = ({ estado }) => {
    const [selectedEstado, setSelectedEstado] = useState('');

    const handleRadioChange = (e) => {
        setSelectedEstado(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Nuevo estado seleccionado:', selectedEstado);
    };

    const renderRadios = () => {
        switch (estado.toUpperCase()) {
            case 'GENERADO':
                return ['EN COCINA', 'CANCELADO'];
            case 'EN COCINA':
                return ['EN CAMINO', 'CANCELADO'];
            case 'EN CAMINO':
                return ['ENTREGADO', 'CANCELADO'];
            default:
                return [];
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.estado}>
            <span className={styles.estadoTitulo}>Estado del Pedido:</span>
            <span className={`${styles.estadoActual} ${styles[estado.toUpperCase().replace(" ", "_")]}`}>
                {estado}
            </span>
            <div className={styles.estadoRadios}>
                {renderRadios().map((option) => (
                    <label key={option}>
                        <input
                            type="radio"
                            name="estado"
                            value={option}
                            checked={selectedEstado === option}
                            onChange={handleRadioChange}
                        />
                        {option}
                    </label>
                ))}
            </div>
            <button type="submit" className={styles.estadoBoton} disabled={!selectedEstado}>
                CAMBIAR ESTADO
            </button>
        </form>
    );
};