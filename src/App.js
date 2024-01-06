import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./components/style/dashboard.css";
import "./components/style/dashboard";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import BottomAlert from './components/BottomAlert'
import Cashier from './pages/cashier'
// import DatabaseSettings from "./pages/database-settings";
import DashboardLayout from "./pages/dashboardLayout";
import 'react-toastify/dist/ReactToastify.css';
import 'sweetalert2/src/sweetalert2.scss'
import 'boxicons'
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="*" Component={DashboardLayout} />
        <Route path="/cashier" Component={Cashier} />
        {/* <Route path="/db-setting" Component={DatabaseSettings} /> */}
      </Routes>
      {/* <BottomAlert /> */}
    </div>
  );
}

export default App;
