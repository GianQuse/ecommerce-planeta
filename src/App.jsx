import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CartProvider from './componentes/Cart/CartContext.jsx';
import { ItemMenuContainer } from './componentes/ItemMenuContainer.jsx';
import { ItemListContainer } from './componentes/ItemListContainer.jsx';
import { ItemDetailContainer } from './componentes/ItemDetailContainer.jsx';
import { CustomerOrder } from './componentes/CustomerOrder.jsx';
import CreateProduct from './componentes/CreateProduct.jsx';
import AdminProducts from './componentes/AdminProducts.jsx';
import EditProduct from './componentes/EditProduct.jsx';
import { Cart } from './componentes/Cart/Cart.jsx';
import FloatingCart from './componentes/Cart/FloatingCart.jsx';
import { CheckCart } from './componentes/Cart/CheckCart.jsx';
import { DeliveryProvider } from './componentes/Admin/DeliveryContext.jsx';
import { Pedidos } from './componentes/Admin/Pedidos.jsx';
import { DeliveryUser } from './componentes/Delivery/DeliveryUser.jsx';
import { WithNavLayout, WithoutNavLayout } from './layouts/Layouts.jsx';
import './style.css';

function App() {
  return (
    <Router>
      <div className='contenedorPrincipal'>
        <CartProvider>
          <DeliveryProvider>
            <Routes>
              <Route element={<WithoutNavLayout />}>
                <Route path="/detail/:id" element={<ItemDetailContainer />} />
              </Route>

              <Route element={<WithNavLayout />}>
                <Route path="/" element={<ItemMenuContainer />} />
                <Route path="/categoria/:categoria" element={<ItemListContainer />} />
                <Route path="/order" element={<CustomerOrder />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkcart" element={<CheckCart />} />
                <Route path="/admin" element={<Pedidos />} />
                <Route path="/admin/create-product" element={<CreateProduct />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/edit-product/:id" element={<EditProduct />} />
                <Route path="/delivery" element={<DeliveryUser />} />
              </Route>
            </Routes>
            <FloatingCart />
          </DeliveryProvider>
        </CartProvider>
      </div>
    </Router >
  );
}

export default App;