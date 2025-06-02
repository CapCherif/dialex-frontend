import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import logo from "../../assets/logo.png";
import { useLocation } from 'react-router-dom';

function Admin() {
    const location = useLocation();
  return (
    <div>
      <div id="admin_nav">
        <img src={logo} alt="logo" />
        <h3>Admin section</h3>
        <Link to="/admin" className={location.pathname === "/admin" ? "selc" : ""}>Dashboard</Link>
        <Link to="/admin/users" className={location.pathname === "/admin/users" ? "selc" : ""}>Users</Link>
        <Link to="/admin/orders" className={location.pathname === "/admin/orders" ? "selc" : ""}>Orders</Link>
        <Link to="/admin/token-orders" className={location.pathname === "/admin/token-orders" ? "selc" : ""}>Commandes Tokens</Link>
        <Link to="/admin/abonnes" className={location.pathname === "/admin/abonnes" ? "selc" : ""}>Abonnés</Link>
        <Link to="/">Déconnexion</Link>
      </div>

      <div id="admin_content">
        <Outlet /> 
      </div>
    </div>
  );
}

export default Admin;
