export const agruparPorCategoria = (pedidos) => {
    return pedidos.reduce((acumulador, pedido) => {
        const categoria = pedido.categoria;
        if (!acumulador[categoria]) {
            acumulador[categoria] = [];
        }
        acumulador[categoria].push(pedido);
        return acumulador;
    }, {});
};