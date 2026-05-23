import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Context
import CartProvider from './context/CartContext.jsx';

// Layouts
import { WithNavLayout, WithoutNavLayout } from './layouts/Layouts.jsx';

// Products
import { ItemMenuContainer } from './componentes/Products/ItemMenuContainer.jsx';
import { ItemListContainer } from './componentes/Products/ItemListContainer.jsx';
import { ItemDetailContainer } from './componentes/Products/ItemDetailContainer.jsx';

// Orders
import { CustomerOrder } from './componentes/Orders/CustomerOrder.jsx';

// Cart
import { Cart } from './componentes/Cart/Cart.jsx';
import { CheckCart } from './componentes/Cart/CheckCart.jsx';
import FloatingCart from './componentes/Cart/FloatingCart.jsx';

// Admin - Products
import CreateProduct from './componentes/Admin/products/CreateProduct.jsx';
import AdminProducts from './componentes/Admin/products/AdminProducts.jsx';
import EditProduct from './componentes/Admin/products/EditProduct.jsx';

// Admin - Orders
import { Pedidos } from './componentes/Admin/pedidos/Pedidos.jsx';

// Delivery
import { DeliveryUser } from './componentes/Delivery/DeliveryUser.jsx';

// Global styles
import './style.css';

function App() {

  return (

    <Router>

      <CartProvider>

        <div className='contenedorPrincipal'>

          <Routes>

            {/* Layout sin navbar */}
            <Route element={<WithoutNavLayout />}>

              <Route
                path="/detail/:id"
                element={<ItemDetailContainer />}
              />

            </Route>

            {/* Layout con navbar */}
            <Route element={<WithNavLayout />}>

              {/* Cliente */}
              <Route
                path="/"
                element={<ItemMenuContainer />}
              />

              <Route
                path="/categoria/:categoria"
                element={<ItemListContainer />}
              />

              <Route
                path="/order"
                element={<CustomerOrder />}
              />

              {/* Carrito */}
              <Route
                path="/cart"
                element={<Cart />}
              />

              <Route
                path="/checkcart"
                element={<CheckCart />}
              />

              {/* Admin */}
              <Route
                path="/admin"
                element={<Pedidos />}
              />

              <Route
                path="/admin/products"
                element={<AdminProducts />}
              />

              <Route
                path="/admin/create-product"
                element={<CreateProduct />}
              />

              <Route
                path="/admin/edit-product/:id"
                element={<EditProduct />}
              />

              {/* Delivery */}
              <Route
                path="/delivery"
                element={<DeliveryUser />}
              />

            </Route>

          </Routes>

          <FloatingCart />

        </div>

      </CartProvider>

    </Router>

  );

}

export default App;