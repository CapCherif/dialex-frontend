import React from 'react'
import userLogo from '../assets/user.png';
import PareneLogo from '../assets/parene_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

function NavBar() {
    
  const navigate = useNavigate()

  const LogOut = ()=>{
    localStorage.setItem('access_token', "")
    localStorage.setItem('login', false)
    localStorage.setItem('iduser', 0)
    navigate('/login')
  }
  return (
    <div id="navbar">
        <img src={PareneLogo} alt="" />
        <div>
          <FontAwesomeIcon id="logout-icon" onClick={LogOut} icon={faRightFromBracket} ></FontAwesomeIcon>
          <img src={userLogo} alt="" />
        </div>
    </div>
  )
}

export default NavBar
