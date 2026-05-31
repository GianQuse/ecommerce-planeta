import { useEffect, useState } from 'react';

import { API_URL } from '../config/api';

export function useApiState() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    return { items, setItems, loading, setLoading };
}

export function useApiMenu() {

    const { items, setItems, loading, setLoading } = useApiState();

    useEffect(() => {

        fetch(`${API_URL}/products`)

            .then((response) => response.json())

            .then((data) => {
                setItems(data.products);
            })

            .catch((error) => {
                console.log(error);
            })

            .finally(() => {
                setLoading(false);
            });

    }, []);

    return { items, loading };
}

export function useApiList(categoria) {

    const { items, setItems, loading, setLoading } = useApiState();

    useEffect(() => {

        fetch(`${API_URL}/products`)

            .then((response) => response.json())

            .then((data) => {

                // Filtrar categoría
                const productosFiltrados = data.products.filter(
                    item => item.categoria === categoria
                );

                setItems(productosFiltrados);

            })

            .catch((error) => {

                console.log(error);

            })

            .finally(() => {

                setLoading(false);

            });

    }, [categoria]);

    return { items, loading };
}

export function useApiDetail(id) {

    const { items, setItems, loading, setLoading } = useApiState();

    useEffect(() => {

        fetch(`${API_URL}/products/${id}`)

            .then((response) => response.json())

            .then((data) => {

                setItems(data.product);

            })

            .catch((error) => {

                console.log(error);

            })

            .finally(() => {

                setLoading(false);

            });

    }, [id]);

    return { items, loading };
}

export function useApiOrders() {

    const {

        items,

        setItems,

        loading,

        setLoading

    } = useApiState();

    useEffect(() => {

        fetch(`${API_URL}/orders`)

            .then((response) => response.json())

            .then((data) => {

                setItems(data.orders);

            })

            .catch((error) => {

                console.log(error);

            })

            .finally(() => {

                setLoading(false);

            });

    }, []);

    return {

        items,

        loading

    };

}
