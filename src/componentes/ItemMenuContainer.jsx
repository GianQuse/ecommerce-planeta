import { Link } from 'react-router-dom';
import { useApiMenu } from '../hooks/useApi';
import Skeleton from './Skeleton';

export function ItemMenuContainer() {
  const { items, loading } = useApiMenu();

  const checkPedido = localStorage.getItem('orderId');

  const skeletonVariants = {
    width: '85%',
    maxWidth: '400px',
    height: '85px',
    borderRadius: '30px',
    marginBottom: '20px',
  }

  const renderOrder = () => {
    if (checkPedido) {
      return (
        <div className="menu-principal-card">
          <Link to={`/order`} className="menu-principal-link">
            <img src="https://gcdn.emol.cl/temas-legales/files/2020/10/delivery1.jpg" alt="Delivery" className="menu-principal-img" />
            <h2 className="menu-principal-titulo">Mi pedido</h2>
          </Link>
        </div>
      );
    }
  };

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
          {items.map((item, index) => (
            <div key={index} className="menu-principal-card">
              <Link to={`/categoria/${item.tipo}`} className="menu-principal-link">
                <img src={item.platos[0]?.imagen} alt={item.tipo} className="menu-principal-img" />
                <h2 className="menu-principal-titulo">{item.tipo}</h2>
              </Link>
            </div>
          ))}
        </>
      )}
    </>
  );
}

