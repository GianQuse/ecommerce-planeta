import { useState, useEffect } from 'react';
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import Swal from 'sweetalert2';
import styles from './Pedidos.module.css';
import { useApiDelivery } from '../../hooks/useApi';

export const CheckEstados = ({ estado, id }) => {

    // CAMBIAR ESTADO DEL PEDIDO
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
                const { isConfirmed } = await Swal.fire({
                    title: 'Confirmar acción',
                    text: 'Ingrese 1234 para confirmar cambios',
                    input: 'password',
                    inputPlaceholder: 'Escribe la contraseña',
                    showCancelButton: true,
                    confirmButtonText: 'Confirmar',
                    inputValidator: (value) => {
                        if (!value) {
                            return 'Por favor ingrese la contraseña';
                        } else if (value !== "1234") {
                            return 'Contraseña incorrecta';
                        }
                    }
                });
                if (!isConfirmed) {
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
    // FIN CAMBIAR ESTADO DEL PEDIDO

    // SELECT PARA ASIGNAR DELIVERY
    const { items } = useApiDelivery();
    const [opcion, setOpcion] = useState('');

    const handleSelectChange = (e) => {
        setOpcion(e.target.value);
    };

    useEffect(() => {
        if (selectedEstado !== 'EN CAMINO') {
            setOpcion('');
        }
    }, [selectedEstado]);

    const renderDeliverySelect = () => {
        if (selectedEstado === 'EN CAMINO') {
            return (
                <select value={opcion} onChange={handleSelectChange}>
                    <option value="" disabled>-- Asigna un Delivery --</option>
                    {items.map(item => (
                        <option key={item.id} value={item.id}>{item.nombre} {item.apellido}</option>
                    ))}
                </select>
            );
        }
        return null;
    };
    // FIN SELECT PARA ASIGNAR DELIVERY

    // RENDERIZAR RADIO BUTTONS
    const renderRadioCancelado = () => {
        return (
            <label>
                <input type="radio" name="estado" value="CANCELADO" checked={selectedEstado === 'CANCELADO'} onChange={handleRadioChange} />
                Cancelado
            </label>
        );
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
                        {renderRadioCancelado()}
                    </>
                );
            case 'EN COCINA':
                return (
                    <>
                        <label>
                            <input type="radio" name="estado" value="EN CAMINO" checked={selectedEstado === 'EN CAMINO'} onChange={handleRadioChange} />
                            En camino
                        </label>
                        {renderDeliverySelect()}
                        {renderRadioCancelado()}
                    </>
                );
            case 'EN CAMINO':
                return (
                    <>
                        <label>
                            <input type="radio" name="estado" value="ENTREGADO" checked={selectedEstado === 'ENTREGADO'} onChange={handleRadioChange} />
                            Entregado
                        </label>
                        {renderRadioCancelado()}
                    </>
                );
            default:
                return null;
        }
    };
    // FIN RENDERIZAR RADIO BUTTONS

    // RENDERIZAR BOTONES SEGÚN ESTADO
    const renderButtons = () => {
        if (estado === 'CANCELADO' || estado === 'ENTREGADO') return null;

        return (
            <>
                <button type="submit" className={styles.estadoBoton} disabled={!selectedEstado}>
                    {selectedEstado === 'EN CAMINO' ? "CAMBIAR Y ASIGNAR" : "CAMBIAR"}
                </button>
                <button type="button" className={styles.estadoBoton} disabled={!selectedEstado} onClick={() => setSelectedEstado('')}>
                    CANCELAR
                </button>
            </>
        );
    };
    // FIN RENDERIZAR BOTONES SEGÚN ESTADO

    return (
        <div className={styles.estado}>
            <form onSubmit={handleSubmit} className={styles.estadoForm}>
                <div className={styles.estadoTituloContainer}>
                    <span className={styles.estadoTitulo}>Estado del Pedido:</span>
                    <span className={`${styles.estadoActual} ${styles[estado.toUpperCase().replace(" ", "_")]}`}>
                        {estado}
                    </span>
                </div>
                <div className={styles.estadoRadiosContainer}>
                    <div className={styles.radioGroup}>
                        {renderRadios()}
                    </div>
                    {renderButtons()}
                </div>
            </form>
        </div>
    );
};
