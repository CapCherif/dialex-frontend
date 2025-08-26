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
import Home from "./components/Home";
import Tokens from './components/Tokens';
import TokenOrders from './components/TokenOrders';
import Politics from './components/Politics'; // Import Politics component
// MAINTENANCE MODE FLAG
const MAINTENANCE_MODE = false; // Set to true to enable maintenance mode

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
    <>
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
          <Route path="/politics" element={<Politics />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/abonnement" element={<Abonnement />} />
          <Route path="/achat-token" element={<Tokens />} />
          <Route path="/admin" element={
            <PrivateAdminRoute>
              <Admin />
            </PrivateAdminRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="orders" element={<Orders />} />
            <Route path="token-orders" element={<TokenOrders />} />
            <Route path="abonnes" element={<Abonnes />} />
          </Route>
          <Route path='/landing' element={<Landing />} />
          <Route path='/home' element={<Home />} />
          
        </Routes>
      </Router>
      {MAINTENANCE_MODE && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(248,249,250,0.98)',
          color: '#333',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'sans-serif',
          textAlign: 'center',
          pointerEvents: 'all',
        }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Maintenance en cours</h1>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>DZIALEX</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: 600 }}>
            Nos services sont indisponibles pour cause de maintenance, merci de bien vouloir nous excuser.<br />
            Nous faisons de notre mieux pour remettre en route le site.
          </p>
        </div>
      )}
    </>
  );
}

export default App;
