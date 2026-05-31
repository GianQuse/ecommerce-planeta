import { useState, useEffect } from "react";

import { API_URL } from "../../../config/api";

import Swal from "sweetalert2";

import styles from "./Pedidos.module.css";

export default function CheckEstados({

    id,

    estadoActual

}) {

    const [estado, setEstado] = useState(estadoActual);

    useEffect(() => {

        setEstado(estadoActual);

    }, [estadoActual]);

    const handleEstado = async (nuevoEstado) => {

        try {

            setEstado(nuevoEstado);

            const response = await fetch(

                `${API_URL}/orders/${id}`,

                {
                    method: "PATCH",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        estadoPedido: nuevoEstado
                    })
                }

            );

            const data = await response.json();

            if (data.status !== "success") {

                throw new Error(data.message);

            }

            Swal.fire({

                title: "Estado actualizado",

                text: `El pedido ahora está "${nuevoEstado}"`,

                icon: "success",

                timer: 1500,

                showConfirmButton: false

            });

        } catch (error) {

            console.log(error);

            Swal.fire({

                title: "Error",

                text: error.message,

                icon: "error"

            });

        }

    };

    return (

        <div className={styles.estadosContainer}>

            <button

                className={`${styles.estadoButton} ${estado === "Generado"
                    ? styles.estadoActivo
                    : ""
                    }`}

                onClick={() => handleEstado("Generado")}

            >

                Generado

            </button>

            <button

                className={`${styles.estadoButton} ${estado === "En cocina"
                    ? styles.estadoActivo
                    : ""
                    }`}

                onClick={() => handleEstado("En cocina")}

            >

                En cocina

            </button>

            <button

                className={`${styles.estadoButton} ${estado === "En camino"
                    ? styles.estadoActivo
                    : ""
                    }`}

                onClick={() => handleEstado("En camino")}

            >

                En camino

            </button>

            <button

                className={`${styles.estadoButton} ${estado === "Entregado"
                    ? styles.estadoActivo
                    : ""
                    }`}

                onClick={() => handleEstado("Entregado")}

            >

                Entregado

            </button>

            <button

                className={`${styles.estadoButton} ${estado === "Cancelado"
                    ? styles.estadoActivo
                    : ""
                    }`}

                onClick={() => handleEstado("Cancelado")}

            >

                Cancelado

            </button>

        </div>

    );

}