import { createContext, useContext } from 'react';

const DeliveryContext = createContext();

export const DeliveryProvider = ({ children }) => {

    return (

        <DeliveryContext.Provider value={{}}>

            {children}

        </DeliveryContext.Provider>

    );

};

export const useDelivery = () => useContext(DeliveryContext);