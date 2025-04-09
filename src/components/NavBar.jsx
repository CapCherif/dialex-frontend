import React from 'react'
import userLogo from '../assets/user.png';
import PareneLogo from '../assets/parene_logo.png';


function NavBar() {
  return (
    <div id="navbar">
        <img src={PareneLogo} alt="" />
        <img src={userLogo} alt="" />
    </div>
  )
}

export default NavBar
