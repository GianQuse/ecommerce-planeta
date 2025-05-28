import { useState } from 'react';
import styles from './CheckEstados.module.css';

export const CheckEstados = ({ estado }) => {

    const [checkboxState, setCheckboxState] = useState({
        enCocina: false,
        enCamino: false,
        entregado: false,
        cancelado: false,
    });

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setCheckboxState((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Estado del pedido:', checkboxState);
    };

    const renderCheckboxes = () => {
        switch (estado.toUpperCase()) {
            case 'GENERADO':
                return (
                    <label>
                        <input
                            type="checkbox"
                            name="enCocina"
                            checked={checkboxState.enCocina}
                            onChange={handleCheckboxChange}
                        />
                        En cocina
                    </label>
                );
            case 'EN COCINA':
                return (
                    <>
                        <label>
                            <input
                                type="checkbox"
                                name="enCamino"
                                checked={checkboxState.enCamino}
                                onChange={handleCheckboxChange}
                            />
                            En camino
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="cancelado"
                                checked={checkboxState.cancelado}
                                onChange={handleCheckboxChange}
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
                                type="checkbox"
                                name="entregado"
                                checked={checkboxState.entregado}
                                onChange={handleCheckboxChange}
                            />
                            Entregado
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="cancelado"
                                checked={checkboxState.cancelado}
                                onChange={handleCheckboxChange}
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
        <div className={styles.estadoContainer}>
            <form onSubmit={handleSubmit}>
                <h3>Estado del Pedido</h3>
                <p>{estado}</p>
                {renderCheckboxes()}
                <button type="submit">CAMBIAR ESTADO</button>
            </form>
        </div>
    );
};
