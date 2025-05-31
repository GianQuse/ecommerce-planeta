import { useState } from 'react';
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import Swal from 'sweetalert2';
import styles from './Pedidos.module.css';

export const CheckEstados = ({ estado, id }) => {
    const [selectedEstado, setSelectedEstado] = useState('');

    const handleRadioChange = (e) => {
        setSelectedEstado(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const db = getFirestore();
            const docRef = doc(db, "orders", id);

            if (selectedEstado === 'CANCELADO') {
                const { value: password } = await Swal.fire({
                    title: 'Confirmar acción',
                    text: 'Ingrese su contraseña para continuar',
                    input: 'password',
                    inputLabel: 'Contraseña',
                    inputPlaceholder: 'Escribe tu contraseña',
                    showCancelButton: true,
                    confirmButtonText: 'Confirmar',
                });
                if (!password || password !== "1234") {
                    setSelectedEstado('');
                    return;
                }
            }

            await updateDoc(docRef, {
                estado: selectedEstado,
            });

            setSelectedEstado('');

        } catch (error) {
            alert("Hubo un error al actualizar el estado");
        }
    };

    const renderRadios = () => {
        switch (estado.toUpperCase()) {
            case 'GENERADO':
                return (
                    <>
                        <label>
                            <input type="radio" name="estado" value="EN COCINA" checked={selectedEstado === 'EN COCINA'} onChange={handleRadioChange} />
                            En cocina
                        </label>
                        <label>
                            <input type="radio" name="estado" value="CANCELADO" checked={selectedEstado === 'CANCELADO'} onChange={handleRadioChange} />
                            Cancelado
                        </label>
                    </>
                );
            case 'EN COCINA':
                return (
                    <>
                        <label>
                            <input type="radio" name="estado" value="EN CAMINO" checked={selectedEstado === 'EN CAMINO'} onChange={handleRadioChange} />
                            En camino
                        </label>
                        <label>
                            <input type="radio" name="estado" value="CANCELADO" checked={selectedEstado === 'CANCELADO'} onChange={handleRadioChange} />
                            Cancelado
                        </label>
                    </>
                );
            case 'EN CAMINO':
                return (
                    <>
                        <label>
                            <input type="radio" name="estado" value="ENTREGADO" checked={selectedEstado === 'ENTREGADO'} onChange={handleRadioChange} />
                            Entregado
                        </label>
                        <label>
                            <input type="radio" name="estado" value="CANCELADO" checked={selectedEstado === 'CANCELADO'} onChange={handleRadioChange} />
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
            <form onSubmit={handleSubmit} className={styles.estadoForm}>
                <span className={styles.estadoTitulo}>Estado del Pedido:</span>
                <span className={`${styles.estadoActual} ${styles[estado.toUpperCase().replace(" ", "_")]}`}>
                    {estado}
                </span>
                <div className={styles.radioGroup}>
                    {renderRadios()}
                </div>
                <button type="submit" className={styles.estadoBoton} disabled={!selectedEstado}>
                    CAMBIAR ESTADO
                </button>
            </form>
        </div>
    );
};
