import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import { Routes, Route } from "react-router-dom";
// import { ToastContainer } from 'react-toastify';
import Dashboard from "../../pages/dashboard";
import Product from "../../pages/product";
import Category from '../../pages/category';
import DatabaseSettings from "../../pages/database-settings";
import Transaction from '../../pages/transaction';
import Discount from '../../pages/discount';
import Member from '../../pages/member';
import BatchStock from '../batch'
export default function DashboardLayout() {
  return (
    <div className="m-0 p-0">
      <Navbar />
      <div className="container-fluid">
        {/* <ToastContainer /> */}
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {/* Dinamic content */}
            <Routes>
              <Route path="/" Component={Dashboard} />
              <Route path="/product" Component={Product} />
              <Route path="/category" Component={Category} />
              <Route path="/transaction" Component={Transaction} />
              <Route path="/discount" Component={Discount} />
              <Route path="/member" Component={Member} />
              <Route path="/db-setting" Component={DatabaseSettings} />
              <Route path="/batchstock" Component={BatchStock} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  )
}