import { useState, useEffect } from 'react';
import { doc, getFirestore, updateDoc, setDoc } from "firebase/firestore";
import Swal from 'sweetalert2';
import styles from './Pedidos.module.css';
import { useDelivery } from './DeliveryContext';

export const CheckEstados = ({ estado, id, delivery, mostrarEstado }) => {

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

            if (opcion) {
                await setDoc(docRef, {
                    estado: selectedEstado,
                    delivery: opcion,
                }, { merge: true });
            } else {
                await updateDoc(docRef, {
                    estado: selectedEstado,
                });
            }

            setSelectedEstado('');

        } catch (error) {
            alert("Hubo un error al actualizar el estado");
        }
    };
    // FIN CAMBIAR ESTADO DEL PEDIDO

    // SELECT PARA ASIGNAR DELIVERY
    const { deliveries: items, loading } = useDelivery();
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

    //Filtrar delivery asignado a un pedido

    const filteredDelivery = !loading ? items.filter(item => item.id === delivery) : [];

    //Fin filtrar delivery asignado a un pedido

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
        return true;
    };
    // FIN RENDERIZAR BOTONES SEGÚN ESTADO

    return (
        <div className={styles.estado}>
            <form onSubmit={handleSubmit} className={styles.estadoForm}>
                {mostrarEstado &&
                    <div className={styles.estadoTituloContainer}>
                        <span className={styles.estadoTitulo}>Estado del Pedido:</span>
                        <span className={`${styles.estadoActual} ${styles[estado.toUpperCase().replace(" ", "_")]}`}>
                            {estado}
                        </span>
                        <p>{filteredDelivery.length > 0 ? <span> Delivery Asignado: </span> : ''}{filteredDelivery[0]?.nombre} {filteredDelivery[0]?.apellido}</p>
                    </div>}
                {renderButtons() &&
                    <div className={styles.estadoRadiosContainer}>
                        <p>Cambiar Estado:</p>
                        <div className={styles.radioGroup}>
                            {renderRadios()}
                        </div>
                        <button type="submit" className={styles.estadoBoton} disabled={!selectedEstado}>
                            {selectedEstado === 'EN CAMINO' ? "CAMBIAR Y ASIGNAR" : "CAMBIAR"}
                        </button>
                        <button type="button" className={`${styles.estadoBoton} ${styles.estadoBotonCancelar}`} disabled={!selectedEstado} onClick={() => setSelectedEstado('')}>
                            CANCELAR
                        </button>
                    </div>}
            </form>
        </div>
    );
};
