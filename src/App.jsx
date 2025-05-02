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
import Landing from './components/landing/Landing';
import PrivateAdminRoute from './components/PrivateAdminRoutes';
import Profile from './components/profile/Profile';

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
          <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/abonnement" element={<Abonnement />} />
        
        <Route path="/admin" element={
          <PrivateAdminRoute>
          <Admin />
          </PrivateAdminRoute>
          }>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="abonnes" element={<Abonnes />} />
        </Route>
       
     
        <Route path='/landing' element={<Landing />} />
      </Routes>

    </Router>
  );
}

export default App;
