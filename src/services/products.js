const API_URL = "http://localhost:3000";

export const getProducts = async () => {

    try {

        const response = await fetch(`${API_URL}/products`);

        const data = await response.json();

        return data.products;

    } catch (error) {

        console.log(error);

        return [];

    }

};