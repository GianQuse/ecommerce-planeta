import { createContext, useContext, useEffect, useState } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

const DeliveryContext = createContext();

export const DeliveryProvider = ({ children }) => {
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const db = getFirestore();
        const deliveryCollection = collection(db, 'delivery');

        getDocs(deliveryCollection)
            .then((snapshot) => {
                const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setDeliveries(data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <DeliveryContext.Provider value={{ deliveries, loading }}>
            {children}
        </DeliveryContext.Provider>
    );
};

export const useDelivery = () => useContext(DeliveryContext);
