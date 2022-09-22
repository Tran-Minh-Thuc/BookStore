import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "./admin/assets/libs/boxicons-2.1.1/css/boxicons.min.css";
import "./admin/scss/App.scss";

import Home from './page/Home';
import ProductsCategory from './page/ProductsCategory'
import { Route, Routes } from 'react-router-dom';
import Login from './page/Login';
import Register from './page/Register';
import ProductDetail from './page/ProductDetail';
import Cart from './page/Cart';
import MyAccount from './page/my-account';
import ListFarvorite from './page/ListFarvorite';
import Checkout from './page/Checkout';
import MainLayout from './admin/layout/MainLayout';
import SalesAnalysis from './admin/components/sales-analysis/SalesAnalysis';
import Accounts from './admin/components/accounts/Accounts';
import Dashboard from './admin/pages/Dashboard';
import Blank from './admin/pages/Blank';
import AddressList from './page/address/address-list/AddressList';
import Blog from './page/blog/Blog';
import Orders from './admin/components/orders/Order';
import Admin from './page/Admin';
import ProductsAdmin from './admin/components/products/ProductsAdmin';
import { AuthContextProvider } from './Context/AuthContext';



function App() {

  return (
    <div>
      <AuthContextProvider>
        
        <Routes>
          <Route path='/' element={<Home title="Home page"></Home>} />
          <Route path='/products' element={<ProductsAdmin></ProductsAdmin>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path='/register' element={<Register></Register>} />
          <Route path='/product/:id' element={<ProductDetail></ProductDetail>} />
          <Route path="/cart" element={<Cart />}>
          </Route>
          <Route path="/cart/address-list" element={<AddressList />} />

          <Route path="/account" element={<MyAccount />} />
          <Route path="/admin2" element={<Admin />} />
          <Route path="/categories" element={<ProductsCategory />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/farvorite" element={<ListFarvorite />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/shop" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/shop/orders" element={<Orders />} />
            <Route path="/shop/products" element={<ProductsAdmin />} />
            <Route path="/shop/customers" element={<Blank />} />
            <Route path="/shop/sales-analysis" element={<SalesAnalysis />} />
            <Route path="/shop/accounts" element={<Accounts />} />
          </Route>
        </Routes>
      </AuthContextProvider>

    </div>
  );
}

export default App;
