import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainApp from './components/MainApp';
import Login from './components/Login';
import Subscribe from './components/Subscribe';
import { useEffect } from 'react';
import PrivateRoute from './components/PrivateRoute';
import Admin from './components/admin/Admin';
import AdminUsers from './components/admin/AdminUsers';
import Abonnes from './components/admin/Abonnes';
import Dashboard from './components/admin/Dashboard';
import Abonnement from './components/Abonnement';
import Orders from './components/admin/Orders';

function App() {
  // useEffect
  useEffect(()=>{
    if (localStorage.getItem("access_token") === null) {
      localStorage.setItem("access_token", "");
    }

    // localStorage.setItem("access_token", "false");
    // s
    
  }, [])


  return (
    <Router>
      
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <MainApp />
          </PrivateRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/abonnement" element={<Abonnement />} />

        <Route path="/admin" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="abonnes" element={<Abonnes />} />
         
        </Route>
      </Routes>

    </Router>
  );
}

export default App;
