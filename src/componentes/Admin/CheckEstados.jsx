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
                return (
                    <>
                        <label>
                            <input
                                type="radio"
                                name="estado"
                                value="EN COCINA"
                                checked={selectedEstado === 'EN COCINA'}
                                onChange={handleRadioChange}
                            />
                            En cocina
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="estado"
                                value="CANCELADO"
                                checked={selectedEstado === 'CANCELADO'}
                                onChange={handleRadioChange}
                            />
                            Cancelado
                        </label>
                    </>
                );
            case 'EN COCINA':
                return (
                    <>
                        <label>
                            <input
                                type="radio"
                                name="estado"
                                value="EN CAMINO"
                                checked={selectedEstado === 'EN CAMINO'}
                                onChange={handleRadioChange}
                            />
                            En camino
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="estado"
                                value="CANCELADO"
                                checked={selectedEstado === 'CANCELADO'}
                                onChange={handleRadioChange}
                            />
                            Cancelado
                        </label>
                    </>
                );
            case 'EN CAMINO':
                return (
                    <>
                        <label>
                            <input
                                type="radio"
                                name="estado"
                                value="ENTREGADO"
                                checked={selectedEstado === 'ENTREGADO'}
                                onChange={handleRadioChange}
                            />
                            Entregado
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="estado"
                                value="CANCELADO"
                                checked={selectedEstado === 'CANCELADO'}
                                onChange={handleRadioChange}
                            />
                            Cancelado
                        </label>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.estado}>
            <form onSubmit={handleSubmit}>
                <h3>Estado del Pedido</h3>
                <p>{estado}</p>
                {renderRadios()}
                <button type="submit" disabled={!selectedEstado}>CAMBIAR ESTADO</button>
            </form>
        </div>
    );
};
