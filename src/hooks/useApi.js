import { collection, getDocs, getFirestore, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export function useApiState() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    return { items, setItems, loading, setLoading };
}

export function useApiMenu() {
    const { items, setItems, loading, setLoading } = useApiState();

    useEffect(() => {
        const db = getFirestore()
        const menuCollection = collection(db, 'menu');
        getDocs(menuCollection).then((response) => {
            const responseMapped = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setItems(responseMapped);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return { items, loading };
}

export function useApiList(categoria) {
    const { items, setItems, loading, setLoading } = useApiState();

    useEffect(() => {
        const db = getFirestore()
        const menuCollection = collection(db, 'menu');
        const queryCollection = query(menuCollection, where('tipo', '==', categoria));

        getDocs(queryCollection).then((response) => {
            const responseMapped = response.docs[0].data().platos || [];
            setItems(responseMapped);
        }).finally(() => {
            setLoading(false);
        });
    }, [categoria]);

    return { items, loading };
}

export function useApiDetail(ID) {
    const { items, setItems, loading, setLoading } = useApiState();

    useEffect(() => {
        const db = getFirestore()
        const menuCollection = collection(db, 'menu');
        getDocs(menuCollection).then((response) => {
            const responseMapped = response.docs.map((doc) => ({ ...doc.data() }));
            let platoEncontrado = null;
            for (const item of responseMapped) {
                const plato = item.platos.find(p => p.ID === ID);
                if (plato) {
                    platoEncontrado = {
                        ...plato,
                        categoria: item.tipo,
                    };
                    break;
                }
            }
            setItems(platoEncontrado);
        }).finally(() => {
            setLoading(false);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }, []);

    return { items, loading };
}

export function useApiOrders() {
    const { items, setItems, loading, setLoading } = useApiState();

    useEffect(() => {
        const db = getFirestore();
        const ordersCollection = collection(db, 'orders');

        const orderedQuery = query(ordersCollection, orderBy('fecha', 'desc'));

        const unsubscribe = onSnapshot(orderedQuery, (snapshot) => {
            const responseMapped = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setItems(responseMapped);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { items, loading };
}
