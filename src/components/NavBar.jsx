import React from 'react'
import userLogo from '../assets/user.png';
import PareneLogo from '../assets/parene_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
    
  const navigate = useNavigate()

  const LogOut = ()=>{
    localStorage.setItem('access_token', "")
    localStorage.setItem('login', false)
    localStorage.setItem('iduser', 0)
    navigate('/landing')
  }
  return (
    <div id="navbar">
        <img src={PareneLogo} alt="" />
        <div>
          <FontAwesomeIcon id="logout-icon" onClick={LogOut} icon={faRightFromBracket} ></FontAwesomeIcon>
         <Link to="/profile" style={{textDecoration: "none"}}>
         <img src={userLogo} alt="" />
         </Link> 
        </div>
    </div>
  )
}

export default NavBar
