import { createContext, useState, useEffect } from "react";

export const cartContext = createContext();

const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(() => {

        const storedCart = localStorage.getItem("cart");

        return storedCart
            ? JSON.parse(storedCart)
            : [];

    });

    // Guardar carrito en localStorage
    useEffect(() => {

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

    }, [cart]);

    // Agregar producto
    const onAdd = (product, quantity) => {

        setCart((prev) => {

            const existingProduct = prev.findIndex(

                (item) =>
                    item.product._id === product._id

            );

            // Si ya existe
            if (existingProduct !== -1) {

                return prev.map((item) =>

                    item.product._id === product._id

                        ? {
                            ...item,
                            quantity: item.quantity + quantity
                        }

                        : item

                );

            }

            // Si no existe
            return [

                ...prev,

                {
                    product,
                    quantity
                }

            ];

        });

    };

    // Vaciar carrito
    const clearCart = () => {

        setCart([]);

    };

    // Eliminar producto
    const removeItem = (productId) => {

        setCart(

            cart.filter(

                (item) =>
                    item.product._id !== productId

            )

        );

    };

    // Total productos
    const totalItemsInCart = () => {

        return cart.reduce(

            (acc, item) => {

                return acc + item.quantity;

            },

            0

        );

    };

    // Total precio
    const totalPrice = () => {

        return cart.reduce(

            (acc, item) => {

                return acc + (
                    item.product.precio *
                    item.quantity
                );

            },

            0

        );

    };

    // Formato pesos argentinos
    const formatAsPesoArgentino = (amount) => {

        return new Intl.NumberFormat(

            'es-AR',

            {
                style: 'currency',
                currency: 'ARS',
                minimumFractionDigits: 0,
            }

        )

            .format(amount)

            .replace(/\s/g, '');

    };

    return (

        <cartContext.Provider

            value={{

                cart,

                onAdd,

                clearCart,

                removeItem,

                totalPrice,

                totalItemsInCart,

                formatAsPesoArgentino,

            }}

        >

            {children}

        </cartContext.Provider>

    );

};

export default CartProvider;