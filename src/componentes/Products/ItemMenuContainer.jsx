import { Link } from 'react-router-dom';
import { useApiMenu } from '../../hooks/useApi';
import Skeleton from '../UI/Skeleton';

export function ItemMenuContainer() {

  const { items, loading } = useApiMenu();

  const checkPedido = localStorage.getItem('orderId');

  const skeletonVariants = {
    width: '85%',
    maxWidth: '400px',
    height: '85px',
    borderRadius: '30px',
    marginBottom: '20px',
  };

  const renderOrder = () => {

    if (checkPedido) {

      return (
        <div className="menu-principal-card">

          <Link
            to={`/order`}
            className="menu-principal-link"
          >

            <img
              src="https://gcdn.emol.cl/temas-legales/files/2020/10/delivery1.jpg"
              alt="Delivery"
              className="menu-principal-img"
            />

            <h2 className="menu-principal-titulo">
              Mi pedido
            </h2>

          </Link>

        </div>
      );
    }
  };

  // Obtener categorías únicas
  const categorias = [
    ...new Set(items.map(item => item.categoria))
  ];

  return (
    <>
      <h2 className="menu-title">Menu</h2>

      {loading ? (

        <Skeleton
          count={5}
          variants={Array(5).fill(skeletonVariants)}
        />

      ) : (

        <>
          {renderOrder()}

          {categorias.map((categoria, index) => {

            // Buscar un producto de esa categoría
            const producto = items.find(
              item => item.categoria === categoria
            );

            return (
              <div
                key={index}
                className="menu-principal-card"
              >

                <Link
                  to={`/categoria/${categoria}`}
                  className="menu-principal-link"
                >

                  <img
                    src={producto?.imagen}
                    alt={categoria}
                    className="menu-principal-img"
                  />

                  <h2 className="menu-principal-titulo">
                    {categoria}
                  </h2>

                </Link>

              </div>
            );
          })}
        </>

      )}
    </>
  );
}